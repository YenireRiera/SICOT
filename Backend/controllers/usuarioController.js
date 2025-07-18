const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarioModel');

// Controlador para registrar usuario
const registrarUsuario = async (req, res) => {
    const { nombre, correo, contrasena, rol } = req.body;

    try {
        if (!req.app.locals.connection) {
            return res.status(503).json({ error: 'Base de datos no disponible' });
        }

        const yaExiste = await Usuario.buscarPorCorreo(correo, req.app.locals.connection);
        if (yaExiste.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contrasena, salt);

        await Usuario.crearUsuario({ nombre, correo, contrasena: hash, rol }, req.app.locals.connection);

        res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor al registrar' });
    }
};

// Controlador para login de usuario
const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        if (!req.app.locals.connection) {
            return res.status(503).json({ error: 'Base de datos no disponible' });
        }

        const resultados = await Usuario.buscarPorCorreo(correo, req.app.locals.connection);
        if (resultados.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const usuario = resultados[0];
        const coinciden = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!coinciden) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        res.status(200).json({
            mensaje: 'Login exitoso',
            nombre: usuario.nombre,
            rol: usuario.rol
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario
};
