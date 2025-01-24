const pool = require('../database/db');

async function getSportsCategories() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM sports_categories');
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des catégories de sports' };
    } finally {
        client.release();
    }
}

module.exports = {
    getSportsCategories,
}