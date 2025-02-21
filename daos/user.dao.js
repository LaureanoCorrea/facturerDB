const User = require("../models/user.model");

class UserDao {
  async updateAlias(userId, alias) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { alias },
        { new: true }
      );
      if (!user) {
        throw new Error(`No se encontró un usuario con ID ${userId}`);
      }
      return user;
    } catch (error) {
      throw new Error(`Error al actualizar el alias: ${error.message}`);
    }
  }

  // async getUserById(userId) {
  //   try {
  //     const user = await User.findById(userId);
  //     if (!user) {
  //       throw new Error(`No se encontró un usuario con ID ${userId}`);
  //     }
  //     return user;
  //   } catch (error) {
  //     throw new Error(`Error al obtener el usuario: ${error.message}`);
  //   }
  // }
}

module.exports = new UserDao();
