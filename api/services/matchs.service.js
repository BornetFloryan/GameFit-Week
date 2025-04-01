const pool = require('../database/db');


async function getMatchs(){
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM matchs_tournament');
        return { error: 0, status: 200, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des matchs' };
    } finally {
        client.release();
    }
}
async function createMatch(data){
    const client = await pool.connect();
    try {
        if (!data.round_id) {return { error: 1, status: 404, data: 'aucun round_id fourni' };}
        if (!data.equipe1_id) {return { error: 1, status: 404, data: 'aucun id d\'équipe1 fourni' };}
        if (!data.equipe2_id) {return { error: 1, status: 404, data: 'aucun id d\'équipe2 fourni' };}
        // if (data.score_equipe1 === undefined || data.score_equipe1 === null) {return { error: 1, status: 404, data: 'score d\'équipe1 manquant' };}
        // if (data.score_equipe2 === undefined || data.score_equipe2 === null) {return { error: 1, status: 404, data: 'score d\'équipe2 manquant' };}
        // if (!data.gagnant_id) {return { error: 1, status: 404, data: 'id d\'équipe vainqueur manquant' };}
        if (!data.date_match) {return { error: 1, status: 404, data: 'date du match manquante' };}


        const isMatchExist = await client.query('SELECT * FROM matchs_tournament WHERE (equipe1_id = $1 AND equipe2_id =$2) OR (equipe2_id = $1 AND equipe1_id =$2)', [data.equipe1_id,data.equipe2_id]);

        let newmatch;
        if (isMatchExist.rows.length !== 0) {
            return { error: 1, status: 404, data: 'Ce match entre ces deux équipes existe déjà' };
        } else {

            const _idQuery = await client.query('SELECT MAX(_id) FROM matchs_tournament');
            const maxId = _idQuery.rows[0].max;

            data._id = (maxId === null ? 1 : parseInt(maxId) + 1);
            data.gagnant_id = null;
            data.score_equipe1 = null;
            data.score_equipe2 = null;

            newmatch = await client.query('INSERT INTO matchs_tournament (_id,round_id,equipe1_id,equipe2_id,score_equipe1,score_equipe2,gagnant_id,date_match) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [data._id,data.round_id,data.equipe1_id,data.equipe2_id,data.score_equipe1,data.score_equipe2,  data.gagnant_id
        ,data.date_match]);
        }

        return { error: 0, status: 200, data: newmatch.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la création du match' };
    } finally {
        client.release();
    }
}
async function editMatch(editMatch){
    const db = await pool.connect();
    const allowedFields = ["round_id","equipe1_id","equipe2_id","score_equipe1","score_equipe2","gagnant_id","date_match"];

    if (!editMatch.id || isNaN(editMatch.id)) {
        return { error: 1, status: 400, data: "ID invalide ou manquant" };
    }

    const keys = Object.keys(editMatch).filter(key => allowedFields.includes(key));

    if (keys.length === 0) {
        return { error: 1, status: 400, data: "Aucun champ valide à mettre à jour" };
    }

    const updates = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
    const values = keys.map(key => editMatch[key]);

    values.push(parseInt(editMatch.id));
    const query = `UPDATE matchs_tournament SET ${updates} WHERE _id = $${values.length} RETURNING *`;
    try {
        const result = await db.query(query, values);
        if (result.rowCount === 0) {
            return { error: 1, status: 404, data: "Match introuvable" };
        }
        return { error: 0, status: 200, data: result.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: "Erreur lors de la mise à jour du match" };
    } finally {
        db.release();
    }
}
async function deleteMatchByID(_id){
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM matchs_tournament WHERE _id = $1 RETURNING *', [_id]);
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Match non trouvé' };
        }
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression du match' };
    } finally {
        client.release();
    }
}
async function getMatchByID(_id){
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM matchs_tournament WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Match not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving the match by ID' };
    } finally {
        client.release();
    }
}

module.exports = {
    getMatchs,
    createMatch,
    editMatch,
    deleteMatchByID,
    getMatchByID
};