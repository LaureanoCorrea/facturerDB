const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const logoController = require('../controllers/logoController');
const { csvUpload, logoUpload } = require('../config/uploadConfig');

// Ruta para cargar archivos CSV
router.post('/', csvUpload.single('file'), uploadController.uploadCSV);

// Ruta para cargar el logo
router.post('/logo', logoUpload.single('logo'), logoController.uploadLogo);

module.exports = router;
