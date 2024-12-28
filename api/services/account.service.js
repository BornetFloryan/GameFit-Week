const pool = require('../database/db');

async function getCustomersAccounts() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM customersaccounts');
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

async function loginUser(login, password) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM customersaccounts WHERE login = $1 AND password = $2', [login, password]);
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

async function addCustomerAccount(customer) {
    const client = await pool.connect();
    try {
        const _id = await client.query('SELECT MAX(_id) FROM customersaccounts');
        customer._id = parseInt(_id.rows[0].max) + 1;
        const res = await client.query(
            'INSERT INTO customersaccounts (_id, name, login, password, email, privilege) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [customer._id, customer.name, customer.login, customer.password, customer.email, 0]
        );
        return res.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

async function modifyCustomerAccount(customer) {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'UPDATE customersaccounts SET name = $1, email = $2, password = $3, login = $4 WHERE _id = $5 RETURNING *',
            [customer.name, customer.email, customer.password, customer.login, customer._id]
        );
        if (res.rowCount === 0) {
            console.log('No rows updated. Check if the _id exists in the database.');
        } else {
            console.log('Row updated successfully:', res.rows[0]);
        }
        return res.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getCustomersAccounts,
    loginUser,
    addCustomerAccount,
    modifyCustomerAccount,
};