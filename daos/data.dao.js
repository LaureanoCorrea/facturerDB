const Data = require("../models/data.model");

class DataDao {
  async readById(asesorId) {
    try {
      const asesores = await Data.find({ "Asesores._id": asesorId });
      const pedidoEncontrado = asesores.find((asesor) =>
        asesor.Asesores.id(asesorId)
      );

      if (!pedidoEncontrado) {
        throw new Error(`No se encontró un pedido con el ID ${asesorId}`);
      }

      return pedidoEncontrado;
    } catch (error) {
      console.error("Error al buscar pedido por asesorId:", error);
      throw error;
    }
  }

  async create(data) {
    try {
      const newData = new Data(data);
      return await newData.save();
    } catch (error) {
      throw new Error(`Error al guardar en la base de datos: ${error.message}`);
    }
  }

  async readAll(userId) {
    try {
      return await Data.find({ userId });
    } catch (error) {
      throw new Error("Error al leer los datos: " + error.message);
    }
  }

  async readByCicloAndSemana(ciclo, semana, userId) {
    try {
      const data = await Data.findOne({ ciclo, semana, userId });

      if (!data) {
        throw new Error(
          `No se encontraron datos para el ciclo ${ciclo} y semana ${semana}`
        );
      }

      return data;
    } catch (error) {
      console.error("Error al buscar datos por ciclo y semana:", error);
      throw error;
    }
  }

  async findLastUpload() {
    try {
      const lastUpload = await Data.findOne().sort({ Timestamp: -1 });
      if (!lastUpload) {
        throw new Error("No se encontraron archivos subidos.");
      }
      return lastUpload;
    } catch (error) {
      console.error("Error al buscar el último archivo subido:", error);
      throw error;
    }
  }

  async deleteByCicloAndSemana(ciclo, semana, userId) {
    try {
      return await Data.deleteMany({ ciclo, semana, userId });
    } catch (error) {
      throw new Error(
        `Error al eliminar datos por ciclo y semana: ${error.message}`
      );
    }
  }

  async deleteById(id, userId) {
    try {
      const result = await Data.findOneAndDelete({ _id: id, userId });
      if (!result) {
        throw new Error(`No se encontró el documento con ID ${id}`);
      }
      return result;
    } catch (error) {
      throw new Error(`Error al eliminar el documento: ${error.message}`);
    }
  }

  async vaciar(userId) {
    try {
      return await Data.deleteMany({ userId });
    } catch (error) {
      throw new Error(`Error al vaciar la base de datos: ${error.message}`);
    }
  }
}

module.exports = new DataDao();
