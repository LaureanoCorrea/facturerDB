const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  Asesor: { type: String, required: true },
  NivelAsesor: { type: String, required: true },
  ciclo: { type: Number, required: true },
  semana: { type: Number, required: true },
  productos: { type: Array, default: [] }, // Lista de productos vacía
  logoUrl: { type: String },
  teamName: { type: String },
  alias: { type: String },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
