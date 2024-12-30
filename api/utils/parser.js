const fs = require('fs');
const pool = require('../database/db');

// Charger les données depuis le fichier JS
const {
    customersAccounts,
    sportsCategories,
    tickets,
    ticketsAnimationCategories,
    ticketsAgeCategories,
    ticketPrices,
    availabledates,
    dedicationreservations,
    pavillons,
    stands,
} = require('../../src/datasource/data');

const executeSQLFile = async (filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.query(sql);
};

const insertData = async () => {
    await executeSQLFile('datasource/data.sql');

    // Insérer les données dans la table customersAccounts
    for (const customer of customersAccounts) {
        const {
            _id,
            name,
            login,
            password,
            email,
            picture,
            description,
            privilege,
            session,
        } = customer;

        const res = await pool.query(
            'SELECT _id FROM customersaccounts WHERE _id = $1',
            [_id]
        );

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO customersaccounts (_id, name, login, password, email, picture, description, privilege, session) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [_id, name, login, password, email, picture, description, privilege || 0, session]
            );
        }
    }

    // Insérer les données dans la table sportsCategories
    for (const category of sportsCategories) {
        const {_id, name, description} = category;

        const res = await pool.query(
            'SELECT _id FROM sportscategories WHERE _id = $1',
            [_id]
        );

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO sportscategories (_id, name, description) VALUES ($1, $2, $3)',
                [_id, name, description]
            );
        }
    }

    // Insérer les données dans la table ticketsAnimationCategories
    for (const category of ticketsAnimationCategories) {
        const {_id, name, description} = category;

        const res = await pool.query(
            'SELECT _id FROM ticketsanimationcategories WHERE _id = $1',
            [_id]
        );

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO ticketsanimationcategories (_id, name, description) VALUES ($1, $2, $3)',
                [_id, name, description]
            );
        }
    }

    // Insérer les données dans la table ticketsAgeCategories
    for (const ageCategory of ticketsAgeCategories) {
        const {_id, name, description} = ageCategory;

        const res = await pool.query(
            'SELECT _id FROM ticketsagecategories WHERE _id = $1',
            [_id]
        );

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO ticketsagecategories (_id, name, description) VALUES ($1, $2, $3)',
                [_id, name, description || 0]
            );
        }
    }

    // Insérer les données dans la table ticketPrices
    for (const prix of ticketPrices) {
        const {_id, age_category_id, animation_category_id, price} = prix;

        const res = await pool.query(
            'SELECT _id FROM ticketprices WHERE _id = $1',
            [_id]
        );

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO ticketprices (_id, age_category_id, animation_category_id, price) VALUES ($1, $2, $3, $4)',
                [_id, age_category_id || 0, animation_category_id || 0, price || 0]
            );
        }
    }


    // Insérer les données dans la table tickets
    for (const ticket of tickets) {
        const {
            _id,
            $date,
            time,
            _idCustomer,
            price_id,
        } = ticket;

        const res = await pool.query('SELECT _id FROM tickets WHERE _id = $1', [_id]);

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO tickets (_id, date, time, customer_id, price_id) VALUES ($1, $2, $3, $4, $5)',
                [_id, $date, time, _idCustomer || 0, price_id || 0]
            );
        }
    }

    // Insérer les données dans la table availabledates
    for (const date of availabledates) {
        const {_id, date: availableDate, times, anim_id} = date;

        const res = await pool.query(
            'SELECT _id FROM availabledates WHERE _id = $1',
            [_id]
        );

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO availabledates (_id, date, times, anim_id) VALUES ($1, $2, $3, $4)',
                [_id, availableDate, JSON.stringify(times), anim_id || 0]
            );
        }
    }

    // Insérer les données dans la table dedicationreservations
    for (const reservation of dedicationreservations) {
        const {_id, date, time, ticket_id, anim_id} = reservation;

        const res = await pool.query(
            'SELECT _id FROM dedicationreservations WHERE _id = $1',
            [_id]
        );

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO dedicationreservations (_id, date, time, ticket_id, anim_id) VALUES ($1, $2, $3, $4, $5)',
                [_id, date, time, ticket_id || 0, anim_id || 0]
            );
        }
    }

    // Insérer les données dans la table pavillons
    for (const pavillon of pavillons) {
        const {_id, name} = pavillon;

        const res = await pool.query('SELECT _id FROM pavillons WHERE _id = $1', [_id]);

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO pavillons (_id, name) VALUES ($1, $2)',
                [_id, name]
            );
        }
    }

    // Insérer les données dans la table stands
    for (const stand of stands) {
        const {_id, name, description, price, prestataire_id, pavillon_id} = stand;

        const res = await pool.query('SELECT _id FROM stands WHERE _id = $1', [_id]);

        if (res.rows.length === 0) {
            await pool.query(
                'INSERT INTO stands (_id, name, description, price, prestataire_id, pavillon_id) VALUES ($1, $2, $3, $4, $5, $6)',
                [_id, name, description, price, prestataire_id || 0, pavillon_id || 0]
            );
        }
    }

    console.log('Données insérées !');
};

insertData().catch(console.error);