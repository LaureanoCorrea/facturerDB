const User = require('../models/user.model');

const loadUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.locals.user = user;
    next();
  } catch (err) {
    console.error('Error al obtener datos del usuario:', err);
    res.status(500).json({ success: false, message: 'Error al obtener datos del usuario' });
  }
};

module.exports = loadUserData;
