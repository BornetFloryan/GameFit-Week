const pool = require('../database/db');

async function getTickets() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM tickets');
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

async function getTicketsAnimationCategories() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM ticketsanimationcategories');
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

async function getTicketsAgeCategories() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM ticket_age_categories');
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

async function getTicketPrices() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM ticket_prices');
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

async function addTickets(formData) {
    const client = await pool.connect();
    try {
        let customer = await client.query('SELECT * FROM customersaccounts WHERE email = $1', [formData.email]);
        if (customer.rows.length < 1) {
            const _idCustomer = await client.query('SELECT MAX(_id) FROM customersaccounts');
            customer = {
                _id: parseInt(_idCustomer.rows[0].max) + 1,
                name: formData.name,
                login: null,
                password: null,
                email: formData.email,
                privilege: 0,
                session: null
            };
            await client.query('INSERT INTO customersaccounts (_id, name, login, password, email, privilege, session) VALUES ($1, $2, $3, $4, $5, $6, $7)'
                , [customer._id, customer.name, customer.login, customer.password, customer.email, customer.privilege, customer.session]);
        } else {
            customer = customer.rows[0];
        }
        let addedTickets = [];
        for (let i = 0; i < formData.ticketCount; i++) {
            let price_id = await client.query('SELECT _id FROM ticket_prices WHERE animation_category_id = $1 AND age_category_id = $2'
                , [formData.animation_category_id, formData.age_category_id]);
            price_id = price_id.rows[0]._id;
            const ticket = {
                date: formData.date,
                time: formData.time,
                customer_id: customer._id,
                price_id: price_id,
            };
            await client.query("INSERT INTO tickets (date, time, customer_id, price_id) VALUES ($1, $2, $3, $4)"
                , [ticket.date, ticket.time, ticket.customer_id, ticket.price_id]);
            addedTickets.push(ticket);
        }
        return addedTickets;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

async function deleteTicket(ticket) {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM tickets WHERE _id = $1', [ticket._id]);
        return ticket;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getTickets,
    getTicketsAnimationCategories,
    getTicketsAgeCategories,
    getTicketPrices,
    addTickets,
    deleteTicket,
};