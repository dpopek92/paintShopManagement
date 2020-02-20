const fse = require("fs-extra");
const {
  getPaintsOrdersDocument,
  getPaintsOrderByOrderId
} = require("../../actions/paints/get");
const { getOrdersByArrayOfId } = require("../../actions/orders/get");
const generatePaintsOrder = require("../../actions/files/generate/xlsx/paintsOrder");
const { sendFile } = require("../../actions/files/sendFileTemplate");
const { checkPermission } = require("../../utils/functions");

const get = {
  ordersByMonth: async (req, res) => {
    const { year, month } = req.body;
    const { permission } = req.user;
    const perms = ["admin", "employee"];
    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      const document = await getPaintsOrdersDocument(year, month);

      return res.json(document);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).json({ info: "Server error", msg: err });
    }
  },

  orderById: async (req, res) => {
    const { orderId } = req.params;
    const { year, month, day } = req.body;
    const { permission } = req.user;
    const perms = ["admin", "employee"];
    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      const paintsOrder = await getPaintsOrderByOrderId(year, month, orderId);

      let orders = [];
      paintsOrder.colors.forEach(item => {
        orders = orders.concat(item.orders);
      });

      const ordersData = await getOrdersByArrayOfId(orders);

      const filePath = `./files/paintsOrders/`;
      const fileName = `Lakiery_${day}-${month}-${year}r.xlsx`;

      await fse.ensureDir(filePath);
      await generatePaintsOrder(paintsOrder, ordersData, filePath, fileName);

      return await sendFile(filePath, fileName, "xlsx", res);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).json({ info: "Server error", msg: err });
    }
  }
};

module.exports = { get };
