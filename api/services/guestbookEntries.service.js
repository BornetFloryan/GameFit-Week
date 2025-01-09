const pool = require('../database/db');

async function getGuestbookEntries() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM guestbook_entries');
        return res.rows;
    } finally {
        client.release();
    }
}

async function addGuestbookEntry(guestbookEntry) {
    if (!guestbookEntry) {
        return {error: 1, status: 404, data: 'Aucune donnée'};
    }
    if (!guestbookEntry.newEntry) {
        return {error: 1, status: 404, data: 'Aucune donnée'};
    }
    if (!guestbookEntry.currentUser) {
        return {error: 1, status: 404, data: 'Utilisateur non renseigné'};
    }
    if (!guestbookEntry.prestataire) {
        return {error: 1, status: 404, data: 'Prestataire non renseigné'};
    }
    if (!guestbookEntry.newEntry.rating) {
        return {error: 1, status: 404, data: 'Note manquante'};
    }
    if (!guestbookEntry.newEntry.comment) {
        return {error: 1, status: 404, data: 'Commentaire manquant'};
    }

    const date = new Date();
    const client = await pool.connect();

    try {
        const ticketsRes = await client.query('SELECT _id FROM tickets WHERE customer_id = $1', [guestbookEntry.currentUser._id]);
        if (ticketsRes.rows.length === 0) {
            return {error: 1, status: 404, data: 'Pas de tickets trouvés pour l\'utilisateur'};
        }

        const ticketIds = ticketsRes.rows.map(row => row._id);
        const serviceReservationsRes = await client.query('SELECT _id, stand_reservation_id FROM service_reservations WHERE ticket_id = ANY($1)', [ticketIds]);
        if (serviceReservationsRes.rows.length === 0) {
            return {error: 1, status: 404, data: 'Pas de réservations de service trouvée pour les tickets'};
        }

        const standReservationsRes = await client.query('SELECT _id FROM stands_reservations WHERE customer_id = $1', [guestbookEntry.prestataire._id]);
        if (standReservationsRes.rows.length === 0) {
            return {error: 1, status: 404, data: 'Pas de réservation de stand trouvée pour le prestataire'};
        }

        const customerServiceReservationRes = await client.query(`
            SELECT sr._id
            FROM service_reservations sr
                     JOIN stands_reservations str ON sr.stand_reservation_id = str._id
            WHERE sr.ticket_id = ANY ($1)
              AND str.customer_id = $2
            LIMIT 1
        `, [ticketIds, guestbookEntry.prestataire._id]);

        if (customerServiceReservationRes.rows.length === 0) {
            return {error: 1, status: 404, data: 'Aucune réservation de service n\'est liée au prestataire'};
        }

        const customerServiceReservation = customerServiceReservationRes.rows[0];

        const lastIdRes = await client.query('SELECT _id FROM guestbook_entries ORDER BY _id DESC LIMIT 1');
        const newId = lastIdRes.rows.length > 0 ? parseInt(lastIdRes.rows[0]._id) + 1 : 1;

        const guestbookEntryData = {
            _id: newId,
            date: date,
            rating: guestbookEntry.newEntry.rating,
            comment: guestbookEntry.newEntry.comment,
            service_reservations_id: customerServiceReservation._id
        };

        await client.query(
            'INSERT INTO guestbook_entries (_id, date, rating, comment, service_reservations_id) VALUES ($1, $2, $3, $4, $5)',
            [guestbookEntryData._id, guestbookEntryData.date, guestbookEntryData.rating, guestbookEntryData.comment, guestbookEntryData.service_reservations_id]
        );

        return {error: 0, status: 200, data: guestbookEntryData};
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'entrée du livre d\'or:', error);
        return {error: 1, status: 500, data: 'Erreur interne du serveur'};
    } finally {
        client.release();
    }
}

async function getGuestbookEntriesByCustomerId(customer_id) {
    const client = await pool.connect();
    try {
        const res = await client.query(`
            SELECT ge.*
            FROM guestbook_entries ge
            JOIN service_reservations sr ON ge.service_reservations_id = sr._id
            JOIN stands_reservations str ON sr.stand_reservation_id = str._id
            WHERE str.customer_id = $1
        `, [customer_id]);
        return res.rows;
    } finally {
        client.release();
    }
}

module.exports = {
    getGuestbookEntries,
    addGuestbookEntry,
    getGuestbookEntriesByCustomerId,
}