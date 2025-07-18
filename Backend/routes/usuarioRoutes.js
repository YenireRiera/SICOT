const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Middleware para verificar si hay conexión a base de datos
const verificarConexion = (req, res, next) => {
    if (!req.app.locals.connection) {
        return res.status(503).json({ error: '⚠️ Base de datos no disponible en este entorno' });
    }
    next();
};

// Ruta para registrar un nuevo usuario
router.post('/registro', verificarConexion, usuarioController.registrarUsuario);

// Ruta para login de usuario
router.post('/login', verificarConexion, usuarioController.loginUsuario);

module.exports = router;
