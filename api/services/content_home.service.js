const fs = require('fs');
const path = require('path');
const pool = require('../config/db.config');

async function getContentHome() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM content_home');
        return { error: 0, status: 200, data: res.rows };
    } finally {
        client.release();
    }
}

async function modifyContentHome(data) {
    const client = await pool.connect();
    try {
        const contentData = data;

        if (contentData.explain && contentData.explain._id) {
            let explainImageUrl = contentData.explain.image_url;
            await client.query(
                'UPDATE content_home SET title = $1, description = $2, image_url = $3 WHERE _id = $4 AND section = $5',
                [contentData.explain.title, contentData.explain.description, explainImageUrl, contentData.explain._id, 'explain']
            );
        }

        if (contentData.main && contentData.main._id) {
            let mainImageUrl = contentData.main.image_url;
            await client.query(
                'UPDATE content_home SET title = $1, description = $2, image_url = $3 WHERE _id = $4 AND section = $5',
                [contentData.main.title, contentData.main.description, mainImageUrl, contentData.main._id, 'main']
            );
        }

        if (contentData.cards && Array.isArray(contentData.cards)) {
            for (const card of contentData.cards) {
                let cardImageUrl = card.image_url;
                await client.query(
                    'UPDATE content_home SET title = $1, description = $2, image_url = $3 WHERE _id = $4 AND section = $5',
                    [card.title, card.description, cardImageUrl, card._id, 'card']
                );
            }
        }

        const updatedData = await client.query('SELECT * FROM content_home');
        return { error: 0, status: 200, data: updatedData.rows };
    } finally {
        client.release();
    }
}


module.exports = {
    getContentHome,
    modifyContentHome
};