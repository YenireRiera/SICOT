const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
    console.error('Error de conexión a MySQL:', err);
    return; // Se detiene aquí si hay error
    }
    console.log('Conexión exitosa a MySQL ✔️');
});

module.exports = connection;
