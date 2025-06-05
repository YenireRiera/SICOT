const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para registrar un nuevo usuario
router.post('/registro', usuarioController.registrarUsuario);

// Ruta para login de usuario
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
