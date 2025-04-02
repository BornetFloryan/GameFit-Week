require('dotenv').config();
module.exports = {
    secret: process.env.AUTH_SECRET || "darth-vader",
    jwtExpiration: 60,
    jwtRefreshExpiration: 120,
};
