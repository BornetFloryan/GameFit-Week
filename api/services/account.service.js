const pool = require('../config/db.config');
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function getCustomersAccounts() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM customer_accounts');
        return { error: 0, status: 200, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des comptes clients' };
    } finally {
        client.release();
    }
}

async function addCustomerAccount(customer) {
    const client = await pool.connect();
    try {
        const existingCustomer = await client.query('SELECT * FROM customer_accounts WHERE email = $1', [customer.email]);
        if (existingCustomer.rows.length > 0 && existingCustomer.rows[0].password) {
            return { error: 1, status: 404, data: 'Adresse email déjà utilisée' };
        }

        if(existingCustomer.rows.length > 0 && existingCustomer.rows[0].password === null){
            const res = await client.query('UPDATE customer_accounts SET name = $1, login = $2, password = $3, email = $4, picture = $5, description = $6, privilege = $7, session = $8 WHERE _id = $9 RETURNING *',
                [customer.name, customer.login, customer.password, customer.email, customer.picture, customer.description, customer.privilege || 0, customer.session, existingCustomer.rows[0]._id]
            );
            return { error: 0, status: 200, data: res.rows[0] };
        }

        const _id = await client.query('SELECT MAX(_id) FROM customer_accounts');
        customer._id = parseInt(_id.rows[0].max) + 1;

        const hashedPassword = await bcrypt.hash(customer.password, 10);

        const res = await client.query(
            'INSERT INTO customer_accounts (_id, name, login, password, email, picture, description, privilege, session) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [customer._id, customer.name, customer.login, hashedPassword, customer.email, customer.picture, customer.description, customer.privilege || 0, customer.session]
        );
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout du compte client' };
    } finally {
        client.release();
    }
}

async function loginUser(data) {
    const client = await pool.connect();
    try {
        if (!data.login || !data.password) {
            return { error: 1, status: 404, data: 'aucun login/pass fourni' };
        }

        const result = await client.query('SELECT * FROM customer_accounts WHERE login = $1', [data.login]);

        if (result.rows.length === 0) {
            return { error: 1, status: 404, data: 'login/pass incorrect' };
        }

        let user = result.rows[0];
        let passwordMatch;

        if (user.password.startsWith('$2b$')) {
            passwordMatch = bcrypt.compareSync(data.password, user.password);
        } else {
            passwordMatch = data.password === user.password;
        }

        if (!passwordMatch) {
            return { error: 1, status: 404, data: 'login/pass incorrect' };
        }

        const token = jwt.sign({ id: user._id, role: user.privilege }, config.secret, {
            expiresIn: config.jwtExpiration || 86400,
        });

        await client.query('UPDATE customer_accounts SET session = $1 WHERE _id = $2', [token, user._id]);

        const refreshToken = uuidv4();
        const expiryDate = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds() + config.jwtRefreshExpiration);

        await client.query('INSERT INTO refresh_tokens (token, expiry_date, user_id) VALUES ($1, $2, $3)', [refreshToken, expiryDate, user._id]);

        user.session = token;

        return { error: 0, status: 200, data: { ...user, accessToken: token, refreshToken } };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la connexion de l\'utilisateur' };
    } finally {
        client.release();
    }
}

async function modifyCustomerAccount(customer) {
    const client = await pool.connect();
    try {
        if (!customer._id) {
            return { error: 1, status: 400, data: 'ID client requis' };
        }

        const res = await client.query(
            'UPDATE customer_accounts SET name = $1, email = $2, password = $3, login = $4, picture = $5, description = $6, privilege = $7, session = $8 WHERE _id = $9 RETURNING *',
            [customer.name, customer.email, customer.password || null, customer.login, customer.picture, customer.description, customer.privilege, customer.session, customer._id]
        );
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
        }
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la modification du compte client' };
    } finally {
        client.release();
    }
}

async function deleteCustomerAccount(customer) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query('DELETE FROM provider_requests WHERE customer_id = $1', [customer]);
        await client.query('DELETE FROM provider_service_categories WHERE customer_id = $1', [customer]);
        await client.query('DELETE FROM provider_sport_categories WHERE customer_id = $1', [customer]);

        let tickets = await client.query('SELECT * FROM tickets WHERE customer_id = $1', [customer]);
        for (let ticket of tickets.rows) {
            await client.query('DELETE FROM service_reservations WHERE ticket_id = $1', [ticket._id]);
        }

        await client.query('DELETE FROM tickets WHERE customer_id = $1', [customer]);
        await client.query('DELETE FROM stands_reservations WHERE customer_id = $1', [customer]);
        const res = await client.query('DELETE FROM customer_accounts WHERE _id = $1 RETURNING _id', [customer]);
        if (res.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
        }

        await client.query('COMMIT');
        return { error: 0, status: 200, data: res.rows[0]._id };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression du compte client' };
    } finally {
        client.release();
    }
}

async function refreshToken(requestToken) {
    const client = await pool.connect();

    if (!requestToken) {
        return { status: 403, data: { message: "Le jeton d'actualisation est requis!" } };
    }

    try {
        const res = await client.query("SELECT * FROM refresh_tokens WHERE token = $1", [requestToken]);
        if (res.rows.length === 0) {
            return { status: 403, data: { message: "Jeton d'actualisation invalide !" } };
        }

        const refreshToken = res.rows[0];

        if (new Date(refreshToken.expiry_date).getTime() < new Date().getTime()) {
            await client.query("DELETE FROM refresh_tokens WHERE id = $1", [refreshToken.id]);
            return { status: 403, data: { message: "Le jeton d'actualisation a expiré. Veuillez vous reconnecter." } };
        }

        const userRes = await client.query("SELECT * FROM customer_accounts WHERE _id = $1", [refreshToken.user_id]);
        if (userRes.rows.length === 0) {
            return { status: 404, data: { message: "Utilisateur non trouvé" } };
        }

        const user = userRes.rows[0];

        const newAccessToken = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.jwtExpiration || 86400,
        });

        const newRefreshToken = uuidv4();

        const expiryDate = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds() + config.jwtRefreshExpiration);

        await client.query("DELETE FROM refresh_tokens WHERE id = $1", [refreshToken.id]);
        await client.query("INSERT INTO refresh_tokens (token, user_id, expiry_date) VALUES ($1, $2, $3)", [newRefreshToken, user._id, expiryDate]);

        return { status: 200, data: { accessToken: newAccessToken, refreshToken: newRefreshToken } };
    } catch (err) {
        return { status: 500, data: { message: err.message } };
    } finally {
        client.release();
    }
}

async function getCustomerById(_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM customer_accounts WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Customer not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving customer by ID' };
    } finally {
        client.release();
    }
}

async function getCustomerByEmail(email) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM customer_accounts WHERE email = $1', [email]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Customer not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving customer by email' };
    } finally {
        client.release();
    }
}

async function getCustomerByName(name) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM customer_accounts WHERE name = $1', [name]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Customer not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving customer by name' };
    } finally {
        client.release();
    }
}

module.exports = {
    getCustomersAccounts,
    refreshToken,
    getCustomerById,
    getCustomerByEmail,
    getCustomerByName,
    addCustomerAccount,
    modifyCustomerAccount,
    deleteCustomerAccount,
    loginUser,

};