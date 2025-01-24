const pool = require('../database/db');

async function getGuestbookStatus() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_guestbook_status');
        return res.rows;
    } finally {
        client.release();
    }
}

async function addGuestbookStatus(customer_id) {
    if (!customer_id) {
        return { error: 1, status: 404, data: 'Aucune donnée' };
    }

    const client = await pool.connect();
    try {
        const res = await client.query('SELECT _id FROM customer_accounts WHERE _id = $1', [customer_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
        }

        const lastIdRes = await client.query('SELECT _id FROM provider_guestbook_status ORDER BY _id DESC LIMIT 1');
        const newId = lastIdRes.rows.length > 0 ? parseInt(lastIdRes.rows[0]._id) + 1 : 1;

        const guestbookStatusData = {
            _id: newId,
            customer_id: customer_id,
            guestbook_activated: false
        };

        await client.query(
            'INSERT INTO provider_guestbook_status (_id, customer_id, guestbook_activated) VALUES ($1, $2, $3)',
            [guestbookStatusData._id, guestbookStatusData.customer_id, guestbookStatusData.guestbook_activated]
        );

        return { error: 0, status: 200, data: guestbookStatusData };
    } catch (error) {
        console.error('Erreur lors de l\'ajout du statut du livre d\'or:', error);
        return { error: 1, status: 500, data: 'Erreur interne du serveur' };
    } finally {
        client.release();
    }
}

async function modifyGuestbookStatus(providerGuestbookStatus) {
    if (!providerGuestbookStatus) {
        return { error: 1, status: 404, data: 'Aucune donnée' };
    }

    const client = await pool.connect();
    try {
        const res = await client.query('SELECT _id FROM provider_guestbook_status WHERE _id = $1', [providerGuestbookStatus._id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Statut non trouvé' };
        }

        await client.query(
            'UPDATE provider_guestbook_status SET guestbook_activated = $1 WHERE _id = $2',
            [providerGuestbookStatus.guestbook_activated, providerGuestbookStatus._id]
        );

        return { error: 0, status: 200, data: providerGuestbookStatus };
    } catch (error) {
        console.error('Erreur lors de la modification du statut du livre d\'or:', error);
        return { error: 1, status: 500, data: 'Erreur interne du serveur' };
    } finally {
        client.release();
    }
}

async function getProviderGuestbookStatusByCustomerId(customer_id) {
    if (!customer_id) {
        return { error: 1, status: 404, data: 'ID client manquant' };
    }

    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM provider_guestbook_status WHERE customer_id = $1', [customer_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Aucun statut du livre d\'or trouvé pour ce client' };
        }
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error('Erreur lors de la récupération du statut du livre d\'or:', error);
        return { error: 1, status: 500, data: 'Erreur interne du serveur' };
    } finally {
        client.release();
    }
}

module.exports = {
    getGuestbookStatus,
    addGuestbookStatus,
    modifyGuestbookStatus,
    getProviderGuestbookStatusByCustomerId,
};