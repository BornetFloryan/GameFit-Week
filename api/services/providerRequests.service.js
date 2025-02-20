const pool = require('../database/db');
const {v4: uuidv4} = require('uuid');

async function getProviderRequests() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_requests');
        return {error: 0, data: res.rows};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la récupération des demandes de fournisseur'};
    } finally {
        client.release();
    }
}

async function addProviderRequest(user) {
    const client = await pool.connect();
    try {
        if (!user) {
            return {error: 1, status: 404, data: 'Utilisateur manquant'};
        }
        if (!user.email) {
            return {error: 1, status: 404, data: 'Email manquant'};
        }
        if (!user.name) {
            return {error: 1, status: 404, data: 'Nom manquant'};
        }
        if (!user.prestationServices) {
            return {error: 1, status: 404, data: 'Services de prestation manquants'};
        }
        if (!user.login) {
            return {error: 1, status: 404, data: 'Login manquant'};
        }
        if (!user.password) {
            return {error: 1, status: 404, data: 'Mot de passe manquant'};
        }

        const prestationServices = user.prestationServices

        let existingUser = await client.query('SELECT * FROM customer_accounts WHERE email = $1', [user.email]);
        if (existingUser.rows.length === 0) {
            const _id = await client.query('SELECT MAX(_id) FROM customer_accounts');
            user._id = parseInt(_id.rows[0].max) + 1;
            let addUser = await client.query(
                'INSERT INTO customer_accounts (_id, name, login, password, email, privilege, session) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [user._id, user.name, user.login, user.password, user.email, user.privilege || 0, uuidv4()]
            );
            user = addUser.rows[0];
        } else {
            existingUser = existingUser.rows[0];
            if (existingUser.password !== user.password) {
                return {error: 1, status: 404, data: 'Mot de passe incorrect'};
            }
            user = existingUser;
            const existingRequest = await client.query('SELECT * FROM provider_requests WHERE customer_id = $1', [user._id]);
            if (existingRequest.rows.length > 0) {
                return {error: 1, status: 404, data: 'Demande déjà existante'};
            }
        }

        let newId = await client.query('SELECT MAX(_id) FROM provider_requests');
        let _id = parseInt(newId.rows[0].max) + 1;

        const res = await client.query(
            'INSERT INTO provider_requests (_id, date, state, customer_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [_id, new Date(), 0, user._id]
        );


        let service = await client.query('SELECT * FROM service_categories WHERE _id = $1', [prestationServices]);
        if (service.rows.length === 0) {
            return {error: 1, status: 404, data: 'Service non trouvé'};
        }
        newId = await client.query('SELECT MAX(_id) FROM provider_service_categories');
        _id = parseInt(newId.rows[0].max) + 1;
        await client.query(
            'INSERT INTO provider_service_categories (_id, state, customer_id, service_id) VALUES ($1, $2, $3, $4)',
            [_id, 0, user._id, prestationServices]
        );

        return {error: 0, status: 200, data: res.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de l\'ajout de la demande'};
    } finally {
        client.release();
    }
}

async function modifyProviderRequest(request) {
    const client = await pool.connect();
    try {
        if (!request) {
            return {error: 1, status: 404, data: 'Requête manquante'};
        }
        if (!request._id) {
            return {error: 1, status: 404, data: 'ID manquant'};
        }
        if (!request.customer_id) {
            return {error: 1, status: 404, data: 'ID client manquant'};
        }
        if (!request.date) {
            return {error: 1, status: 404, data: 'Date manquante'};
        }
        if (!request.state) {
            return {error: 1, status: 404, data: 'État manquant'};
        }
        const res = await client.query(
            'UPDATE provider_requests SET date = $1, state = $2, customer_id = $3 WHERE _id = $4 RETURNING *',
            [request.date, request.state, request.customer_id, request._id]
        );
        if (res.rowCount === 0) {
            return {error: 1, status: 404, data: 'Demande non trouvée'};
        }
        return {error: 0, status: 200, data: res.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la modification de la demande'};
    } finally {
        client.release();
    }
}

async function deleteProviderRequest(request) {
    const client = await pool.connect();
    try {
        if (!request) {
            return {error: 1, status: 404, data: 'Données manquantes'};
        }

        request = (await client.query('SELECT * FROM provider_requests WHERE _id = $1', [request])).rows[0];


        const res = await client.query('DELETE FROM provider_requests WHERE _id = $1 RETURNING _id', [request._id]);
        if (res.rowCount === 0) {
            return {error: 1, status: 404, data: 'Demande non trouvée'};
        }

        const user = await client.query('SELECT * FROM customer_accounts WHERE _id = $1', [request.customer_id]);
        if (user.rows.length > 0) {
            await client.query('UPDATE customer_accounts SET privilege = 0 WHERE _id = $1', [request.customer_id]);
        }

        return {error: 0, status: 200, data: res.rows[0]._id};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Erreur lors de la suppression de la demande'};
    } finally {
        client.release();
    }
}

async function getProviderRequestById(_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_requests WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return {error: 1, status: 404, data: 'Provider request not found'};
        }
        return {error: 0, data: res.rows[0]};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Error retrieving provider request by ID'};
    } finally {
        client.release();
    }
}

async function getProviderRequestsByCustomerId(customer_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_requests WHERE customer_id = $1', [customer_id]);
        if (res.rows.length === 0) {
            return {error: 1, status: 404, data: 'No provider requests found for this customer'};
        }
        return {error: 0, data: res.rows};
    } catch (error) {
        console.error(error);
        return {error: 1, status: 500, data: 'Error retrieving provider requests by customer ID'};
    } finally {
        client.release();
    }
}

module.exports = {
    getProviderRequests,
    addProviderRequest,
    modifyProviderRequest,
    deleteProviderRequest,
    getProviderRequestById,
    getProviderRequestsByCustomerId,
}