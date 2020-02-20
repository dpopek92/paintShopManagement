const mongoose = require("mongoose");
const Order = require("../../../models/Orders");
const { productionStates } = require("../../utils/const");

// *
const getPickedupOrdersInMonth = async (year, month) => {
  let orders = await Order.aggregate([
    { $addFields: { year: { $year: "$pickUpDate" } } },
    { $match: { year } },
    { $addFields: { month: { $month: "$pickUpDate" } } },
    { $match: { month } }
  ]);

  await Order.populate(orders, { path: "user" });
  return orders;
};

// *
const getCustomerPickedupOrdersInYear = async (customerId, year) => {
  let orders = await Order.aggregate([
    { $match: { user: mongoose.Types.ObjectId(customerId) } },
    { $addFields: { year: { $year: "$pickUpDate" } } },
    { $match: { year } }
  ]);
  await Order.populate(orders, { path: "user" });
  return orders;
};

// *
const getCustomerPickedupOrdersInMonth = async (customerId, year, month) => {
  let orders = await Order.aggregate([
    { $match: { user: mongoose.Types.ObjectId(customerId) } },
    { $addFields: { year: { $year: "$pickUpDate" } } },
    { $match: { year } },
    { $addFields: { month: { $month: "$pickUpDate" } } },
    { $match: { month } }
  ]);
  await Order.populate(orders, { path: "user" });
  return orders;
};

// *
const getOrderById = async id => {
  const order = await Order.findById(id).populate("user", [
    "company",
    "firstname",
    "surname",
    "_id"
  ]);
  if (!order) throw "There is no order with this id";
  return order;
};

// *
const getOrdersInProduction = async () => {
  const orders = await Order.find({
    $or: [
      { status: "Przygotowanie" },
      { status: "Lakierowanie" },
      { status: "Polerowanie" },
      { status: "Pakowanie" },
      { status: "Do odbioru" },
      { status: "W produkcji" }
    ]
  }).populate("user", ["company", "firstname"]);

  return orders;
};

// *
const getUserOrders = async userId => {
  const orders = await Order.find({ user: userId })
    .select("-items")
    .populate("user", ["company", "firstname", "_id"]);

  if (!orders) throw "There is no orders for this user";
  return orders;
};

// *
const getUserAndSubordinatesOrders = async user => {
  const subordinates = [{ user: user._id.toString() }];
  if (user.subordinates) {
    user.subordinates.forEach(item =>
      subordinates.push({ user: item.id.toString() })
    );
  }

  const orders = await Order.find({ $or: subordinates })
    .select("-items")
    .populate("user", ["firstname", "company", "_id"]);
  if (!orders) throw "There is no orders for you";
  return orders;
};

// *
const getCustomerOrdersInProduction = async (customerId, orderId) => {
  const orders = await Order.find({
    _id: { $ne: orderId },
    user: customerId,
    productionStatus: { $in: productionStates }
  })
    .select("-items")
    .populate("user", ["firstname", "company", "_id"]);
  return orders;
};

// *
const getOrdersByArrayOfId = async arrayOfId => {
  const orders = await Order.find({ _id: { $in: arrayOfId } })
    .select("-items")
    .populate("user", ["company", "firstname"]);
  if (!orders) throw "There is no orders";
  return orders;
};

// *
const getNumberOfUserOrders = async userId => {
  const ordersNumber = await Order.countDocuments({ user: userId });
  return ordersNumber;
};

// *
const getNumberOfNewOrders = async () => {
  const orders = await Order.countDocuments({ status: "Wysłane" });
  return orders;
};

// *
const getNewOrders = async () => {
  const orders = await Order.find({ status: "Wysłane" })
    .select("-items")
    .populate("user", ["company", "firstname"]);
  if (!orders) throw "There is no new orders";
  return orders;
};

// *
const getEndedOrdersByDate = async (dateTo, dateFrom) => {
  const orders = await Order.find({
    status: "Odebrane",
    $and: [{ pickUpDate: { $gte: dateTo } }, { pickUpDate: { $lte: dateFrom } }]
  })
    .select("-items")
    .populate("user", ["company", "firstname"])
    .sort({ finishDate: -1 });
  if (!orders) throw "There is no ended orders";
  return orders;
};

// *
const getUserEndedOrdersByDate = async (userId, dateTo, dateFrom) => {
  const orders = await Order.find({
    user: userId,
    status: "Odebrane",
    $and: [{ pickUpDate: { $gte: dateTo } }, { pickUpDate: { $lte: dateFrom } }]
  })
    .select("-items")
    .populate("user", ["company", "firstname"])
    .sort({ finishDate: -1 });
  if (!orders) throw "There is no ended orders";
  return orders;
};

// *
const getOrdersForPosition = async position => {
  const query =
    position === "Pakowanie"
      ? {
          $or: [
            {
              productionStatus: {
                $regex: `${position}`,
                $options: "i"
              }
            },
            { productionStatus: { $regex: `Zakończone`, $options: "i" } }
          ]
        }
      : {
          productionStatus: { $regex: `${position}`, $options: "i" }
        };

  const orders = await Order.find(query).populate("user", [
    "company",
    "firstname"
  ]);
  if (!orders) throw "There is no orders for this position";
  return orders;
};

// *
const getOrdersToPaintsOrder = async () => {
  const orders = await Order.find({
    isPaintOrdered: false,
    $or: [
      {
        productionStatus: {
          $regex: `Podkład`,
          $options: "i"
        }
      },
      {
        productionStatus: {
          $regex: `Szlifiernia`,
          $options: "i"
        }
      },
      {
        productionStatus: {
          $regex: `Lakiernia`,
          $options: "i"
        }
      }
    ]
  })
    .select("-items")
    .populate("user", ["company", "firstname"]);
  return orders;
};

// *
const getOrdersByFindParams = async (user, number, name, color) => {
  const orders = await Order.find({
    user,
    color: { $regex: color, $options: "i" },
    number: { $regex: number, $options: "i" },
    name: { $regex: name, $options: "i" }
  })
    .select("-items")
    .populate("user", ["company", "firstname"]);
  if (!orders) throw "There is no orders";
  return orders;
};

// *
const checkIfOrderExist = async (number, userId) => {
  const order = await Order.findOne({
    number,
    user: userId
  });
  return order;
};

module.exports = {
  getOrdersForPosition,
  getEndedOrdersByDate,
  getNewOrders,
  getOrdersToPaintsOrder,
  getOrdersInProduction,
  getUserAndSubordinatesOrders,
  getUserOrders,
  getNumberOfNewOrders,
  getNumberOfUserOrders,
  getOrderById,
  getCustomerOrdersInProduction,
  getOrdersByArrayOfId,
  getOrdersByFindParams,
  checkIfOrderExist,
  getPickedupOrdersInMonth,
  getCustomerPickedupOrdersInMonth,
  getCustomerPickedupOrdersInYear,
  getUserEndedOrdersByDate
};
