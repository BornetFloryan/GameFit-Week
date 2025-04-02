const pool = require('../config/db.config');

async function getServiceCategories() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM service_categories');
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des catégories de services' };
    } finally {
        client.release();
    }
}

async function getServiceCategoryById(_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM service_categories WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Service category not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving service category by ID' };
    } finally {
        client.release();
    }
}

module.exports = {
    getServiceCategories,
    getServiceCategoryById
}