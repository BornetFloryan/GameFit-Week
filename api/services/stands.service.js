const pool = require('../database/db');

async function getStands() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM stands');
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des stands' };
    } finally {
        client.release();
    }
}

async function getPavillons() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM pavillons');
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des pavillons' };
    } finally {
        client.release();
    }
}

async function getStandsReservations() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM stands_reservations');
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations de stands' };
    } finally {
        client.release();
    }
}

async function modifyStand(stand) {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'UPDATE stands SET name = $1, price = $2, pavillon_id = $3 WHERE _id = $4 RETURNING *',
            [stand.name, stand.price, stand.pavillon_id, stand._id]
        );
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Stand introuvable' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la modification du stand' };
    } finally {
        client.release();
    }
}

async function modifyStandsReservations(standReservation) {
    const client = await pool.connect();
    try {
        const dateObj = standReservation.date instanceof Date ? standReservation.date : new Date(standReservation.date);
        const res = await client.query(
            'UPDATE stands_reservations SET date = $1, stand_id = $2, customer_id = $3, description = $4, start_time = $5, end_time = $6, service_id = $7 WHERE _id = $8 RETURNING *',
            [dateObj, standReservation.stand_id, standReservation.customer_id, standReservation.description, standReservation.start_time, standReservation.end_time, standReservation.service_id, standReservation._id]
        );
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Réservation de stand introuvable' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la modification de la réservation de stand' };
    } finally {
        client.release();
    }
}

async function addStandReservation(standReservation) {
    const client = await pool.connect();
    try {
        const dateObj = standReservation.date instanceof Date ? standReservation.date : new Date(standReservation.date);
        const lastIdRes = await client.query('SELECT _id FROM stands_reservations ORDER BY _id DESC LIMIT 1');
        const newId = lastIdRes.rows.length ? lastIdRes.rows[0]._id + 1 : 1;

        const res = await client.query(
            'INSERT INTO stands_reservations (_id, date, stand_id, customer_id, description, start_time, end_time, service_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [newId, dateObj, standReservation.stand_id, standReservation.customer_id, standReservation.description, standReservation.start_time, standReservation.end_time, standReservation.service_id]
        );
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de l\'ajout de la réservation de stand' };
    } finally {
        client.release();
    }
}

async function deleteStandReservation(_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM stands_reservations WHERE _id = $1 RETURNING _id', [_id]);
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Réservation de stand introuvable' };
        }
        return { error: 0, data: res.rows[0]._id };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression de la réservation de stand' };
    } finally {
        client.release();
    }
}

async function deleteStand(_id) {
    const client = await pool.connect();
    try {
        const standReservation = await client.query('SELECT * FROM stands_reservations WHERE stand_id = $1', [_id]);
        if (standReservation.rows.length > 0) {
            await client.query('DELETE FROM stands_reservations WHERE stand_id = $1', [_id]);
        }
        
        const res = await client.query('DELETE FROM stands WHERE _id = $1 RETURNING _id', [_id]);
        if (res.rowCount === 0) {
            return { error: 1, status: 404, data: 'Stand introuvable' };
        }
        return { error: 0, data: res.rows[0]._id };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la suppression du stand' };
    } finally {
        client.release();
    }
}

async function getStandById(_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM stands WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Stand introuvable' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération du stand' };
    } finally {
        client.release();
    }
}

async function getStandReservationById(_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM stands_reservations WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Réservation de stand introuvable' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération de la réservation de stand' };
    } finally {
        client.release();
    }
}

async function getStandReservationsByStandId(stand_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM stands_reservations WHERE stand_id = $1', [stand_id]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations de stand' };
    } finally {
        client.release();
    }
}

async function getStandsReservationsByStandIdAndDate(stand_id, date) {
    const client = await pool.connect();
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        const res = await client.query('SELECT * FROM stands_reservations WHERE stand_id = $1 AND date = $2', [stand_id, dateObj]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations de stand' };
    } finally {
        client.release();
    }
}

async function getStandsReservationsByCustomerId(customer_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM stands_reservations WHERE customer_id = $1', [customer_id]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations de stand' };
    } finally {
        client.release();
    }
}

async function getStandsReservationsByServiceId(service_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM stands_reservations WHERE service_id = $1', [service_id]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations de stand' };
    } finally {
        client.release();
    }
}

async function getStandsReservationsByCustomerIdAndServiceId(customer_id, service_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM stands_reservations WHERE customer_id = $1 AND service_id = $2', [customer_id, service_id]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations de stand' };
    } finally {
        client.release();
    }
}

async function getStandsReservationsByCustomerIdAndServiceIdAndDate(customer_id, service_id, date) {
    const client = await pool.connect();
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        const res = await client.query('SELECT * FROM stands_reservations WHERE customer_id = $1 AND service_id = $2 AND date = $3', [customer_id, service_id, dateObj]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations de stand' };
    } finally {
        client.release();
    }
}

async function getStandsReservationsByCustomerIdAndDateAndExcludingStandId(customer_id, date, stand_id) {
    const client = await pool.connect();
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        const res = await client.query('SELECT * FROM stands_reservations WHERE customer_id = $1 AND date = $2 AND stand_id != $3', [customer_id, dateObj, stand_id]);
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération des réservations de stand' };
    } finally {
        client.release();
    }
}

async function getPavillonById(_id) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM pavillons WHERE _id = $1', [_id]);
        if (res.rows.length === 0) {
            return { error: 1, status: 404, data: 'Pavillon introuvable' };
        }
        return { error: 0, data: res.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Erreur lors de la récupération du pavillon' };
    } finally {
        client.release();
    }
}

module.exports = {
    getStands,
    getPavillons,
    getStandsReservations,
    modifyStand,
    modifyStandsReservations,
    addStandReservation,
    deleteStandReservation,
    deleteStand,
    getStandById,
    getStandReservationById,
    getStandReservationsByStandId,
    getStandsReservationsByStandIdAndDate,
    getStandsReservationsByCustomerId,
    getStandsReservationsByServiceId,
    getStandsReservationsByCustomerIdAndServiceId,
    getStandsReservationsByCustomerIdAndServiceIdAndDate,
    getStandsReservationsByCustomerIdAndDateAndExcludingStandId,
    getPavillonById,
};