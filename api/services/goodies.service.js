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

    async addGoodie(name, image, price,description) {
        const { rows } = await pool.query(
            'INSERT INTO goodies (name, image, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, image, price, description]
        );
        return rows[0];
    }

    async updateGoodie(id, name, image, description) {
        const { rows } = await pool.query(
            'UPDATE goodies SET name = $1, image = $2, description = $3 WHERE _id = $4 RETURNING *',
            [name, image, description, id]
        );
        return rows[0];
    }

    async deleteGoodie(id) {
        await pool.query('DELETE FROM goodies WHERE _id = $1', [id]);
        return { message: 'Goodie supprimé avec succès' };
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

    async addGoodieVariation(goodie_id, size_id, price) {
        const { rows } = await pool.query(
            'INSERT INTO goodies_variations (goodie_id, size_id) VALUES ($1, $2) RETURNING *',
            [goodie_id, size_id, price]
        );
        return rows[0];
    }
}

module.exports = new GoodiesService();
