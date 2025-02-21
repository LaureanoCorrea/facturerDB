const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Función para asegurar que el directorio de destino existe
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

// Configuración de almacenamiento para archivos CSV
const csvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/csv');
    ensureDirectoryExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtro de archivos para aceptar solo archivos CSV
const csvFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.csv') {
    return cb(new Error('Solo se permiten archivos CSV'), false);
  }
  cb(null, true);
};

// Configuración de Multer para archivos CSV
const csvUpload = multer({ storage: csvStorage, fileFilter: csvFileFilter });

// Configuración de almacenamiento para logos
const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/logos');
    ensureDirectoryExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configuración de Multer para logos
const logoUpload = multer({ storage: logoStorage });

// Exportar las configuraciones
module.exports = {
  csvUpload,
  logoUpload
};
