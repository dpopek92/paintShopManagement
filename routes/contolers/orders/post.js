const { getUserById } = require("../../actions/users/get");
const {
  getOrderById,
  getUserOrders,
  checkIfOrderExist,
  getNumberOfUserOrders
} = require("../../actions/orders/get");
const {
  incrementOrderNumber,
  updateOrderHistory,
  changeImagesPath
} = require("../../actions/orders/update");
const { getGlobalPrices } = require("../../actions/prices/get");
const { getGlobalSettings } = require("../../actions/settings/get");
const { calculatePrice } = require("../../actions/orders/calculatePrice");
const {
  moveNewOrderItemsImages,
  copyCustomMillingImage
} = require("../../actions/files/move");
const {
  generateQrCodeForOrder
} = require("../../actions/files/generate/qr/qrCode");
const { checkPermission } = require("../../utils/functions");
const {
  historyUpdateKeys,
  historyUpdateSkippedKeys,
  keysToSkippOrdersUpdate
} = require("../../utils/const");

//toCorrect
const {
  updateProductionStatistics
} = require("../../actions/statistics/production/update");

const post = {
  newOrder: async (req, res) => {
    const { id, permission } = req.user;
    const perms = ["admin", "user"];
    let data = JSON.parse(req.body.Order);
    const { files } = req;
    const orderOwnerId = data.user ? data.user : id;
    try {
      if (
        !data.number ||
        !data.finishDate ||
        !data.date ||
        !data.color ||
        !data.paintType ||
        !data.elements ||
        data.items.length <= 0
      ) {
        return res.status(400).send("No data");
      }
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }
      const user = await getUserById(id);
      const orderOwner = await getUserById(orderOwnerId);
      const settings = await getGlobalSettings();

      // Check if order with this number exist, and change number if true
      let order = await checkIfOrderExist(data.number, orderOwnerId);
      if (order) {
        const userOrders = await getUserOrders(orderOwnerId);
        data.number = await incrementOrderNumber(data.number, userOrders);
      }

      // Change images path
      const newImagesPaths = await changeImagesPath(
        orderOwnerId,
        data.number,
        data.items,
        data.customMilling
      );
      data.items = newImagesPaths.items;
      data.customMilling = newImagesPaths.customMilling;

      // Create order updateHistory and push newOrderElement.
      data.updateHistory = [];
      data = await updateOrderHistory(
        data,
        user,
        "Nowe zamówienie",
        `Zamówienie utworzone przez: ${user.firstname} ${user.surname}`
      );

      // Set paintmakers, orderType, finishDate, user, productionStatus.
      if (data.paintType !== "Gloss") {
        data.paintMaker = settings.paintSemigloss;
      } else {
        data.paintMaker = settings.paintGloss;
      }
      data.paintMakerBase = settings.paintBase;

      data.orderType = data.orderType ? data.orderType : "Nowe zamówienie";
      data.finishDate = new Date(data.finishDate);
      data.productionFinishDate = new Date(data.finishDate);
      data.productionFinishDate.setDate(
        data.productionFinishDate.getDate() - 3
      );
      data.productionStatus = "Wysłane";
      data.user = orderOwnerId;
      const newOrder = new Order(data);
      await newOrder.save();

      // Move items images to user dir
      const imagesFrom = `./uploads/`;
      const imagesTo = `./uploads/${orderOwnerId}/${newOrder.number}/`;
      if (files.length) {
        await moveNewOrderItemsImages(files, imagesFrom, imagesTo);
      }

      // Copy customMilling image
      const orderUpdateTypes = [
        "Reklamacja (wina BLOW)",
        "Poprawa (wina klienta)",
        "Domówienie"
      ];
      if (
        orderUpdateTypes.includes(newOrder.orderType) &&
        newOrder.millingSymbol === "INNY"
      ) {
        await copyCustomMillingImage(
          newOrder.customMilling.path,
          imagesTo,
          newOrder.number,
          orderOwnerId
        );
      }

      // Set current free number for user
      const newOrderTypes = [
        "Materiał klienta",
        "Lista elementów",
        "",
        "Nowe zamówienie"
      ];
      if (newOrderTypes.includes(newOrder.orderType)) {
        const numberOfUserOrders = await getNumberOfUserOrders(orderOwnerId);
        const nextOrderNumber = parseInt(newOrder.number, 10) + 1;

        orderOwner.ordersNumber = numberOfUserOrders;
        orderOwner.currentFreeOrderId = nextOrderNumber;
        await orderOwner.save();
      }

      // Create QR code
      await generateQrCodeForOrder(newOrder._id, imagesTo);

      // Update production stats
      await updateProductionStatistics(
        newOrder,
        "Nowe zamówienie",
        newOrder.items,
        null,
        "nowe",
        null
      );
      console.log("Nowe zamówienie");
      return res.json(newOrder);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  editOrder: async (req, res) => {
    const { id, permission } = req.user;
    const perms = ["admin", "user"];
    let data = JSON.parse(req.body.Order);
    const orderOwnerId = data.user._id;
    const { files } = req;

    try {
      if (
        !data.number ||
        !data.color ||
        !data.paintType ||
        !data.elements ||
        data.items.length <= 0
      ) {
        res.status(400).send("No data");
      }
      if (!checkPermission(perms, permission) && id !== data.user._id) {
        return res.status(400).send("You can not do this");
      }

      let order = await getOrderById(data._id);
      const user = await getUserById(id);
      const orderOwner = await getUserById(orderOwnerId);

      if (permission === "user" && order.status !== "Wysłane") {
        return res.status(400).send("You can not do this");
      }

      // Change images paths
      const newImagesPaths = await changeImagesPath(
        orderOwnerId,
        data.number,
        data.items,
        data.customMilling
      );
      data.items = newImagesPaths.items;
      data.customMilling = newImagesPaths.customMilling;

      // Update history
      const date = new Date();
      Object.keys(data).forEach(key => {
        if (!historyUpdateSkippedKeys.includes(key)) {
          let orderData = order[key];
          let updatedData = data[key];
          if (typeof orderData === "number") orderData = orderData.toFixed(2);
          if (typeof updatedData === "number")
            updatedData = updatedData.toFixed(2);

          if (orderData !== updatedData) {
            const item = {
              date,
              user: `${user.firstname} ${user.surname}`,
              key: historyUpdateKeys[key],
              desc: `Zmiana z: ${orderData}, na: ${updatedData}`
            };
            order.updateHistory.push(item);
          }
        }
      });

      // Save order
      Object.keys(data).forEach(key => {
        if (!keysToSkippOrdersUpdate.includes(key)) {
          const item = data[key];
          order[key] = item;
        }
      });
      await order.save();

      // Move files
      const imagesFrom = `./uploads/`;
      const imagesTo = `./uploads/${orderOwnerId}/${order.number}/`;
      if (files.length) {
        await moveNewOrderItemsImages(files, imagesFrom, imagesTo);
      }
      console.log("Edycja zamówienia");
      return res.send({ _id: data._id });
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  calculateOrderPrice: async (req, res) => {
    const { id } = req.user;
    const {
      byUser,
      orderType,
      paintType,
      paintStyle,
      handleSymbol1,
      handleSymbol2,
      backMilling,
      chamfering,
      milledHandle,
      milledPartHandle,
      hingesHoles,
      veneerSymbol,
      color,
      items
    } = req.body;

    try {
      const orderOwner = await getUserById(byUser || id);
      const prices = await getGlobalPrices();
      const { discounts } = orderOwner;

      const orderPriceObject = await calculatePrice(
        prices,
        discounts,
        backMilling,
        chamfering,
        orderType,
        veneerSymbol,
        color,
        paintType,
        paintStyle,
        handleSymbol1,
        handleSymbol2,
        milledHandle,
        milledPartHandle,
        hingesHoles,
        items
      );

      return res.json(orderPriceObject);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { post };
