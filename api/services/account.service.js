const pool = require('../database/db');
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
        if (existingCustomer.rows.length > 0) {
            return { error: 1, status: 404, data: 'Adresse email déjà utilisée' };
        }

        const _id = await client.query('SELECT MAX(_id) FROM customer_accounts');
        customer._id = parseInt(_id.rows[0].max) + 1;
        const res = await client.query(
            'INSERT INTO customer_accounts (_id, name, login, password, email, privilege, session) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [customer._id, customer.name, customer.login, customer.password, customer.email, customer.privilege || 0, uuidv4()]
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

        const result = await client.query('SELECT * FROM customer_accounts WHERE login = $1 AND password = $2', [data.login, data.password]);

        if (result.rows.length === 0) {
            return { error: 1, status: 404, data: 'login/pass incorrect' };
        }

        let user = result.rows[0];
        if (!user.session) {
            user.session = uuidv4();
            await client.query('UPDATE customer_accounts SET session = $1 WHERE _id = $2', [user.session, user._id]);
        }

        return { error: 0, status: 200, data: user };
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
        const res = await client.query(
            'UPDATE customer_accounts SET name = $1, email = $2, password = $3, login = $4, picture = $5, description = $6, privilege = $7, session = $8 WHERE _id = $9 RETURNING *',
            [customer.name, customer.email, customer.password, customer.login, customer.picture, customer.description, customer.privilege, customer.session, customer._id]
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
    getCustomerById,
    getCustomerByEmail,
    getCustomerByName,
    addCustomerAccount,
    modifyCustomerAccount,
    deleteCustomerAccount,
    loginUser,

};