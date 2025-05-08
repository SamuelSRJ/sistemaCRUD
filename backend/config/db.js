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

// connection.connect((err) => {
//     if(err) {
//         console.error('Erro ao conectar no banco:', err);
//         return;
//     }
//     console.log('Conectado no MySQL');
// });

module.exports = connectToDatabase;