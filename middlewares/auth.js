const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = {
	isAuthenticated: (req, res, next) => {
		// Busca el token en cookies o en el header "Authorization"
		const token =
			req.cookies?.authToken ||
			(req.headers.authorization && req.headers.authorization.split(' ')[1]);

		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
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
