require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authController = {
	register: async (req, res) => {
		try {
			const { username, password, role } = req.body;

			// Verificar si el usuario ya existe usando username
			const userFound = await User.findOne({ username });
			if (userFound)
				return res.status(400).json({ error: 'El usuario ya existe' });

			// Hashear la contraseña
			const hashedPassword = await bcrypt.hash(password, 10);

			// Crear nuevo usuario
			const newUser = new User({
				username,
				password: hashedPassword,
				role,
				teamName: '',
			});

			await newUser.save();

			// Guardar la sesión si es necesario
			req.session.usernamed = newUser.username;

			// Respuesta JSON en lugar de redirigir
			res.status(201).json({
				message: 'Usuario registrado exitosamente',
				user: {
					id: newUser._id,
					username: newUser.username,
					role: newUser.role,
				},
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Error al registrar el usuario' });
		}
	},

	login: async (req, res) => {
		try {
			const { username, password } = req.body;

			// Buscar usuario en la base de datos
			const user = await User.findOne({ username });
			if (!user) {
				return res
					.status(401)
					.json({ error: 'Usuario o contraseña incorrectos' });
			}

			// Comparar la contraseña ingresada con la almacenada en la base de datos
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(401)
					.json({ error: 'Usuario o contraseña incorrectos' });
			}

			// Generar el token JWT
			const token = jwt.sign(
				{ id: user._id, role: user.role },
				process.env.JWT_SECRET,
				{ expiresIn: '1h' }
			);

			// Enviar respuesta JSON en lugar de redirigir
			res.status(200).json({
				message: 'Login exitoso',
				token,
				user: {
					id: user._id,
					username: user.username,
					role: user.role,
				},
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Error en el servidor' });
		}
	},

	logout: (req, res) => {
		try {
			res.clearCookie('authToken');
			res.status(200).json({ message: 'Logout exitoso' });
		} catch (error) {
			res.status(500).json({ error: 'Error al cerrar sesión' });
		}
	},
};

module.exports = authController;
