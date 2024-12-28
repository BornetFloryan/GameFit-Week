const pool = require('../database/db');

async function getStands() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM stands');
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getStands,
};