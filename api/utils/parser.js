const fs = require('fs');
const pool = require('../database/db');

const {
    customer_accounts,
    provider_requests,
    service_categories,
    provider_service_categories,
    sports_categories,
    provider_sport_categories,
    ticket_animation_categories,
    ticket_age_categories,
    ticket_prices,
    tickets,
    pavillons,
    stands,
    stands_reservations,
    service_reservations,
} = require('../../src/datasource/data');

const provider_guestbook_status = [
    { customer_id: "2", guestbook_activated: true },
    { customer_id: "3", guestbook_activated: true },
    { customer_id: "4", guestbook_activated: false },
    { customer_id: "5", guestbook_activated: true },
    { customer_id: "6", guestbook_activated: false },
    { customer_id: "7", guestbook_activated: true },
    { customer_id: "8", guestbook_activated: false },
    { customer_id: "9", guestbook_activated: true },
    { customer_id: "10", guestbook_activated: false },
    { customer_id: "11", guestbook_activated: true },
    { customer_id: "12", guestbook_activated: false },
    { customer_id: "13", guestbook_activated: true },
    { customer_id: "14", guestbook_activated: false },
    { customer_id: "15", guestbook_activated: true },
    { customer_id: "16", guestbook_activated: false },
    { customer_id: "17", guestbook_activated: true },
    { customer_id: "18", guestbook_activated: false }
];

const provider_schedule_status = [
    { customer_id: "2", schedule_activated: true },
    { customer_id: "3", schedule_activated: true },
    { customer_id: "4", schedule_activated: false },
    { customer_id: "5", schedule_activated: true },
    { customer_id: "6", schedule_activated: false },
    { customer_id: "7", schedule_activated: true },
    { customer_id: "8", schedule_activated: false },
    { customer_id: "9", schedule_activated: true },
    { customer_id: "10", schedule_activated: false },
    { customer_id: "11", schedule_activated: true },
    { customer_id: "12", schedule_activated: false },
    { customer_id: "13", schedule_activated: true },
    { customer_id: "14", schedule_activated: false },
    { customer_id: "15", schedule_activated: true },
    { customer_id: "16", schedule_activated: false },
    { customer_id: "17", schedule_activated: true },
    { customer_id: "18", schedule_activated: false }
];

const guestbook_entries = [
    { _id: "0", date: "2025-07-07T14:00:00.000Z", rating: "5", comment: "Super événement, j'ai adoré !", service_reservations_id: "0" },
    { _id: "1", date: "2025-07-07T15:00:00.000Z", rating: "4", comment: "Très bonne organisation !", service_reservations_id: "1" }
];

const executeSQLFile = async (filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.query(sql);
};

const insertData = async () => {
    try {
        await executeSQLFile('datasource/data.sql');

        const insertIfNotExists = async (querySelect, queryInsert, values) => {
            const res = await pool.query(querySelect, [values[0]]);
            if (res.rows.length === 0) {
                await pool.query(queryInsert, values);
            }
        };

        for (const customer of customer_accounts) {
            const { _id, name, login, password, email, picture, description, privilege, session } = customer;
            await insertIfNotExists(
                'SELECT _id FROM customer_accounts WHERE _id = $1',
                'INSERT INTO customer_accounts (_id, name, login, password, email, picture, description, privilege, session) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [_id, name, login, password, email, picture, description, privilege || 0, session]
            );
        }

        for (const request of provider_requests) {
            const { _id, date, state, customer_id } = request;
            await insertIfNotExists(
                'SELECT _id FROM provider_requests WHERE _id = $1',
                'INSERT INTO provider_requests (_id, date, state, customer_id) VALUES ($1, $2, $3, $4)',
                [_id, date, state, customer_id]
            );
        }

        for (const category of service_categories) {
            const { _id, name } = category;
            await insertIfNotExists(
                'SELECT _id FROM service_categories WHERE _id = $1',
                'INSERT INTO service_categories (_id, name) VALUES ($1, $2)',
                [_id, name]
            );
        }

        for (const entry of provider_service_categories) {
            const { _id, state, customer_id, service_id } = entry;
            await insertIfNotExists(
                'SELECT _id FROM provider_service_categories WHERE _id = $1',
                'INSERT INTO provider_service_categories (_id, state, customer_id, service_id) VALUES ($1, $2, $3, $4)',
                [_id, state, customer_id, service_id]
            );
        }

        for (const category of sports_categories) {
            const { _id, name, description } = category;
            await insertIfNotExists(
                'SELECT _id FROM sports_categories WHERE _id = $1',
                'INSERT INTO sports_categories (_id, name, description) VALUES ($1, $2, $3)',
                [_id, name, description]
            );
        }

        for (const entry of provider_sport_categories) {
            const { _id, customer_id, sport_id } = entry;
            await insertIfNotExists(
                'SELECT _id FROM provider_sport_categories WHERE _id = $1',
                'INSERT INTO provider_sport_categories (_id, customer_id, sport_id) VALUES ($1, $2, $3)',
                [_id, customer_id, sport_id]
            );
        }

        for (const category of ticket_animation_categories) {
            const { _id, name, description } = category;
            await insertIfNotExists(
                'SELECT _id FROM ticket_animation_categories WHERE _id = $1',
                'INSERT INTO ticket_animation_categories (_id, name, description) VALUES ($1, $2, $3)',
                [_id, name, description]
            );
        }

        for (const category of ticket_age_categories) {
            const { _id, name, description } = category;
            await insertIfNotExists(
                'SELECT _id FROM ticket_age_categories WHERE _id = $1',
                'INSERT INTO ticket_age_categories (_id, name, description) VALUES ($1, $2, $3)',
                [_id, name, description || null]
            );
        }

        for (const price of ticket_prices) {
            const { _id, price: ticketPrice, age_category_id, animation_category_id } = price;
            await insertIfNotExists(
                'SELECT _id FROM ticket_prices WHERE _id = $1',
                'INSERT INTO ticket_prices (_id, price, age_category_id, animation_category_id) VALUES ($1, $2, $3, $4)',
                [_id, ticketPrice || 0, age_category_id || 0, animation_category_id || 0]
            );
        }

        for (const ticket of tickets) {
            const { _id, date, time, customer_id, price_id } = ticket;
            await insertIfNotExists(
                'SELECT _id FROM tickets WHERE _id = $1',
                'INSERT INTO tickets (_id, date, time, customer_id, price_id) VALUES ($1, $2, $3, $4, $5)',
                [_id, date, time, customer_id || 0, price_id || 0]
            );
        }

        for (const pavillon of pavillons) {
            const { _id, name } = pavillon;
            await insertIfNotExists(
                'SELECT _id FROM pavillons WHERE _id = $1',
                'INSERT INTO pavillons (_id, name) VALUES ($1, $2)',
                [_id, name]
            );
        }

        for (const stand of stands) {
            const { _id, name, price, pavillon_id } = stand;
            await insertIfNotExists(
                'SELECT _id FROM stands WHERE _id = $1',
                'INSERT INTO stands (_id, name, price, pavillon_id) VALUES ($1, $2, $3, $4)',
                [_id, name, price || 0, pavillon_id]
            );
        }

        for (const reservation of stands_reservations) {
            const { _id, date, start_time, end_time, description, customer_id, service_id, stand_id } = reservation;
            await insertIfNotExists(
                'SELECT _id FROM stands_reservations WHERE _id = $1',
                'INSERT INTO stands_reservations (_id, date, start_time, end_time, description, customer_id, service_id, stand_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [_id, date, start_time, end_time, description, customer_id, service_id, stand_id]
            );
        }

        for (const reservation of service_reservations) {
            const { _id, date, time, ticket_id, service_id, stand_reservation_id } = reservation;
            await insertIfNotExists(
                'SELECT _id FROM service_reservations WHERE _id = $1',
                'INSERT INTO service_reservations (_id, date, time, ticket_id, service_id, stand_reservation_id) VALUES ($1, $2, $3, $4, $5, $6)',
                [_id, date, time, ticket_id, service_id, stand_reservation_id]
            );
        }

        for (const status of provider_guestbook_status) {
            const { customer_id, guestbook_activated } = status;
            await insertIfNotExists(
                'SELECT customer_id FROM provider_guestbook_status WHERE customer_id = $1',
                'INSERT INTO provider_guestbook_status (customer_id, guestbook_activated) VALUES ($1, $2)',
                [customer_id, guestbook_activated]
            );
        }

        for (const status of provider_schedule_status) {
            const { customer_id, schedule_activated } = status;
            await insertIfNotExists(
                'SELECT customer_id FROM provider_schedule_status WHERE customer_id = $1',
                'INSERT INTO provider_schedule_status (customer_id, schedule_activated) VALUES ($1, $2)',
                [customer_id, schedule_activated]
            );
        }

        for (const entry of guestbook_entries) {
            const { _id, date, rating, comment, service_reservations_id } = entry;
            await insertIfNotExists(
                'SELECT _id FROM guestbook_entries WHERE _id = $1',
                'INSERT INTO guestbook_entries (_id, date, rating, comment, service_reservations_id) VALUES ($1, $2, $3, $4, $5)',
                [_id, date, rating, comment, service_reservations_id]
            );
        }

        console.log('Données insérées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données:', error);
    }
};

insertData();