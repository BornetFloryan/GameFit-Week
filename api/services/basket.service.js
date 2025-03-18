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

async function getBasketsByCustomer(customer_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM baskets WHERE customer_id = $1', [customer_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Aucun panier trouvé' };
        }
        return { error: 0, status: 200, data: res.rows };
    } finally {
        client.release();
    }
}

async function createBasket(customer_id) {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'INSERT INTO baskets (date, state, is_order, customer_id) VALUES (NOW(), 0, FALSE, $1) RETURNING *',
            [customer_id]
        );
        return { error: 0, status: 201, data: res.rows[0] };
    } finally {
        client.release();
    }
}

async function updateBasketState(basket_id, state, is_order) {
    const client = await pool.connect();
    try {
        await client.query(
            'UPDATE baskets SET state = $1, is_order = $2 WHERE _id = $3',
            [state, is_order, basket_id]
        );
        return { error: 0, status: 200, data: 'Panier mis à jour' };
    } finally {
        client.release();
    }
}

async function deleteBasket(basket_id) {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM baskets WHERE _id = $1', [basket_id]);
        return { error: 0, status: 200, data: 'Panier supprimé' };
    } finally {
        client.release();
    }
}

module.exports = {
    getAllBaskets,
    getBasketsByCustomer,
    createBasket,
    updateBasketState,
    deleteBasket
};
