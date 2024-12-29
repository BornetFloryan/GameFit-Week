require('./parser');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const pool = require('./database/db');

const standsRoutes = require('./routes/stands.router');
const accountRoutes = require('./routes/account.router');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GameFit App",
            description: "API documentation",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Local server",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/stands', standsRoutes);
app.use('/accounts', accountRoutes);

app.use(session({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: true,
}));

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    pool.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
        } else {
            console.log('Connexion à la base de données réussie');
        }
    });
});

module.exports = app;
