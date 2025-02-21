const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const dataDao = require('../daos/data.dao');
const loadUserData = require('../middlewares/userData');
const userDao = require('../daos/user.dao');

// Ruta para el dashboard
router.get(
	'/dashboard',
	authMiddleware.isAuthenticated,
	loadUserData,
	async (req, res) => {
		try {
			const uploads = await dataDao.readAll(req.user._id);
			const uploadCount = uploads.length;
			res.render('dashboard', {
				username: req.user.username,
				uploads: uploads,
				logoUrl: req.user.logoUrl,
				teamName: req.user.teamName,
				alias: req.user.alias,
				uploadCount,
				isAdmin: req.user.role === 'admin',
			});
		} catch (err) {
			console.error(err);
			res.status(500).send('Error al cargar el dashboard');
		}
	}
);

// Ruta para generar factura del último archivo subido
router.get('/last-upload', authMiddleware.isAuthenticated, async (req, res) => {
	try {
		const lastUpload = await dataDao.findLastUpload();
		res.json(lastUpload); // Enviar el último archivo encontrado como respuesta JSON
	} catch (error) {
		console.error('Error en /last-upload:', error.message);
		res
			.status(500)
			.json({ message: 'Error al buscar el último archivo subido.' });
	}
});

// Ruta para eliminar un archivo subido
router.post(
	'/delete-upload/:id',
	authMiddleware.isAuthenticated,
	async (req, res) => {
		try {
			await dataDao.deleteById(req.params.id, req.user._id);
			res.redirect('/dashboard');
		} catch (err) {
			console.error(err);
			res.status(500).send('Error al eliminar el archivo');
		}
	}
);

router.post(
	'/update-alias',
	authMiddleware.isAuthenticated,
	async (req, res) => {
		try {
			const { alias } = req.body;
			await userDao.updateAlias(req.user._id, alias);
			res.json({ success: true, message: 'Alias actualizado con éxito.' });
		} catch (err) {
			console.error('Error al actualizar alias:', err);
			res
				.status(500)
				.json({ success: false, message: 'Error al actualizar el alias.' });
		}
	}
);

module.exports = router;
