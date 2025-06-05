const db = require('../config/db');

// Función para crear un nuevo usuario
const crearUsuario = ({ nombre, correo, contrasena, rol }) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)';
        db.query(sql, [nombre, correo, contrasena, rol], (err, resultado) => {
            if (err) return reject(err);
            resolve(resultado);
        });
    });
};

// Función para buscar un usuario por correo
const buscarPorCorreo = (correo) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM usuarios WHERE correo = ?';
        db.query(sql, [correo], (err, resultados) => {
            if (err) return reject(err);
            resolve(resultados);
        });
    });
};

// Exporta las funciones para que se puedan usar en los controladores
module.exports = {
    crearUsuario,
    buscarPorCorreo
};
