const bcrypt = require('bcrypt'); // Importar bcrypt para el hash de contraseñas
const Usuario = require('../models/usuarioModel'); // Importar el modelo de usuario


// Controlador para manejar el registro y login de usuarios
const registrarUsuario = async (req, res) => {
    const { nombre, correo, contrasena, rol } = req.body;

    try {
        const yaExiste = await Usuario.buscarPorCorreo(correo);
        if (yaExiste.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contrasena, salt);

        await Usuario.crearUsuario({ nombre, correo, contrasena: hash, rol });

        res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor al registrar' });
    }
};
// Función para iniciar sesión
const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const resultados = await Usuario.buscarPorCorreo(correo);

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

// Exporta las funciones para que se puedan usar en las rutas
module.exports = {
    registrarUsuario,
    loginUsuario
};
