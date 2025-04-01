const pool = require('../database/db');
// const { v4: uuidv4 } = require('uuid');

async function getTeams() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM teams_tournament');
        return { error: 0, status: 200, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des équipes' };
    } finally {
        client.release();
    }
}
async function addTeam(data){
    const client = await pool.connect();
    try {
        if (!data.name) {
            return { error: 1, status: 404, data: 'aucun nom d\'équipe fourni' };
        }

        if (!data.description) {
            return { error: 1, status: 404, data: 'aucune description fourni' };
        }



        const result = await client.query('SELECT * FROM teams_tournament WHERE name = $1', [data.name]);
        let newteam;
        if (result.rows.length !== 0) {
            return { error: 1, status: 404, data: 'Cette équipe existe déjà' };
        } else {

            const _idQuery = await client.query('SELECT MAX(_id) FROM teams_tournament');
            const maxId = _idQuery.rows[0].max;

            data._id = (maxId === null ? 1 : parseInt(maxId) + 1);

            newteam = await client.query('INSERT INTO teams_tournament (_id, name, description) VALUES ($1, $2, $3) RETURNING *', [data._id, data.name, data.description ]);
        }


        return { error: 0, status: 200, data: newteam.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la création de l\'équipe' };
    } finally {
        client.release();
    }
}
async function editTeam(editTeam) {
    const db = await pool.connect();
    const allowedFields = ["name", "description"];

    // Vérification de l'ID
    if (!editTeam.id || isNaN(editTeam.id)) {
        return { error: 1, status: 400, data: "ID invalide ou manquant" };
    }

    // Filtrer les champs à modifier
    const keys = Object.keys(editTeam).filter(key => allowedFields.includes(key));

    if (keys.length === 0) {
        return { error: 1, status: 400, data: "Aucun champ valide à mettre à jour" };
    }

    // Construction dynamique des champs SET et valeurs
    const updates = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
    const values = keys.map(key => editTeam[key]);

    // Ajouter l'ID à la fin pour le WHERE
    values.push(parseInt(editTeam.id));

    const query = `UPDATE teams_tournament SET ${updates} WHERE _id = $${values.length} RETURNING *`;



    try {
        const result = await db.query(query, values);
        if (result.rowCount === 0) {
            return { error: 1, status: 404, data: "Équipe introuvable" };
        }
        return { error: 0, status: 200, data: result.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: "Erreur lors de la mise à jour de l'équipe" };
    } finally {
        db.release();
    }
}

async function getTeamByID(_id){
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM teams_tournament WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Teams not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving the team by ID' };
    } finally {
        client.release();
    }
}
async function deleteTeamByID(_id){
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM teams_tournament WHERE _id = $1 RETURNING *', [_id]);
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Équipe non trouvé' };
        }
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression de l\'équipe' };
    } finally {
        client.release();
    }
}


module.exports = {
    getTeams,
    addTeam,
    editTeam,
    getTeamByID,
    deleteTeamByID
};