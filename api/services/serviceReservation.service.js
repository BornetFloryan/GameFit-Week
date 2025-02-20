const pool = require('../database/db');

async function getServiceReservations() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM service_reservations');
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations de services' };
    } finally {
        client.release();
    }
}

async function addServiceReservation(serviceReservation) {
    const client = await pool.connect();
    try {
        if (serviceReservation == null) {
            return { error: 1, status: 404, data: 'Service reservation object is missing' };
        }
        if (serviceReservation.date == null) {
            return { error: 1, status: 404, data: 'Date is missing' };
        }
        if (serviceReservation.time == null) {
            return { error: 1, status: 404, data: 'Time is missing' };
        }
        if (serviceReservation.ticket_id == null) {
            return { error: 1, status: 404, data: 'Ticket ID is missing' };
        }
        if (serviceReservation.service_id == null) {
            return { error: 1, status: 404, data: 'Service ID is missing' };
        }
        if (serviceReservation.stand_reservation_id == null) {
            return { error: 1, status: 404, data: 'Stand reservation ID is missing' };
        }

        const ticketRes = await client.query('SELECT _id FROM tickets WHERE _id = $1', [serviceReservation.ticket_id]);
        if (ticketRes.rows.length === 0) {
            return { error: 1, status: 404, data: 'Ticket non trouvé' };
        }

        const lastIdRes = await client.query('SELECT MAX(_id) AS last_id FROM service_reservations');
        const newId = (lastIdRes.rows[0].last_id || 0) + 1;

        const res = await client.query(
            'INSERT INTO service_reservations (_id, date, time, ticket_id, service_id, stand_reservation_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [newId, serviceReservation.date, serviceReservation.time, serviceReservation.ticket_id, serviceReservation.service_id, serviceReservation.stand_reservation_id]
        );
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout de la réservation de service' };
    } finally {
        client.release();
    }
}

async function modifyServiceReservation(serviceReservation) {
    const client = await pool.connect();
    try {
        if (!serviceReservation || !serviceReservation._id || !serviceReservation.date || !serviceReservation.time || !serviceReservation.ticket_id || !serviceReservation.service_id || !serviceReservation.stand_reservation_id) {
            return { error: 1, status: 404, data: 'Champs manquants' };
        }

        const ticketRes = await client.query('SELECT _id FROM tickets WHERE _id = $1', [serviceReservation.ticket_id]);
        if (ticketRes.rows.length === 0) {
            return { error: 1, status: 404, data: 'Ticket non trouvé' };
        }

        const res = await client.query(
            'UPDATE service_reservations SET date = $1, time = $2, ticket_id = $3, service_id = $4, stand_reservation_id = $5 WHERE _id = $6 RETURNING *',
            [serviceReservation.date, serviceReservation.time, serviceReservation.ticket_id, serviceReservation.service_id, serviceReservation.stand_reservation_id, serviceReservation._id]
        );
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Réservation non trouvée' };
        }
        return { error: 0, status: 200, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la modification de la réservation de service' };
    } finally {
        client.release();
    }
}


async function deleteServiceReservation(id) {
    const client = await pool.connect();
    try {
        if (!id) {
            return { error: 1, status: 404, data: 'Champs manquants' };
        }

        const res = await client.query('DELETE FROM service_reservations WHERE _id = $1 RETURNING _id', [id]);
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Réservation non trouvée' };
        }
        return { error: 0, status: 200, data: res.rows[0]._id };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression de la réservation de service' };
    } finally {
        client.release();
    }
}

async function getServiceReservationsById(_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM service_reservations WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Service reservation not found' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving service reservation by ID' };
    } finally {
        client.release();
    }
}

async function getServiceReservationsByTicketId(ticket_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM service_reservations WHERE ticket_id = $1', [ticket_id]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving service reservations by ticket ID' };
    } finally {
        client.release();
    }
}

async function getServiceReservationByServiceId(service_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM service_reservations WHERE service_id = $1', [service_id]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving service reservations by service ID' };
    } finally {
        client.release();
    }
}

async function getServiceReservationsByStandsReservationsIdAndServiceId(standsReservationsId, service_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM service_reservations WHERE stand_reservation_id = $1 AND service_id = $2', [standsReservationsId, service_id]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving service reservations by stand reservation ID and service ID' };
    } finally {
        client.release();
    }
}

async function getServiceReservationsByTicketIdAndDate(ticket_id, date) {
    const client = await pool.connect();
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        const res = await client.query('SELECT * FROM service_reservations WHERE ticket_id = $1 AND date = $2', [ticket_id, dateObj]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving service reservations by ticket ID and date' };
    } finally {
        client.release();
    }
}

async function getServiceReservationsByDate(date) {
    const client = await pool.connect();
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        const res = await client.query('SELECT * FROM service_reservations WHERE date = $1', [dateObj]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving service reservations by date' };
    } finally {
        client.release();
    }
}

module.exports = {
    getServiceReservations,
    addServiceReservation,
    modifyServiceReservation,
    deleteServiceReservation,
    getServiceReservationsById,
    getServiceReservationsByTicketId,
    getServiceReservationByServiceId,
    getServiceReservationsByStandsReservationsIdAndServiceId,
    getServiceReservationsByTicketIdAndDate,
    getServiceReservationsByDate,
};