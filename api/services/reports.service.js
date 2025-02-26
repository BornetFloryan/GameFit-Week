const pool = require('../database/db');

async function getReports() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM reports');
        return { error: 0, data: res.rows };
    } catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error retrieving reports' };
    } finally {
        client.release();
    }
}

async function addReport(formData) {
    if (!formData.date || !formData.reason || formData.state === undefined || !formData.guestbook_entry_id === undefined) {
        return { error: 1, status: 400, data: 'Invalid input data' };
    }

    const client = await pool.connect();
    try {
        const res = await client.query('INSERT INTO reports (date, reason, state, guestbook_entry_id) VALUES ($1, $2, $3, $4) RETURNING *', [formData.date, formData.reason, formData.state, formData.guestbook_entry_id]);
        return { error: 0, data: res.rows[0] };
    }
    catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error adding report' };
    } finally {
        client.release();
    }
}

async function updateReport(formData) {
    if (!formData.date) {
        return { error: 1, status: 400, data: 'Invalid input data: date is missing' };
    }
    if (!formData.reason) {
        return { error: 1, status: 400, data: 'Invalid input data: reason is missing' };
    }
    if (formData.state === undefined) {
        return { error: 1, status: 400, data: 'Invalid input data: state is missing' };
    }
    if (formData.guestbook_entry_id === undefined) {
        return { error: 1, status: 400, data: 'Invalid input data: guestbook_entry_id is missing' };
    }
    if (!formData._id === undefined) {
        return { error: 1, status: 400, data: 'Invalid input data: _id is missing' };
    }

    const client = await pool.connect();
    try {
        const res = await client.query('UPDATE reports SET date = $1, reason = $2, state = $3, guestbook_entry_id = $4 WHERE _id = $5 RETURNING *', [formData.date, formData.reason, formData.state, formData.guestbook_entry_id, formData._id]);
        return { error: 0, data: res.rows[0] };
    }
    catch (error) {
        console.error(error);
        return { error: 1, status: 500, data: 'Error updating report' };
    } finally {
        client.release();
    }
}

module.exports = {
    getReports,
    addReport,
    updateReport,
}