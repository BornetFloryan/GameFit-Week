const pool = require('../config/db.config');

async function getRounds(){
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM rounds_tournament');
        return { error: 0, status: 200, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des rounds' };
    } finally {
        client.release();
    }
}
async function createRound(data){
    const client = await pool.connect();
    try {
        if (!data.name) {
            return { error: 1, status: 404, data: 'aucun nom fourni' };
        }

        // if (!data.numero) {
        //     return { error: 1, status: 404, data: 'aucun numero fourni' };
        // }

        const result = await client.query('SELECT * FROM rounds_tournament WHERE name = $1', [data.name]);
        let newround;
        if (result.rows.length !== 0) {
            return { error: 1, status: 404, data: 'Ce round existe déjà' };
        } else {

            const _idQuery = await client.query('SELECT MAX(_id) FROM rounds_tournament');
            const maxId = _idQuery.rows[0].max;

            data._id = (maxId === null ? 1 : parseInt(maxId) + 1);

            newround = await client.query('INSERT INTO rounds_tournament (_id,name) VALUES ($1, $2) RETURNING *', [data._id, data.name ]);
        }


        return { error: 0, status: 200, data: newround.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la création du round' };
    } finally {
        client.release();
    }
}
async function deleteRoundByID(_id){
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM rounds_tournament WHERE _id = $1 RETURNING *', [_id]);
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Round non trouvé' };
        }
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression du round' };
    } finally {
        client.release();
    }
}
async function getRoundByID(_id){
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM rounds_tournament WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Round not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving the round by ID' };
    } finally {
        client.release();
    }
}
async function editRound(editRound){
    const db = await pool.connect();
    const allowedFields = ["name"];

    // Vérification de l'ID
    if (!editRound.id || isNaN(editRound.id)) {
        return { error: 1, status: 400, data: "ID invalide ou manquant" };
    }

    // Filtrer les champs à modifier
    const keys = Object.keys(editRound).filter(key => allowedFields.includes(key));

    if (keys.length === 0) {
        return { error: 1, status: 400, data: "Aucun champ valide à mettre à jour" };
    }

    // Construction dynamique des champs SET et valeurs
    const updates = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
    const values = keys.map(key => editRound[key]);

    // Ajouter l'ID à la fin pour le WHERE
    values.push(parseInt(editRound.id));

    const query = `UPDATE rounds_tournament SET ${updates} WHERE _id = $${values.length} RETURNING *`;



    try {
        const result = await db.query(query, values);
        if (result.rowCount === 0) {
            return { error: 1, status: 404, data: "Round introuvable" };
        }
        return { error: 0, status: 200, data: result.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: "Erreur lors de la mise à jour du round" };
    } finally {
        db.release();
    }
}


module.exports = {
    getRounds,
    editRound,
    deleteRoundByID,
    getRoundByID,
    createRound
};