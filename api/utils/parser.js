const fs = require('fs');
const pool = require('../database/db');
const path = require('path');

const {
    content_home,
    customer_accounts,
    provider_requests,
    service_categories,
    provider_service_categories,
    sports_categories,
    provider_sport_categories,
    ticket_age_categories,
    ticket_prices,
    tickets,
    pavillons,
    stands,
    stands_reservations,
    service_reservations,
    provider_guestbook_status,
    provider_schedule_status,
    guestbook_entries,
    reports,
    goodies_sizes,
    goodies,
    goodies_variations,
    baskets,
    basket_items
} = require('../../src/datasource/data');

const executeSQLFile = async (filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.query(sql);
};

const insertData = async () => {
    try {
        await executeSQLFile(path.join(__dirname, '..', 'datasource', 'data.sql'));

        const insertIfNotExists = async (querySelect, queryInsert, values) => {
            const res = await pool.query(querySelect, [values[0]]);
            if (res.rows.length === 0) {
                await pool.query(queryInsert, values);
            }
        };

        for (const content of content_home) {
            const { _id, section, title, description, image_url } = content;
            await insertIfNotExists(
                'SELECT _id FROM content_home WHERE _id = $1',
                'INSERT INTO content_home (_id, section, title, description, image_url) VALUES ($1, $2, $3, $4, $5)',
                [_id, section, title, description, image_url]
            );
        }

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

        for (const category of ticket_age_categories) {
            const { _id, name, description } = category;
            await insertIfNotExists(
                'SELECT _id FROM ticket_age_categories WHERE _id = $1',
                'INSERT INTO ticket_age_categories (_id, name, description) VALUES ($1, $2, $3)',
                [_id, name, description || null]
            );
        }

        for (const price of ticket_prices) {
            const { _id, price: ticketPrice, age_category_id } = price;
            await insertIfNotExists(
                'SELECT _id FROM ticket_prices WHERE _id = $1',
                'INSERT INTO ticket_prices (_id, price, age_category_id) VALUES ($1, $2, $3)',
                [_id, ticketPrice || 0, age_category_id || 0]
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
            const adjustedDate = new Date(date);
            adjustedDate.setDate(adjustedDate.getDate() + 1);
            await insertIfNotExists(
                'SELECT _id FROM stands_reservations WHERE _id = $1',
                'INSERT INTO stands_reservations (_id, date, start_time, end_time, description, customer_id, service_id, stand_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [_id, adjustedDate.toISOString(), start_time, end_time, description, customer_id, service_id, stand_id]
            );
        }

        for (const reservation of service_reservations) {
            const { _id, date, time, ticket_id, service_id, stand_reservation_id } = reservation;
            const adjustedDate = new Date(date);
            adjustedDate.setDate(adjustedDate.getDate() + 1);
            await insertIfNotExists(
                'SELECT _id FROM service_reservations WHERE _id = $1',
                'INSERT INTO service_reservations (_id, date, time, ticket_id, service_id, stand_reservation_id) VALUES ($1, $2, $3, $4, $5, $6)',
                [_id, adjustedDate.toISOString(), time, ticket_id, service_id, stand_reservation_id]
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

        for (const entry of reports) {
            const { _id, date, reason, state, guestbook_entry_id} = entry;
            await insertIfNotExists(
                'SELECT _id FROM reports WHERE _id = $1',
                'INSERT INTO reports (_id, date, reason, state, guestbook_entry_id) VALUES ($1, $2, $3, $4, $5)',
                [_id, date, reason, state, guestbook_entry_id]
            );
        }

        for (const size of goodies_sizes) {
            await insertIfNotExists(
                'SELECT _id FROM goodies_sizes WHERE _id = $1',
                'INSERT INTO goodies_sizes (_id, size) VALUES ($1, $2)',
                [size._id, size.size]
            );
        }

        for (const goodie of goodies) {
            await insertIfNotExists(
                'SELECT _id FROM goodies WHERE _id = $1',
                'INSERT INTO goodies (_id, name, image, price, provider_service_categories_id) VALUES ($1, $2, $3, $4, $5)',
                [goodie._id, goodie.name, goodie.image || '', goodie.price, goodie.provider_service_categories_id]
            );
        }

        for (const variation of goodies_variations) {
            await insertIfNotExists(
                'SELECT _id FROM goodies_variations WHERE _id = $1',
                'INSERT INTO goodies_variations (_id, stock, goodie_id, size_id) VALUES ($1, $2, $3, $4)',
                [variation._id, variation.stock, variation.goodie_id, variation.size_id]
            );
        }

        for (const basket of baskets) {
            await insertIfNotExists(
                'SELECT _id FROM baskets WHERE _id = $1',
                'INSERT INTO baskets (_id, date, state, is_order, ticket_id, provider_service_categories_id) VALUES ($1, $2, $3, $4, $5, $6)',
                [basket._id, basket.date, basket.state, basket.is_order, basket.ticket_id, basket.provider_service_categories_id]
            );
        }

        for (const item of basket_items) {
            await insertIfNotExists(
                'SELECT _id FROM basket_items WHERE _id = $1',
                'INSERT INTO basket_items (_id, basket_id, item_id, item_type, quantity) VALUES ($1, $2, $3, $4, $5)',
                [item._id, item.basket_id, item.item_id, item.item_type, item.quantity]
            );
        }

        console.log('Données insérées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données:', error);
    }
};

insertData();