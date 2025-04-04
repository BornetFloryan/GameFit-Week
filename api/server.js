require('./utils/parser');
const os = require('os');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require('./config/swaggerConfig');
const pool = require('./config/db.config');
const cors = require('cors');
const transformToInt = require('./middleware/transformToInt');
const transformToString = require('./middleware/transformToString');

const accountRoutes = require('./routes/account.router');
const sportsCategoriesRoutes = require('./routes/sportsCategories.router');
const providerRequestsRoutes = require('./routes/providerRequests.router');
const serviceCategoriesRoutes = require('./routes/serviceCategories.router');
const providerServiceCategoriesRoutes = require('./routes/providerServiceCategories.router');
const serviceReservationRoutes = require('./routes/serviceReservation.router');
const ticketRoutes = require('./routes/ticket.router');
const standsRoutes = require('./routes/stands.router');
const guestbookStatusRoutes = require('./routes/providerGuestbookStatus.router');
const guestbookEntriesRoutes = require('./routes/guestbookEntries.router');
const providerScheduleStatusRoutes = require('./routes/providerScheduleStatus.router');
const reportsRoutes = require('./routes/reports.router');
const basketRoutes = require('./routes/basket.router');
const goodiesRoutes = require('./routes/goodies.router');
const contentHomeRoutes = require('./routes/content_home.router');
const teamsRoutes = require('./routes/teams.router');
const roundsRoutes = require('./routes/rounds.router');
const matchsRoutes = require('./routes/matchs.router');

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:8080', `http://${getLocalIp()}:8080`],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(transformToInt);
app.use(transformToString);

app.use(session({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: true,
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/accounts', accountRoutes);
app.use('/sports-categories', sportsCategoriesRoutes);
app.use('/provider-requests', providerRequestsRoutes);
app.use('/service-categories', serviceCategoriesRoutes);
app.use('/provider-service-categories', providerServiceCategoriesRoutes);
app.use('/service-reservations', serviceReservationRoutes);
app.use('/tickets', ticketRoutes);
app.use('/stands', standsRoutes);
app.use('/guestbook-status', guestbookStatusRoutes);
app.use('/guestbook-entries', guestbookEntriesRoutes);
app.use('/provider-schedule-status', providerScheduleStatusRoutes);
app.use('/reports', reportsRoutes);
app.use('/baskets', basketRoutes);
app.use('/goodies', goodiesRoutes);
app.use('/content-home', contentHomeRoutes);

app.use('/teams',teamsRoutes);
app.use('/rounds',roundsRoutes);
app.use('/matchs',matchsRoutes);

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
    );
    next();
});

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '127.0.0.1';
}

app.get('/local-ip', (req, res) => {
    const localIp = getLocalIp();
    res.json({ localIp });
});

const LOCAL_IP = getLocalIp();

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur :`);
    console.log(`- PC local     : http://localhost:${PORT}`);
    console.log(`- Réseau local : http://${LOCAL_IP}:${PORT}`);
    pool.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
        } else {
            console.log('Connexion à la base de données réussie');
        }
    });
});

module.exports = app;
