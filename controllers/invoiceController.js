const invoiceDao = require('../daos/invoice.dao');

class InvoiceController {
	async createInvoiceFromAlert(req, res) {
		try {
			const { logoUrl, teamName, alias } = req.user;
			const { Asesor, NivelAsesor, ciclo, semana } = req.query;

			// Validación de datos
			if (!Asesor || !NivelAsesor) {
				console.error('Datos incompletos: asesor o nivelAsesor faltantes');
				return res.status(400).json({ message: 'Faltan datos requeridos' });
			}

			// Crear factura manualmente con DAO
			const newInvoice = await invoiceDao.createManualInvoice({
				Asesor,
				NivelAsesor,
				ciclo,
				semana,
				logoUrl,
				teamName,
				alias,
			});

			console.log('Factura creada exitosamente:', newInvoice);

			// 🔹 Enviar JSON en lugar de renderizar vista
			res.status(201).json({
				message: 'Factura creada exitosamente',
				invoice: newInvoice,
			});
		} catch (error) {
			console.error(
				'Error al crear la factura desde la alerta:',
				error.message
			);
			res
				.status(500)
				.json({ message: 'Error al crear la factura', error: error.message });
		}
	}
}

module.exports = new InvoiceController();
