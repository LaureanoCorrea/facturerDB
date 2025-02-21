require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes'); // Importa el index.js de rutas

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montar las rutas
app.use('/api', authRoutes);
app.use('/', mainRoutes); // Agrega esta línea

// Iniciar el servidor
app.listen(PORT, () => {
	console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
