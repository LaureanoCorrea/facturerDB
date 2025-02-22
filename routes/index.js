const express = require('express');
const router = express.Router();
const OrderRoutes = require('./orders');
const uploadRoutes = require('./upload');
const UserRoutes = require('./user');
const invoiceRoutes = require('./invoice');
const AuthRoutes = require('./auth');

// Ruta principal (en lugar de renderizar login.hbs, devolvemos un mensaje)
router.get('/', (req, res) => {
	res.json({ message: 'Bienvenido a la API' });
});

// Ruta para login (debería manejar autenticación vía API)
router.get('/login', (req, res) => {
	res.json({ message: 'Ruta de login - Implementar lógica de autenticación' });
});

// Ruta para registro (debería manejar creación de usuarios vía API)
router.get('/register', (req, res) => {
	res.json({ message: 'Ruta de registro - Implementar lógica de registro' });
});

// Ruta para mostrar datos del usuario autenticado (ejemplo)
router.get('/welcome', (req, res) => {
	const usernamed = req.session?.username || 'Invitado';
	res.json({ message: `Bienvenido, ${usernamed}` });
});

// Middleware para manejar rutas de API
router.use('/upload', uploadRoutes);
router.use('/orders', OrderRoutes);
router.use('/user', UserRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/login', AuthRoutes);
router.use('/register', AuthRoutes);

module.exports = router;
