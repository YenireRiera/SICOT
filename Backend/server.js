const express = require('express');
const mysql = require('mysql2'); // Para conectarse a la base de datos MySQL
const cors = require('cors');
const app = express();
require('dotenv').config({ path: '../.env' }); // Lee variables desde el archivo .env

const isLocal = process.env.NODE_ENV !== 'production'; // Detecta si es entorno local

let connection = null;

// Solo conecta a MySQL si estás en entorno local
if (isLocal) {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '', // tu contraseña de XAMPP
        database: 'sicot' // tu base de datos local
    });

    connection.connect((err) => {
        if (err) {
            console.error('❌ Error al conectar a MySQL local:', err.message);
        } else {
            console.log('✅ Conectado a MySQL local (XAMPP)');
            app.locals.connection = connection; // Lo guardamos para usarlo en rutas
        }
    });
} else {
    console.log('ℹ️ Ejecutando en entorno nube, sin conexión a base de datos');
}

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('SICOT API funcionando 🚀');
});

// Rutas de usuarios
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

// Middleware de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
