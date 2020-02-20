const fse = require("fs-extra");
const Orders = require("../../../models/Orders");
const { getUserById } = require("../../actions/users/get");
const {
  getPaintsOrdersDocument,
  getPaintsOrderByOrderId
} = require("../../actions/paints/get");
const { getOrdersByArrayOfId } = require("../../actions/orders/get");
const generatePaintsOrder = require("../../actions/files/generate/xlsx/paintsOrder");
const { sendFile } = require("../../actions/files/sendFileTemplate");
const { checkPermission } = require("../../utils/functions");

const post = {
  newOrder: async (req, res) => {
    console.log("---===NEW PAINTS ORDER===---");
    const { skippedOrders, paintsOrders } = req.body;
    const { permission, id } = req.user;

    const perms = ["admin", "employee"];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      const user = await getUserById(id);

      const paintsOrder = await getPaintsOrdersDocument(year, month);

      // update array with orders
      const obj = {
        user: `${user.firstname} ${user.surname}`,
        date,
        skipped: skippedOrders,
        colors: paintsOrders
      };
      paintsOrder.orders.push(obj);
      await paintsOrder.save();

      // update orders
      let orders = [...skippedOrders];
      paintsOrders.forEach(item => {
        orders = orders.concat(item.orders);
      });
      await Orders.updateMany(
        { _id: { $in: orders } },
        { isPaintOrdered: true }
      );

      const paintsOrderId =
        paintsOrder.orders[paintsOrder.orders.length - 1]._id;

      const order = await getPaintsOrderByOrderId(year, month, paintsOrderId);

      const ordersData = await getOrdersByArrayOfId(orders);

      const filePath = `./files/paintsOrders/`;
      const fileName = `Lakiery_${day}-${month}-${year}r.xlsx`;

      await fse.ensureDir(filePath);
      await generatePaintsOrder(order, ordersData, filePath, fileName);

      return sendFile(filePath, fileName, "xlsx", res);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).json({ info: "Server error", msg: err });
    }
  }
};

module.exports = { post };
