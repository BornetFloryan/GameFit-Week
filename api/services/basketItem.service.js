const pool = require('../database/db');

async function getItemsByBasket(basket_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM basket_items WHERE basket_id = $1', [basket_id]);
        return { error: 0, status: 200, data: res.rows };
    } finally {
        client.release();
    }
}


async function addItemToBasket(basket_id, item_id, item_type, quantity) {
    const client = await pool.connect();
    try {
        const maxIdRes = await client.query('SELECT COALESCE(MAX(_id), 0) + 1 AS new_id FROM basket_items');
        const newId = maxIdRes.rows[0].new_id;

        const res = await client.query(
            'INSERT INTO basket_items (_id, basket_id, item_id, item_type, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [newId, basket_id, item_id, item_type, quantity]
        );
        return { error: 0, status: 201, data: res.rows[0] };
    } finally {
        client.release();
    }
}

async function updateItemQuantity(basket_item_id, quantity) {
    const client = await pool.connect();
    try {
        await client.query(
            'UPDATE basket_items SET quantity = $1 WHERE _id = $2',
            [quantity, basket_item_id]
        );
        return { error: 0, status: 200, data: 'Quantité mise à jour' };
    } finally {
        client.release();
    }
}

async function deleteItemFromBasket(basket_item_id) {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM basket_items WHERE _id = $1', [basket_item_id]);
        return { error: 0, status: 200, data: 'Item supprimé du panier' };
    } finally {
        client.release();
    }
}

module.exports = {
    getItemsByBasket,
    addItemToBasket,
    updateItemQuantity,
    deleteItemFromBasket
};
