const {Pool} = require("pg");
require("dotenv").config();

const credential = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}
const pool = new Pool(credential);

module.exports = pool;