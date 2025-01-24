const pool = require('../database/db');

async function getProviderScheduleStatus() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_schedule_status');
        return res.rows;
    } finally {
        client.release();
    }
}

async function addProviderScheduleStatus(email) {
    if (!email) {
        return { error: 1, status: 404, data: 'Aucune donnée' };
    }

    const client = await pool.connect();
    try {
        const userRes = await client.query('SELECT _id FROM customer_accounts WHERE email = $1', [email]);
        if (userRes.rows.length === 0) {
            return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
        }

        const existingUser = userRes.rows[0];
        const statusRes = await client.query('SELECT _id FROM provider_schedule_status WHERE customer_id = $1', [existingUser._id]);
        if (statusRes.rows.length > 0) {
            return { error: 1, status: 404, data: 'Statut déjà existant pour le prestataire' };
        }

        const lastIdRes = await client.query('SELECT _id FROM provider_schedule_status ORDER BY _id DESC LIMIT 1');
        const newId = lastIdRes.rows.length > 0 ? parseInt(lastIdRes.rows[0]._id) + 1 : 1;

        const providerScheduleStatusData = {
            _id: newId,
            schedule_activated: false,
            customer_id: existingUser._id
        };

        await client.query(
            'INSERT INTO provider_schedule_status (_id, schedule_activated, customer_id) VALUES ($1, $2, $3)',
            [providerScheduleStatusData._id, providerScheduleStatusData.schedule_activated, providerScheduleStatusData.customer_id]
        );

        return { error: 0, status: 200, data: providerScheduleStatusData };
    } catch (error) {
        console.error('Erreur lors de l\'ajout du statut de planning:', error);
        return { error: 1, status: 500, data: 'Erreur interne du serveur' };
    } finally {
        client.release();
    }
}

async function modifyProviderScheduleStatus(providerScheduleStatus) {
    if (!providerScheduleStatus) {
        return { error: 1, status: 404, data: 'Aucune donnée' };
    }
    if (!providerScheduleStatus._id) {
        return { error: 1, status: 404, data: 'ID manquant' };
    }

    const client = await pool.connect();
    try {
        const statusRes = await client.query('SELECT _id FROM provider_schedule_status WHERE _id = $1', [providerScheduleStatus._id]);
        if (statusRes.rows.length === 0) {
            return { error: 1, status: 404, data: 'Statut non trouvé' };
        }

        await client.query(
            'UPDATE provider_schedule_status SET schedule_activated = $1, customer_id = $2 WHERE _id = $3',
            [providerScheduleStatus.schedule_activated, providerScheduleStatus.customer_id, providerScheduleStatus._id]
        );

        return { error: 0, status: 200, data: providerScheduleStatus };
    } catch (error) {
        console.error('Erreur lors de la modification du statut de planning:', error);
        return { error: 1, status: 500, data: 'Erreur interne du serveur' };
    } finally {
        client.release();
    }
}

async function getProviderScheduleStatusByCustomerId(customer_id) {
    if (!customer_id) {
        return { error: 1, status: 404, data: 'ID client manquant' };
    }

    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_schedule_status WHERE customer_id = $1', [customer_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Aucun statut de planning trouvé pour ce client' };
        }
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error('Erreur lors de la récupération du statut de planning:', error);
        return { error: 1, status: 500, data: 'Erreur interne du serveur' };
    } finally {
        client.release();
    }
}

module.exports = {
    getProviderScheduleStatus,
    addProviderScheduleStatus,
    modifyProviderScheduleStatus,
    getProviderScheduleStatusByCustomerId,
};