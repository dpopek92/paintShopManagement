const Order = require("../../../models/Orders");

// *
const removeAllUserOrders = async userId => {
  return await Order.deleteMany({ user: userId });
};

// *
const removeOrderById = async orderId => {
  return await Order.findByIdAndDelete(orderId);
};

module.exports = { removeAllUserOrders, removeOrderById };
