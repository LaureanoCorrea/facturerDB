const express = require('express');
const router = express.Router();
const OrderRoutes = require('./orders');
const uploadRoutes = require('./upload');
const UserRoutes = require('./user');
const authMiddleware = require('../middlewares/auth');
const invoiceRoutes = require('./invoice');

// Ruta principal del formulario de carga
// router.get('/uploads', authMiddleware.isAuthenticated, (req, res) => {
//   res.render('uploads'); // Renderiza la vista 'uploads.hbs'
// });

router.get('/', (req, res) => {
	res.render('login');
});

// Ruta para mostrar la vista de login
router.get('/login', (req, res) => {
	res.render('login'); // Renderiza la vista 'login.hbs'
});

// Ruta para mostrar la vista de registro (accesible solo para admin)
router.get(
	'/register',
	// authMiddleware.isAuthenticated,
	// authMiddleware.isAdmin,
	(req, res) => {
		res.render('register'); // Renderiza la vista 'register.hbs'
	}
);

router.get('/welcome', (req, res) => {
	const usernamed = req.session.username;
	res.render('welcome', { usernamed });
});

// Middleware para manejar rutas de subida de archivos
router.use('/upload', uploadRoutes);
router.use('/orders', OrderRoutes);
router.use('/user', UserRoutes);
router.use('/invoice', invoiceRoutes);

module.exports = router;
