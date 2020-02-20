const fse = require("fs-extra");
const { getUserById } = require("../../actions/users/get");
const { getEmployeesByArrayOfId } = require("../../actions/employees/get");
const {
  getOrderById,
  getOrdersByArrayOfId
} = require("../../actions/orders/get");
const {
  addProductionStatus,
  updateProductionHistory
} = require("../../actions/orders/update");
const {
  getEmployeesStatsToReport
} = require("../../actions/statistics/employees/get");
const {
  checkPermission,
  checkPermissionToGetOrder
} = require("../../utils/functions");
const { sendFile } = require("../../actions/files/sendFileTemplate");
const archiveFiles = require("../../actions/files/archiveFiles");
const {
  generateOrderProductionCards
} = require("../../actions/files/orderProductionCardFunctions");
const labelGenerate = require("../../actions/files/generate/png/orderLabel");
const newOrderSheetTemplate = require("../../actions/files/generate/xlsx/newOrderSheetTemplate");
const productionListGenerate = require("../../actions/files/generate/xlsx/productionList");
const employeesReportGenerate = require("../../actions/files/generate/xlsx/employeesReport");
const pickUpReportGenerate = require("../../actions/files/generate/pdf/pickUpReport");
const {
  generateQrCodeForOrder
} = require("../../actions/files/generate/qr/qrCode");

// to correct
const {
  updateProductionStatistics
} = require("../../actions/statistics/production/update");

const get = {
  getNewOrderSheetTemplate: async (req, res) => {
    const { id } = req.user;
    try {
      console.log("Pobranie templatki do importu wymiarów");
      const user = await getUserById(id);

      const path = `./files/newOrderSheet/`;
      const name = `Import_wymiarow_BLOW(wzor).xlsx`;
      await fse.ensureDir(path);

      await newOrderSheetTemplate(user);

      return await sendFile(path, name, "xlsx", res);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  orderFiles: async (req, res) => {
    const { id, permission } = req.user;
    const { id: orderId } = req.body;
    const perms = ["admin", "employee", "user"];

    try {
      console.log("Pobieranie plików zamówienia");
      const user = await getUserById(id);
      const subordinates = user.subordinates
        ? user.subordinates.map(item => item.id)
        : [];

      let order = await getOrderById(orderId);
      const orderOwner = await getUserById(order.user._id);

      if (
        !checkPermissionToGetOrder(
          perms,
          permission,
          user,
          subordinates,
          orderOwner
        )
      ) {
        return res.status(400).send("You can not do this");
      }

      const filesPath = `./files/${orderOwner._id}/${order.number}/files/`;
      const orderFilesPath = `./uploads/${orderOwner._id}/${order.number}/`;
      const labelName = `${orderOwner.company}_${order.number}_[NAKLEJKA].png`;
      const zipFilePath = `./files/${orderOwner._id}/${order.number}/`;
      const zipFileName = `form.zip`;

      // ensure dir
      await fse.emptyDir(filesPath);

      // qrCode
      const qrExist = await fse.pathExists(`${orderFilesPath}qrCode.png`);
      if (!qrExist) {
        const qr = await generateQrCodeForOrder(orderId, orderFilesPath);
        if (qr)
          await fse.copy(
            `${orderFilesPath}qrCode.png`,
            `${filesPath}qrCode.png`
          );
      }

      // label
      await labelGenerate(order, filesPath, labelName);

      // productionCard
      await generateOrderProductionCards(order, filesPath);

      const archive = await archiveFiles(filesPath, zipFilePath, zipFileName);
      if (archive) {
        archive.on("close", async () => {
          return await sendFile(zipFilePath, zipFileName, "zip", res);
        });
      }
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  orderLabel: async (req, res) => {
    const { orderId } = req.params;
    const { permission } = req.user;
    const perms = ["admin", "employee"];

    try {
      console.log("Pobieranie naklejki");
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      const order = await getOrderById(orderId);
      const orderOwner = order.user;
      const path = `./files/${orderOwner._id}/${order.number}/files/`;
      const name = `${order.number}_[NAKLEJKA].png`;
      await fse.ensureDir(path);

      await labelGenerate(order, path, name);

      return await sendFile(path, name, "png", res);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  pickUpReport: async (req, res) => {
    const { orderId, pickedUpElements, position } = req.body;
    const { id, permission } = req.user;
    const perms = ["admin", "employee"];

    try {
      console.log("Pobieranie raportu odbioru");
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      const user = await getUserById(id);
      let order = await getOrderById(orderId);
      const orderOwner = await getUserById(order.user._id);

      // Update order status and production statistics
      if (
        order.elements === pickedUpElements ||
        order.elements === order.pickedUpElements + pickedUpElements
      ) {
        order.status = "Odebrane";
        order.productionStatus = "Odebrane";
        const desc = "Odebrano zamówienie";
        await updateProductionStatistics(
          order,
          desc,
          order.items,
          null,
          "odebrane",
          null
        );
      } else {
        order = await addProductionStatus(order, "Odebrane");
      }

      // Update order pickup date
      order.pickUpDate = new Date();

      // Update order pickedup elements
      order.pickedUpElements = pickedUpElements;

      // Update order production history
      const historyDesc = `Wydanie ${pickedUpElements} elementu/ów.`;
      const historyEmp = [`${user.firstname} ${user.surname}`];
      order = await updateProductionHistory(
        order,
        historyDesc,
        position,
        historyEmp,
        null
      );

      await order.save();

      // Generate file
      const filePath = `./files/pickupReport/`;
      const fileName = `pickupreport.pdf`;
      await pickUpReportGenerate(
        orderOwner,
        order,
        pickedUpElements,
        filePath,
        fileName
      );

      // Send file
      return setTimeout(() => {
        sendFile(filePath, fileName, "pdf", res);
      }, 1000);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  productionList: async (req, res) => {
    const ordersIds = req.body;

    try {
      const orders = await getOrdersByArrayOfId(ordersIds);

      // Sort orders
      const ordersInOrder = [];
      if (orders) {
        ordersIds.forEach(id => {
          for (let i = 0; i < orders.length; i++) {
            if (orders[i]._id.toString() === id) {
              ordersInOrder.push(orders[i]);
            }
          }
        });
      }

      const filePath = `./files/productionLists/`;
      const fileName = `List.xlsx`;
      await productionListGenerate(ordersInOrder, filePath, fileName);

      return await sendFile(filePath, fileName, "xlsx", res);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  pdfImage: async (req, res) => {
    const { path: fileName, orderId } = req.body;

    try {
      await getOrderById(orderId);

      const filePath = `./uploads/`;

      return await sendFile(filePath, fileName, "pdf", res);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  employeesMonthReport: async (req, res) => {
    const { month, year, position, employees: employeesIds } = req.body;

    try {
      const employeesArr = await getEmployeesByArrayOfId(employeesIds);
      const stats = await getEmployeesStatsToReport(year, month, employeesArr);

      const filePath = `./files/employeesReport/`;
      const name = position !== "Podkład" ? position : "Podklad";
      const fileName = `Raport_${month}-${year}_${name}.xlsx`;

      await fse.ensureDir(filePath);
      await employeesReportGenerate(
        year,
        month,
        position,
        employeesArr,
        stats,
        filePath,
        fileName
      );

      return await sendFile(filePath, fileName, "xlsx", res);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  }
};

module.exports = { get };
