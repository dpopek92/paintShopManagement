const { getOrderById } = require("../../actions/orders/get");
const { getUserById } = require("../../actions/users/get");
const { getEmployeesByArrayOfId } = require("../../actions/employees/get");
const {
  addProductionStatus,
  updateOrderHistory,
  updateProductionHistory,
  endProduction,
  addProductionComment,
  updateManHours,
  setLostElements,
  setElementsToCorrect,
  setInProductionField,
  startProduction,
  getWorkTimeFromProduction
} = require("../../actions/orders/update");
const { getGlobalPrices } = require("../../actions/prices/get");
const { checkPermission } = require("../../utils/functions");
const { dateToString } = require("../../utils/date");
const sendEmail = require("../../actions/email/sendEmailTemplate");
//to correct
const {
  updateProductionStatistics
} = require("../../actions/statistics/production/update");

const update = {
  orderStatus: async (req, res) => {
    console.log(req.params);
    console.log("Zmiana statusu");
    const { status, productionStatus } = req.body;
    const { orderId } = req.params;
    const { id, permission } = req.user;
    const perms = ["admin", "employee"];

    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      const user = await getUserById(id);
      let order = await getOrderById(orderId);
      const orderOwner = await getUserById(order.user._id);

      order.status = status;
      order.productionStatus = productionStatus;

      order = await updateOrderHistory(
        order,
        user,
        "Status",
        `Zmiana statusu na: ${productionStatus}`
      );

      const readyToPickUpStatus = ["Zakończone", "Odebrane"];
      if (readyToPickUpStatus.includes(order.productionStatus)) {
        order.isReadyToPickUp = true;
        order.items = order.items.map(item => {
          item.elementToCorrect = undefined;
          item.elementLost = undefined;
          return item;
        });
      }

      if (order.productionStatus === "Odebrane") {
        order.pickUpDate = new Date();
        order.pickedUpElements = order.elements;
        await updateProductionStatistics(
          order,
          "Odebrano zamówienie",
          order.items,
          null,
          "odebrane",
          null
        );
      }

      // obserwować i sprawdzić czy potrzebne, czy ten endpoint ma być tylko dla admina.
      if (permission === "employee") {
        const employees = [`${user.firstname} ${user.surname}`];
        order = await updateProductionHistory(
          order,
          "Zgłoszenie odbioru zamówienia",
          "Pakowanie",
          employees,
          null
        );
      }
      order = await endProduction(order);

      if (order.productionStatus === "Surówka" && !order.isMailToCustomer) {
        const msg = `<h2>Zamówienie zmieniło status</h2></br>
        <p style="font-size:18">Zamówienie nr. ${order.number}, zostało <strong>przyjęte do realizacji</strong>.</p>`;
        await sendEmail(
          orderOwner.email,
          "BLOW meble - zamówienie trafiło na produkcję",
          msg
        );
        order.isMailToCustomer = 1;
      }
      if (
        order.status === "Do odbioru" &&
        order.productionStatus === "Zakończone" &&
        order.isMailToCustomer === 1
      ) {
        const msg = `<h2>Zamówienie zmieniło status</h2></br>
        <p style="font-size:18">Zamówienie nr: ${order.number} - ${order.name} jest <strong>gotowe do odbioru</strong>.</p>`;
        await sendEmail(
          orderOwner.email,
          "BLOW meble - zamówienie gotowe do odbioru",
          msg
        );
        order.isMailToCustomer = 2;
      }

      await order.save();
      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  addOrderStatus: async (req, res) => {
    console.log("Dodanie statusu");
    const { id } = req.user;
    const { orderId } = req.params;
    const { productionStatus } = req.body;

    try {
      const user = await getUserById(id);
      let order = await getOrderById(orderId);

      order = await addProductionStatus(order, productionStatus);
      order = await updateOrderHistory(
        order,
        user,
        "Status",
        `Dodanie statusu: ${productionStatus}`
      );
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  setReadyToPickUp: async (req, res) => {
    console.log("Oznaczenie gotowości do odbioru");
    const { id, permission } = req.user;
    const { orderId } = req.params;
    const perms = ["admin", "employee"];

    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }
      let order = await getOrderById(orderId);
      const user = await getUserById(id);
      const orderOwner = await getUserById(order.user._id);

      order = await endProduction(order);
      order.items = order.items.map(item => {
        item.elementToCorrect = undefined;
        item.elementLost = undefined;
        return item;
      });
      if (permission === "employee") {
        const employees = [`${user.firstname} ${user.surname}`];
        order = await updateProductionHistory(
          order,
          "Oznaczenie gotowości do odbioru",
          "Pakowanie",
          employees,
          null
        );
      }
      order.isReadyToPickUp = true;
      await order.save();

      const msg = `<h2>Zamówienie zmieniło status</h2></br>
      <p style="font-size:18">Zamówienie nr: ${order.number} - ${order.name} jest <strong>gotowe do odbioru</strong>.</p>`;
      await sendEmail(
        orderOwner.email,
        "BLOW meble - zamówienie dotowe do odbioru",
        msg
      );

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  orderPrice: async (req, res) => {
    console.log("Zmiana ceny");
    const { price } = req.body;
    const { orderId } = req.params;
    const { id } = req.user;

    try {
      let order = await getOrderById(orderId);
      const user = await getUserById(id);

      order.price = price;
      order.items = order.items.map(item => {
        item.includedToPrice = true;
        return item;
      });
      order = await updateOrderHistory(
        order,
        user,
        "Cena",
        `Zmiana ceny na: ${price}zł`
      );
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  paidStatus: async (req, res) => {
    console.log("Zmiana statusu płatności");
    const { isPaid } = req.body;
    const { orderId } = req.params;
    const { id } = req.user;

    try {
      let order = await getOrderById(orderId);
      const user = await getUserById(id);

      order.isPaid = isPaid;
      order = await updateOrderHistory(
        order,
        user,
        "Status płatności",
        `Zamówienie jest ${isPaid ? "opłacone" : "nieopłacone"}`
      );
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  paintMakers: async (req, res) => {
    const { orderId } = req.params;
    const { id } = req.user;
    const { paintMaker, paintMakerBase } = req.body;

    try {
      let order = await getOrderById(orderId);
      const user = await getUserById(id);

      order.paintMaker = paintMaker;
      order.paintMakerBase = paintMakerBase;
      order = await updateOrderHistory(
        order,
        user,
        "Producent lakieru/podkładu",
        `Lakier: ${paintMaker}, podkład: ${paintMakerBase}`
      );
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  productionFinishDate: async (req, res) => {
    console.log("Zmiana daty realizacji");
    const { orderId } = req.params;
    const { id } = req.user;
    const { date } = req.body;

    const newDate = new Date(date).toISOString();
    let newProductionDate = new Date(date);
    newProductionDate.setDate(newProductionDate.getDate() - 3);
    const newProductionDateIso = newProductionDate.toISOString();

    try {
      let order = await getOrderById(orderId);
      const user = await getUserById(id);

      order.finishDate = newDate;
      order.productionFinishDate = newProductionDateIso;
      order = await updateOrderHistory(
        order,
        user,
        "Data realizacji",
        `Zmiana daty realizacji na: ${dateToString(newProductionDateIso)}`
      );
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  setOrderPriority: async (req, res) => {
    const { orderId } = req.params;
    const { id } = req.user;
    const { priority } = req.body;

    try {
      let order = await getOrderById(orderId);
      const user = await getUserById(id);

      order.priority = priority;
      order = await updateOrderHistory(
        order,
        user,
        "Priorytet",
        `${priority ? "Ustawiono priorytet" : "Zdjęto priorytet"}`
      );
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  addProductionComment: async (req, res) => {
    const { orderId } = req.params;
    const { permission } = req.user;
    const { position, comment } = req.body;
    const perms = ["admin", "employee"];

    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do thi");
      }
      let order = await getOrderById(orderId);

      order = await addProductionComment(order, position, comment);
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  setManHours: async (req, res) => {
    const { manHours } = req.body;
    const { orderId } = req.params;
    const { id } = req.user;

    try {
      let order = await getOrderById(orderId);
      const user = await getUserById(id);
      const orderOwner = await getUserById(order.user._id);
      const prices = await getGlobalPrices();

      order = await updateManHours(
        order,
        manHours,
        prices.manHour,
        orderOwner.discounts.manHour
      );
      order = await updateOrderHistory(
        order,
        user,
        "Roboczogodziny",
        `Dodano ${manHours} roboczogodzin`
      );
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  // Production process
  startOrder: async (req, res) => {
    const { orderId } = req.params;
    const { permission } = req.user;
    const { position } = req.body;
    console.log(`Start zamówienia na: ${position}`);
    try {
      if (permission !== "employee") {
        return res.status(400).send("You can not do this");
      }

      let order = await getOrderById(orderId);

      // add position to inProduction
      order = await setInProductionField(order, position, "add");

      // start production
      order = await startProduction(order, position);

      // add current position to state if not exist
      order = await addProductionStatus(order, position);

      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  pauseOrder: async (req, res) => {
    const { orderId } = req.params;
    const { orderEmployees, position } = req.body;
    const { id, permission } = req.user;
    orderEmployees.push(id);

    console.log(`Pauza zamówienia na: ${position}`);
    try {
      if (permission !== "employee") {
        return res.status(400).send("You can not do this");
      }

      let order = await getOrderById(orderId);
      const employees = await getEmployeesByArrayOfId(orderEmployees);

      order = await setInProductionField(order, position, "remove");

      order = await endProduction(order, employees);

      const workTime = await getWorkTimeFromProduction(order, position);

      const desc = `Zakończenie wykonywania zlecenia (PAUZA)`;
      const employeesArr = employees.map(
        item => `${item.firstname} ${item.surname}`
      );
      order = await updateProductionHistory(
        order,
        desc,
        position,
        employeesArr,
        workTime
      );

      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  // to correct
  stopOrder: async (req, res) => {
    const { orderId } = req.params;
    const { id, permission } = req.user;
    const {
      orderEmployees,
      position,
      halfGrinding,
      isOrderCompleted
    } = req.body;
    orderEmployees.push(id);
    const perms = ["admin", "employee"];

    console.log(`Zakończenie zamówienia na: ${position}`);
    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      // getEmployees by orderEmployeesIds

      // getOrder by id

      // if isOrderCompleted set isLostElements to false

      // get right items to statistics and clone order to add to stats? or maybe first update stats and after that update order fields?

      // handle elements to correct

      // handle lost Elements

      // update order state

      // update order production and inProduction field

      // set last operation

      // update production history

      // update employee statistics

      // update production statistics
    } catch (error) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  reportLostElements: async (req, res) => {
    const { elements, position } = req.body;
    const { orderId } = req.params;
    const { id, permission } = req.user;
    const perms = ["admin", "employee"];

    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      let order = await getOrderById(orderId);
      const user = await getUserById(id);

      if (permission === "employee") {
        const employees = [`${user.firstname} ${user.surname}`];
        const quantity = elements.reduce((prev, curr) => {
          return prev + curr.quantity;
        }, 0);
        order = await updateProductionHistory(
          order,
          `Zgłoszenie braku ${quantity} elementu/ów`,
          position,
          employees,
          null
        );
      }
      if (permission === "admin") {
        order.items = order.items.map(item => {
          item.elementLost = {};
          return item;
        });
      }
      order = await setLostElements(order, elements);
      order.isLostElements = true;
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  reportElementsToCorrect: async (req, res) => {
    const {
      elements,
      position,
      whereElementsToCorrect,
      reasonOfComplaint
    } = req.body;
    const { id, permission } = req.user;
    const { orderId } = req.params;
    const perms = ["admin", "employee"];

    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      let order = await getOrderById(orderId);
      const user = await getUserById(id);

      if (permission === "admin") {
        order.items = order.items.map(item => {
          item.elementToCorrect = {};
          return item;
        });
      }

      order = await setElementsToCorrect(
        order,
        elements,
        whereElementsToCorrect
      );

      order = await addProductionStatus(order, whereElementsToCorrect);

      const numberOfElements = elements.reduce(
        (prev, curr) => prev + curr.quantity,
        0
      );
      const employees = [`${user.firstname} ${user.surname}`];
      const desc = `Zgłoszenie ${numberOfElements} elementów do poprawy. (${reasonOfComplaint})`;

      order = await updateProductionHistory(
        order,
        desc,
        position || "Biuro",
        employees,
        null
      );

      if (permission !== "admin") {
        await updateProductionStatistics(
          order,
          desc,
          null,
          elements,
          position,
          [user],
          reasonOfComplaint
        );
      }
      await order.save();

      return res.json(order);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { update };
