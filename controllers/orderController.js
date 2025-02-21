const DataDao = require('../daos/data.dao');

class OrderController {
	async getAdvisorNames(req, res) {
		try {
			const { ciclo, semana } = req.query;

			if (!ciclo || !semana) {
				return res
					.status(400)
					.json({ message: 'Ciclo y semana son requeridos' });
			}

			const orders = await DataDao.readByCicloAndSemana(
				ciclo,
				semana,
				req.user._id
			);
			if (!orders) {
				return res.json({ advisorNames: [], ciclo, semana });
			}

			const advisorNames = orders.Asesores.map((asesor) => ({
				Asesor: asesor.Asesor,
				AsesorId: asesor._id,
				Pedidos: asesor.Pedidos.map((pedido) => ({
					NumeroPedido: pedido['Número de Pedido'],
				})),
			}));

			res.json({
				advisorNames,
				ciclo,
				semana,
				logoUrl: req.user.logoUrl,
				teamName: req.user.teamName,
			});
		} catch (error) {
			console.error('Error fetching orders:', error);
			res.status(500).json({ message: 'Error fetching orders' });
		}
	}

	async createOrder(req, res) {
		try {
			const { ciclo, semana } = req.query;

			if (!ciclo || !semana) {
				return res
					.status(400)
					.json({ message: 'Ciclo y semana son requeridos' });
			}
			res.status(201).json({ message: 'Orden creada exitosamente' });
		} catch (error) {
			console.error('Error al crear la orden:', error);
			res.status(500).json({ message: 'Error al crear la orden' });
		}
	}

	async addItem(req, res) {
		try {
			const { nombreProducto, cantidadUnidades, puntos, precioPublico } =
				req.body;
			const nuevoProducto = await DataDao.addItem(
				nombreProducto,
				cantidadUnidades,
				puntos,
				precioPublico
			);
			res
				.status(201)
				.json({ message: 'Producto agregado exitosamente', nuevoProducto });
		} catch (error) {
			console.error('Error al agregar el producto:', error);
			res
				.status(500)
				.json({ message: 'Hubo un problema al agregar el producto' });
		}
	}

	async getOrderDetails(req, res) {
		try {
			const { id } = req.params;
			const { ciclo, semana } = req.query;

			if (!ciclo || !semana) {
				return res
					.status(400)
					.json({ message: 'Ciclo y semana son requeridos' });
			}

			const orders = await DataDao.readByCicloAndSemana(
				ciclo,
				semana,
				req.user._id
			);
			const advisor = orders.Asesores.find((a) => a._id.toString() === id);

			if (!advisor) {
				return res.status(404).json({ message: 'Asesor no encontrado' });
			}

			const allProductDetails = advisor.Pedidos.flatMap((pedido) =>
				pedido.Detalles.map((detalle) => ({
					...detalle.toObject(),
					AsesorId: advisor._id,
					PedidoId: pedido._id,
					NivelAsesor: advisor['Nivel de Alianza Categoria'],
				}))
			);

			res.json({
				Asesor: advisor.Asesor,
				AsesorId: advisor._id,
				ciclo: orders.ciclo,
				semana: orders.semana,
				NivelAsesor: advisor['Nivel de Alianza Categoria'],
				Productos: allProductDetails,
				logoUrl: req.user.logoUrl,
				teamName: req.user.teamName,
				alias: req.user.alias,
			});
		} catch (error) {
			console.error('Error fetching order details:', error);
			res.status(500).json({ message: 'Error fetching order details' });
		}
	}

	async editProductQuantity(req, res) {
		try {
			const { asesorId, pedidoId, productId } = req.params;
			const { nuevaCantidad, puntos } = req.body;
			const productoActualizado = await DataDao.editProductQuantity(
				asesorId,
				pedidoId,
				productId,
				nuevaCantidad,
				puntos
			);

			if (!productoActualizado) {
				return res
					.status(404)
					.json({ message: 'No se encontró el producto para actualizar.' });
			}
			res.json({
				message: 'Producto actualizado exitosamente',
				productoActualizado,
			});
		} catch (error) {
			console.error('Error al actualizar la cantidad del producto:', error);
			res
				.status(500)
				.json({ message: 'Error al actualizar la cantidad del producto' });
		}
	}

	async removeProduct(req, res) {
		try {
			const { asesorId, pedidoId, productId } = req.params;
			const productoEliminado = await DataDao.removeProduct(
				asesorId,
				pedidoId,
				productId
			);

			if (!productoEliminado) {
				return res
					.status(404)
					.json({ message: 'No se encontró el producto para eliminar.' });
			}
			res.json({ message: 'Producto eliminado exitosamente' });
		} catch (error) {
			console.error('Error al eliminar el producto:', error);
			res.status(500).json({ message: 'Error al eliminar el producto' });
		}
	}

	async removeAll(req, res) {
		try {
			await DataDao.vaciar(req.user._id);
			res.json({
				success: true,
				message: 'Todos los archivos CSV han sido eliminados.',
			});
		} catch (err) {
			console.error('Error al eliminar los archivos CSV:', err);
			res.status(500).json({
				success: false,
				message: 'Error al eliminar los archivos CSV',
			});
		}
	}
}

module.exports = new OrderController();
