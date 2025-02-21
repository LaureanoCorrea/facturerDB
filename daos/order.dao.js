const Order = require('../models/order.model');

class OrderDao {
	async create(orderData) {
		try {
			const order = new Order(orderData);
			await order.save();
			return order;
		} catch (error) {
			throw new Error(`Error creating order: ${error.message}`);
		}
	}

	// async getAll() {
	//   try {
	//     return await Order.find();
	//   } catch (error) {
	//     throw new Error(`Error fetching orders: ${error.message}`);
	//   }
	// }

	async readById(id) {
		try {
			return await Order.findOne({ 'Asesores._id': id }, { 'Asesores.$': 1 });
		} catch (error) {
			throw new Error(`Error fetching order by ID: ${error.message}`);
		}
	}

	// async update(itemId, newData) {
	//   try {
	//     console.log("newData dao:", newData);
	//     console.log('id dao', itemId)
	//     return await Order.findByIdAndUpdate(itemId, newData, { new: true });
	//   } catch (error) {
	//     throw new Error(`Error updating order: ${error.message}`);
	//   }
	// }

	// async delete(id) {
	//   try {
	//     return await Order.deleteOne({ _id: id });
	//   } catch (error) {
	//     throw new Error(`Error deleting order: ${error.message}`);
	//   }
	// }
}

module.exports = new OrderDao();
