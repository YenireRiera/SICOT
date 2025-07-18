// Función para crear un nuevo usuario
const crearUsuario = ({ nombre, correo, contrasena, rol }, connection) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)';
        connection.query(sql, [nombre, correo, contrasena, rol], (err, resultado) => {
            if (err) return reject(err);
            resolve(resultado);
        });
    });
};

// Función para buscar un usuario por correo
const buscarPorCorreo = (correo, connection) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM usuarios WHERE correo = ?';
        connection.query(sql, [correo], (err, resultados) => {
            if (err) return reject(err);
            resolve(resultados);
        });
    });
};

module.exports = {
    crearUsuario,
    buscarPorCorreo
};
