const { getOrderById } = require("../../actions/orders/get");
const { removeOrderById } = require("../../actions/orders/remove");
const { getUserById } = require("../../actions/users/get");
const { removeDir } = require("../../actions/files/remove");
const { checkPermissionToGetOrder } = require("../../utils/functions");

const remove = {
  orderById: async (req, res) => {
    const { id, permission } = req.user;
    const { orderId } = req.params;
    const perms = ["admin"];

    try {
      const user = await getUserById(id);
      const order = await getOrderById(orderId);
      const orderOwner = await getUserById(order.user._id);
      if (!checkPermissionToGetOrder(perms, permission, user, [], orderOwner)) {
        return res.status(400).send("You can not do this");
      }

      await removeOrderById(orderId);

      const filesPath = `./uploads/${orderOwner._id}/${order.number}`;
      await removeDir(filesPath);

      orderOwner.ordersNumber -= 1;
      await orderOwner.save();

      return res.send("Order has ben deleted");
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { remove };
