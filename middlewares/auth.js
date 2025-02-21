const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = {
	isAuthenticated: (req, res, next) => {
		const token = req.cookies.authToken;
		if (token) {
			jwt.verify(token, 'your_secret_key', async (err, decoded) => {
				if (err) {
					return res.status(403).json({ message: 'Token inválido o expirado' });
				}
				const user = await User.findById(decoded.id).lean();
				if (!user) {
					return res.status(404).json({ message: 'Usuario no encontrado' });
				}
				req.user = user;
				next();
			});
		} else {
			return res
				.status(401)
				.json({ message: 'No se ha proporcionado un token de autenticación' });
		}
	},

	isAdmin: (req, res, next) => {
		if (req.user && req.user.role === 'admin') {
			next();
		} else {
			res.status(403).json({
				message: 'Acceso denegado: se requieren permisos de administrador',
			});
		}
	},
};

module.exports = authMiddleware;
