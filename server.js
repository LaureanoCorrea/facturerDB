require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montar el router. Si usas un prefijo, la URL cambiará.
app.use('/api', authRoutes);

app.listen(PORT, () => {
	console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
