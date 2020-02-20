const {
  getOrderById,
  getCustomerOrdersInProduction,
  getUserAndSubordinatesOrders,
  getNumberOfNewOrders,
  getOrdersInProduction,
  getOrdersToPaintsOrder,
  getUserOrders,
  getOrdersByArrayOfId,
  getNewOrders,
  getEndedOrdersByDate,
  getOrdersForPosition,
  getOrdersByFindParams,
  getUserEndedOrdersByDate
} = require("../../actions/orders/get");
const { getUserById } = require("../../actions/users/get");
const { getProfileById } = require("../../actions/profile/get");
const {
  checkPermission,
  checkPermissionToGetOrder
} = require("../../utils/functions");

const get = {
  orderById: async (req, res) => {
    const { orderId } = req.params;
    const { id, permission } = req.user;
    const perms = ["admin", "employee", "display"];

    try {
      const order = await getOrderById(orderId);
      const user = await getUserById(id);
      const orderOwner = await getUserById(order.user._id);
      const subordinates = user.subordinates
        ? user.subordinates.map(item => item.id)
        : [];
      const ordersInProduction = await getCustomerOrdersInProduction(
        order.user._id,
        orderId
      );

      if (
        !checkPermissionToGetOrder(
          perms,
          permission,
          user,
          subordinates,
          orderOwner
        )
      ) {
        return res.send("You can not do this");
      }

      return res.json({ order, ordersInProduction });
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  myOrders: async (req, res) => {
    const { id } = req.user;
    try {
      const user = await getProfileById(id);

      const orders = await getUserAndSubordinatesOrders(user);

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  numberOfNewOrders: async (req, res) => {
    try {
      const numberOfNewOrders = await getNumberOfNewOrders();
      return res.json(numberOfNewOrders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  ordersInProduction: async (req, res) => {
    const { permission } = req.user;
    const perms = ["admin", "display"];
    try {
      if (!checkPermission(perms, permission)) {
        return res.send("You can not do this");
      }

      const orders = await getOrdersInProduction();

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  newOrders: async (req, res) => {
    try {
      const orders = await getNewOrders();

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  endedOrders: async (req, res) => {
    const { date, dateFrom } = req.body;

    const dateToQuery = new Date(date);
    const dateFromToQuery = new Date(dateFrom);
    dateFromToQuery.setDate(dateFromToQuery.getDate() + 1);

    try {
      const orders = await getEndedOrdersByDate(dateToQuery, dateFromToQuery);

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  ordersToPaintsOrder: async (req, res) => {
    const { permission } = req.user;
    const perms = ["admin", "employee"];

    try {
      if (!checkPermission(perms, permission)) {
        return res.send("You can not do this");
      }

      const orders = await getOrdersToPaintsOrder();

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  userOrders: async (req, res) => {
    const { userId } = req.params;

    try {
      const orders = await getUserOrders(userId);

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  userOrdersEndedInMonth: async (req, res) => {
    const { userId, month, year } = req.params;

    try {
      const dateToQuery = new Date(year, month - 1, 1);
      const dateFromToQuery = new Date(year, month, 1);
      const orders = await getUserEndedOrdersByDate(
        userId,
        dateToQuery,
        dateFromToQuery
      );

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  ordersByIdsArray: async (req, res) => {
    let { arrayOfId } = req.body;

    try {
      arrayOfId = arrayOfId.map(item => item._id);
      const orders = await getOrdersByArrayOfId(arrayOfId);

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  ordersForPosition: async (req, res) => {
    const { permission } = req.user;
    const { position } = req.params;
    const perms = ["admin", "employee"];
    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }
      const orders = await getOrdersForPosition(position);

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  findOrder: async (req, res) => {
    const { user, number, name, color } = req.body;

    try {
      const orders = await getOrdersByFindParams(user, number, name, color);

      return res.json(orders);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { get };
