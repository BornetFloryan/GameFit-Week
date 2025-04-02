const pool = require('../config/db.config');

// Ticketing
async function getTickets() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM tickets');
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving tickets' };
    } finally {
        client.release();
    }
}

async function getTicketsAgeCategories() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM ticket_age_categories');
        return { error: 0, status: 200, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving ticket age categories' };
    } finally {
        client.release();
    }
}

async function getTicketPrices() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM ticket_prices');
        return { error: 0, status: 200, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving ticket prices' };
    } finally {
        client.release();
    }
}

async function addTickets(formData) {
    const client = await pool.connect();
    try {
        let customer = await client.query('SELECT * FROM customer_accounts WHERE email = $1', [formData.email]);
        if (customer.rows.length < 1) {
            const _idCustomer = await client.query('SELECT MAX(_id) FROM customer_accounts');
            customer = {
                _id: parseInt(_idCustomer.rows[0].max) + 1,
                name: formData.name,
                login: null,
                password: null,
                email: formData.email,
                privilege: 0,
                session: null
            };
            await client.query('INSERT INTO customer_accounts (_id, name, login, password, email, privilege, session) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [customer._id, customer.name, customer.login, customer.password, customer.email, customer.privilege, customer.session]);
        } else {
            customer = customer.rows[0];
        }

        let addedTickets = [];
        for (let i = 0; i < formData.ticketCount; i++) {
            const lastTicketId = await client.query('SELECT MAX(_id) FROM tickets');
            const newTicketId = lastTicketId.rows[0].max ? parseInt(lastTicketId.rows[0].max) + 1 : 1;

            let price_id = await client.query('SELECT _id FROM ticket_prices WHERE age_category_id = $1',
                [formData._idTicketAgeCategories]);
            if (price_id.rows.length === 0) {
                throw new Error('Price ID not found for the given categories');
            }
            price_id = price_id.rows[0]._id;

            const ticket = {
                _id: newTicketId,
                date: formData.date,
                time: formData.time,
                customer_id: customer._id,
                price_id: price_id,
            };
            await client.query('INSERT INTO tickets (_id, date, time, customer_id, price_id) VALUES ($1, $2, $3, $4, $5)',
                [ticket._id, ticket.date, ticket.time, ticket.customer_id, ticket.price_id]);
            addedTickets.push(ticket);
        }
        return { error: 0, status: 201, data: addedTickets };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error adding tickets' };
    } finally {
        client.release();
    }
}

async function deleteTicket(ticket_id) {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM tickets WHERE _id = $1', [ticket_id]);
        return { error: 0, status: 204, data: ticket_id };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error deleting ticket' };
    } finally {
        client.release();
    }
}

async function getTicketById(id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM tickets WHERE _id = $1', [id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Ticket not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving ticket by ID' };
    } finally {
        client.release();
    }
}

async function getTicketPricesPriceById(id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM ticket_prices WHERE _id = $1', [id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Ticket price not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving ticket price by ID' };
    } finally {
        client.release();
    }
}

async function getTicketPriceByCategories(ageCategoryId) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM ticket_prices WHERE age_category_id = $1', [ageCategoryId]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Ticket price not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving ticket price by categories' };
    } finally {
        client.release();
    }
}

async function getTicketsAgeCategoryById(id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM ticket_age_categories WHERE _id = $1', [id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Ticket age category not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving ticket age category by ID' };
    } finally {
        client.release();
    }
}

async function getTicketsByCustomerId(customerId) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM tickets WHERE customer_id = $1', [customerId]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving tickets by customer ID' };
    } finally {
        client.release();
    }
}

module.exports = {
    getTickets,
    getTicketsAgeCategories,
    getTicketPrices,
    addTickets,
    deleteTicket,
    getTicketById,
    getTicketPricesPriceById,
    getTicketPriceByCategories,
    getTicketsAgeCategoryById,
    getTicketsByCustomerId,
};