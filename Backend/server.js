const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: '../.env' }); // Ajusta si es necesario

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('SICOT API funcionando 🚀');
});

// Rutas de usuarios
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes); 
// Manejo de errores middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
