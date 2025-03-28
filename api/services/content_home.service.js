const fs = require('fs');
const path = require('path');
const pool = require('../database/db');

async function getContentHome() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM content_home');
        return { error: 0, status: 200, data: res.rows };
    } finally {
        client.release();
    }
}

async function modifyContentHome(data, file) {
    const client = await pool.connect();
    try {
        const contentData = data.data;

        if (contentData.explain && contentData.explain._id) {
            let explainImageUrl = contentData.explain.image_url;
            if (file && file.explain) {
                const uploadPath = path.join(__dirname, '../src/assets/img/', file.explain.filename);
                fs.writeFileSync(uploadPath, file.explain.buffer);
                explainImageUrl = `/assets/img/${file.explain.filename}`;
            }
            await client.query(
                'UPDATE content_home SET title = $1, description = $2, image_url = $3 WHERE _id = $4 AND section = $5',
                [contentData.explain.title, contentData.explain.description, explainImageUrl, contentData.explain._id, 'explain']
            );
        }

        if (contentData.main && contentData.main._id) {
            let mainImageUrl = contentData.main.image_url;
            if (file && file.main) {
                const uploadPath = path.join(__dirname, '../src/assets/img/', file.main.filename);
                fs.writeFileSync(uploadPath, file.main.buffer);
                mainImageUrl = `/assets/img/${file.main.filename}`;
            }
            await client.query(
                'UPDATE content_home SET title = $1, description = $2, image_url = $3 WHERE _id = $4 AND section = $5',
                [contentData.main.title, contentData.main.description, mainImageUrl, contentData.main._id, 'main']
            );
        }

        if (contentData.cards && Array.isArray(contentData.cards)) {
            for (const card of contentData.cards) {
                let cardImageUrl = card.image_url;
                if (file && file.cards && file.cards[card._id]) {
                    const uploadPath = path.join(__dirname, '../src/assets/img/', file.cards[card._id].filename);
                    fs.writeFileSync(uploadPath, file.cards[card._id].buffer);
                    cardImageUrl = `/assets/img/${file.cards[card._id].filename}`;
                }
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