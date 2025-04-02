require('dotenv').config();
module.exports = {
    secret: process.env.AUTH_SECRET || "darth-vader",
    jwtExpiration: 604800,
    jwtRefreshExpiration: 604800,
};
