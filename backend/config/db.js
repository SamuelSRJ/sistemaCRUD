const mysql = require('mysql2/promise');
require('dotenv').config();

async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    console.log('Conectado no MySQL (modo promise)');
    return connection;
};

module.exports = connectToDatabase;