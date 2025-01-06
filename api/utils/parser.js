const fs = require('fs');
const pool = require('../database/db');

const {
    customer_accounts,
    service_categories,
    provider_service_categories,
    sports_categories,
    provider_sport_categories,
    ticket_animation_categories,
    ticket_age_categories,
    ticket_prices,
    tickets,
    dedication_reservations,
    pavillons,
    stands,
} = require('../../src/datasource/data');

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

        for (const category of service_categories) {
            const { _id, name } = category;
            await insertIfNotExists(
                'SELECT _id FROM service_categories WHERE _id = $1',
                'INSERT INTO service_categories (_id, name) VALUES ($1, $2)',
                [_id, name]
            );
        }

        for (const entry of provider_service_categories) {
            const { _id, service_id, provider_id } = entry;
            await insertIfNotExists(
                'SELECT _id FROM provider_service_categories WHERE _id = $1',
                'INSERT INTO provider_service_categories (_id, customer_id, customer_id) VALUES ($1, $2, $3)',
                [_id, service_id, provider_id]
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
            const { _id, sport_id, provider_id } = entry;
            await insertIfNotExists(
                'SELECT _id FROM provider_sport_categories WHERE _id = $1',
                'INSERT INTO provider_sport_categories (_id, sport_id, customer_id) VALUES ($1, $2, $3)',
                [_id, sport_id, provider_id]
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
            const { _id, age_category_id, animation_category_id, price: ticketPrice } = price;
            await insertIfNotExists(
                'SELECT _id FROM ticket_prices WHERE _id = $1',
                'INSERT INTO ticket_prices (_id, age_category_id, animation_category_id, price) VALUES ($1, $2, $3, $4)',
                [_id, age_category_id || 0, animation_category_id || 0, ticketPrice || 0]
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

        for (const reservation of dedication_reservations) {
            const { _id, date, time, ticket_id, anim_id } = reservation;
            await insertIfNotExists(
                'SELECT _id FROM dedication_reservations WHERE _id = $1',
                'INSERT INTO dedication_reservations (_id, date, time, ticket_id, customer_id) VALUES ($1, $2, $3, $4, $5)',
                [_id, date, time, ticket_id || 0, anim_id || 0]
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

        console.log('Données insérées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données:', error);
    }
};

insertData();
