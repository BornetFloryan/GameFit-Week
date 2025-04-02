const pool = require('../config/db.config');

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

async function createBasket(ticket_id, provider_service_categories_id) {
    const client = await pool.connect();
    try {
        const lastIdRes = await client.query('SELECT MAX(_id) as last_id FROM baskets');
        const lastId = lastIdRes.rows[0].last_id || 0;
        const newId = lastId + 1;

        const res = await client.query(
            'INSERT INTO baskets (_id, date, state, is_order, ticket_id, provider_service_categories_id) VALUES ($1, NOW(), 0, FALSE, $2, $3) RETURNING *',
            [newId, ticket_id, provider_service_categories_id]
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
