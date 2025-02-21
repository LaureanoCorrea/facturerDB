const fs = require('fs');
const path = require('path');
const User = require('../models/user.model'); // Asegúrate de importar tu modelo de usuario

exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No se subió ningún archivo' });
    }
    const logoPath = `/logos/${req.file.filename}`;

    // Obtén el usuario actual para verificar el logo existente
    const user = await User.findById(req.user._id);

    if (user && user.logoUrl) {
      // Elimina el logo anterior si existe
      const oldLogoPath = path.join(__dirname, '..', 'public', user.logoUrl);
      deleteFileIfExists(oldLogoPath);
    }

    // Actualiza el usuario en la base de datos con la nueva ruta del logo
    await User.findByIdAndUpdate(req.user._id, { logoUrl: logoPath });

    res.json({ success: true, logoUrl: logoPath });
  } catch (err) {
    console.error('Error al cargar el logo:', err);
    res.status(500).json({ success: false, message: 'Error al cargar el logo' });
  }
};

const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Archivo eliminado: ${filePath}`);
  } else {
    console.log(`El archivo ya ha sido eliminado o movido: ${filePath}`);
  }
};
