const Invoice = require('../models/invoice.model.js');

class InvoiceDao {
	async createManualInvoice({ Asesor, NivelAsesor, ciclo, semana }) {
		try {
			const newInvoice = new Invoice({
				Asesor,
				NivelAsesor,
				ciclo,
				semana,
				productos: [],
			});
			const savedInvoice = await newInvoice.save();
			return savedInvoice;
		} catch (error) {
			console.error('Error creando factura manual:', error.message);
			throw new Error('Error al crear factura manual');
		}
	}
}

module.exports = new InvoiceDao();
