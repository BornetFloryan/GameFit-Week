const pool = require('../database/db');

class GoodiesService {
    async getAllGoodies() {
        const { rows } = await pool.query('SELECT * FROM goodies');
        return rows;
    }

    async getGoodieById(id) {
        const { rows } = await pool.query('SELECT * FROM goodies WHERE _id = $1', [id]);
        return rows[0];
    }

    async addGoodie(name, image, price, provider_service_categories_id) {
        const { rows: maxRows } = await pool.query('SELECT MAX(_id) as max_id FROM goodies');
        const newId = (maxRows[0].max_id || 0) + 1;

        const { rows } = await pool.query(
            'INSERT INTO goodies (_id, name, image, price, provider_service_categories_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [newId, name, image, price, provider_service_categories_id]
        );
        return rows[0];
    }

    async updateGoodie(id, name, image, price) {
        const { rows } = await pool.query(
            'UPDATE goodies SET name = $1, image = $2, price = $3 WHERE _id = $4 RETURNING *',
            [name, image, price, id]
        );
        return rows[0];
    }

    async deleteGoodie(id) {
        const res = await pool.query('DELETE FROM goodies WHERE _id = $1 RETURNING *', [id]);
        return res.rows[0];
    }

    async getGoodieSizes() {
        const { rows } = await pool.query('SELECT * FROM goodies_sizes');
        return rows;
    }

    async getGoodieVariations(goodieId) {
        const { rows } = await pool.query(
            'SELECT * FROM goodies_variations WHERE goodie_id = $1',
            [goodieId]
        );
        return rows;
    }

    async addGoodieVariation(goodie_id, size_id, stock) {
        const { rows: maxRows } = await pool.query('SELECT MAX(_id) as max_id FROM goodies_variations');
        const newId = (maxRows[0].max_id || 0) + 1;

        const { rows } = await pool.query(
            'INSERT INTO goodies_variations (_id, goodie_id, size_id, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [newId, goodie_id, size_id, stock]
        );
        return rows[0];
    }

    async updateGoodieVariation(id, goodie_id, size_id, stock) {
        const { rows } = await pool.query(
            'UPDATE goodies_variations SET goodie_id = $1, size_id = $2, stock = $3 WHERE _id = $4 RETURNING *',
            [goodie_id, size_id, stock, id]
        );
        return rows[0];
    }

    async deleteGoodieVariation(id) {
        await pool.query('DELETE FROM goodies_variations WHERE _id = $1', [id]);
        return { message: 'Goodie variation supprimée avec succès' };
    }

    async getGoodieVariationById(id) {
        const { rows } = await pool.query('SELECT * FROM goodies_variations WHERE _id = $1', [id]);
        return rows[0];
    }
}


module.exports = new GoodiesService();
