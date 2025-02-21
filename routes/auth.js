const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// Ruta de login
router.post('/login', authController.login);

// Ruta de registro (solo accesible para admin)
router.post('/register',  authController.register);

// Ruta para cerrar sesión
router.get('/logout', authMiddleware.isAuthenticated, authController.logout);

module.exports = router;
