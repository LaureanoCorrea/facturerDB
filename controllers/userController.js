const User = require('../models/user.model');

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error('Error al obtener datos del usuario:', err);
    res.status(500).json({ success: false, message: 'Error al obtener datos del usuario' });
  }
}

exports.setTeamName = async (req, res) => {
  try {
    const { teamName } = req.body;

    if (!teamName) {
      return res.status(400).json({ success: false, message: "Faltan datos requeridos" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, { teamName: teamName }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    res.status(200).json({ success: true, message: "Nombre del equipo guardado exitosamente", teamName });
  } catch (error) {
    console.error("Error guardando el nombre del equipo:", error);
    res.status(500).json({ success: false, message: "Error guardando el nombre del equipo" });
  }
};