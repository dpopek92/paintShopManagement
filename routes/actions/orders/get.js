const Orders = require("../../../models/Orders");

const checkIfOrderExist = async (user, number) => {
  return await Orders.findOne({ user, number });
};

const getUserOrders = async user => {
  return await Orders.find({ user });
};

const getOrdersByStatus = async status => {
  return await Orders.find({ status: { $regex: `${status}`, $options: "i" } })
    .select("-items")
    .populate("user");
};

module.exports = { checkIfOrderExist, getUserOrders, getOrdersByStatus };
