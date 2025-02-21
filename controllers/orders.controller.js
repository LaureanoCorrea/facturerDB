// export const getAdvisorNames = async (req, res) => {
// 	try {
// 		const { ciclo, semana } = req.query;

// 		if (!ciclo || !semana) {
// 			return res.status(400).json({ message: 'Ciclo y semana son requeridos' });
// 		}

// 		const orders = await DataDao.readByCicloAndSemana(
// 			ciclo,
// 			semana,
// 			req.user._id
// 		);
// 		if (!orders) {
// 			return res.render('orders', { advisorNames: [], ciclo, semana });
// 		}

// 		const advisorDcs = orders; // Los asesores están en el documento recuperado

// 		const advisorNames = advisorDcs.Asesores.map((asesor) => ({
// 			Asesor: asesor.Asesor,
// 			AsesorId: asesor._id,
// 			Pedidos: asesor.Pedidos.map((pedido) => ({
// 				NumeroPedido: pedido['Número de Pedido'],
// 			})),
// 		}));

// 		res.render('orders', {
// 			advisorNames,
// 			ciclo,
// 			semana,
// 			logoUrl: req.user.logoUrl,
// 			teamName: req.user.teamName,
// 		});
// 	} catch (error) {
// 		console.error('Error fetching orders:', error);
// 		res.status(500).json({ message: 'Error fetching orders' });
// 	}
// };
