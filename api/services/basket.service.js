const pool = require('../database/db');

async function getAllBaskets() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM baskets');
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Aucun panier trouvé' };
        }
        return { error: 0, status: 200, data: res.rows };
    } finally {
        client.release();
    }
}

async function getBasketsByTicketId(ticket_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM baskets WHERE ticket_id = $1', [ticket_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Aucun panier trouvé' };
        }
        return { error: 0, status: 200, data: res.rows };
    } finally {
        client.release();
    }
}

async function createBasket(ticket_id) {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'INSERT INTO baskets (date, state, is_order, ticket_id) VALUES (NOW(), 0, FALSE, $1) RETURNING *',
            [ticket_id]
        );
        return { error: 0, status: 201, data: res.rows[0] };
    } finally {
        client.release();
    }
}

async function updateBasketState(basket_id, state, is_order) {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'UPDATE baskets SET state = $1, is_order = $2 WHERE _id = $3 RETURNING *',
            [state, is_order, basket_id]
        );
        return { error: 0, status: 200, data: res.rows[0] };
    } finally {
        client.release();
    }
}

async function deleteBasket(basket_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM baskets WHERE _id = $1 RETURNING *', [basket_id] );
        return { error: 0, status: 200, data: res.rows[0] };
    } finally {
        client.release();
    }
}

module.exports = {
    getAllBaskets,
    getBasketsByTicketId,
    createBasket,
    updateBasketState,
    deleteBasket
};
