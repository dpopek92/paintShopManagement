const { getOrderById } = require("./get");
const _ = require("lodash");
const { updateProductionHistory } = require("./update");
const { getEmployees } = require("../employees/get");
const { getTimetableForPosition } = require("../timetable/get");
const { updateEmployeeStatistics } = require("../statistics/employees/update");
const {
  updateProductionStatistics
} = require("../statistics/production/update");
const { isObjectEmpty } = require("../../helpers/functions");
const { getRightItems } = require("./items");
const _states = [
  "Surówka",
  "Podkład",
  "Szlifiernia",
  "Lakiernia",
  "Polernia",
  "Pakowanie",
  "Zakończone"
];

//---Elements lost and elements to correct handle
const isLostElementsAtPosition = async (order, position) => {
  return await order.items.some(item => {
    if (
      !isObjectEmpty(item.elementLost) &&
      item.elementLost.position === position
    ) {
      return true;
    }

    return false;
  });
};

const isElementsToCorrectAtPosition = async (order, position) => {
  return await order.items.some(item => {
    if (
      !isObjectEmpty(item.elementToCorrect) &&
      item.elementToCorrect.position === position
    ) {
      return true;
    }

    return false;
  });
};

const handleElemetsToCorrect = async (order, position) => {
  const stateArray = order.productionStatus.split(" ");
  const statesIndex = _states.indexOf(position);

  if (await isElementsToCorrectAtPosition(order, position)) {
    let items;

    items = order.items.map(item => {
      if (
        !isObjectEmpty(item.elementToCorrect) &&
        item.elementToCorrect.position === order.productionStatus.trim()
      ) {
        console.log("Usuwanie informacji o elemencie do poprawy");
        item.elementToCorrect = undefined;
      } else if (
        !isObjectEmpty(item.elementToCorrect) &&
        item.elementToCorrect.position === position
      ) {
        console.log("Zmiana stanowiska elementu do poprawy");
        if (position === "Surówka" && order.veneerSymbol) {
          item.elementToCorrect.position = _states[statesIndex + 3];
        } else if (position === "Lakiernia" && order.paintType !== "Połysk") {
          item.elementToCorrect.position = _states[statesIndex + 2];
        } else {
          item.elementToCorrect.position = _states[statesIndex + 1];
        }
      }
      return item;
    });

    order.items = items;
  }
  return order;
};

const handleLostElements = async (order, position) => {
  const statesIndex = _states.indexOf(position);

  if (await isLostElementsAtPosition(order, position)) {
    let items = await order.items.map(item => {
      if (
        !isObjectEmpty(item.elementLost) &&
        item.elementLost.position === position &&
        item.elementLost.position === order.productionStatus.trim() &&
        !order.isLostElements
      ) {
        console.log("Usuwanie informacji z elementu zagubionego");
        item.elementLost = undefined;
      } else if (
        !isObjectEmpty(item.elementLost) &&
        item.elementLost.position === position &&
        !order.isLostElements
      ) {
        console.log("Zmiana stanowiska elementu zagubionego");
        if (position === "Surówka" && order.veneerSymbol) {
          item.elementLost.position = _states[statesIndex + 3];
        } else if (position === "Lakiernia" && order.paintType !== "Połysk") {
          item.elementLost.position = _states[statesIndex + 2];
        } else {
          item.elementLost.position = _states[statesIndex + 1];
        }
      }
      return item;
    });
    order.items = items;
  }
  return order;
};

//---Order status handle
const removeCurrentStateFromOrder = async (order, position) => {
  const stateArray = order.productionStatus.split(" ");
  const indexInStateArray = stateArray.indexOf(position);

  return await isLostElementsAtPosition(order, position).then(
    isLostElementsAtPosition => {
      //kasujemy aktualny status jeżeli nie ma zgłoszonych braków na danym stanowisku, albo jeżeli są, ale w zamówieniu odznaczone jest że elementy się znalazły.
      // console.log("isLostElementsAtPosition", isLostElementsAtPosition);
      if (
        !isLostElementsAtPosition ||
        (isLostElementsAtPosition && !order.isLostElements)
      ) {
        console.log("Usuwanie aktualnego statusu");
        stateArray.splice(indexInStateArray, 1);
      }
      order.productionStatus = stateArray.join(" ").trim();
      // console.log("order.productionState", order.productionStatus);
      return order;
    }
  );
};

const addNextStateToOrder = async (order, position, isHalfGriding) => {
  console.log("Dodawanie kolejnego statusu");
  const stateArray = order.productionStatus.split(" ");
  const statesIndex = _states.indexOf(position);
  if (isHalfGriding) {
    if (position === "Podkład") {
      if (!stateArray.includes(position)) {
        stateArray.push(position);
      }
      if (!stateArray.includes(_states[statesIndex + 1])) {
        stateArray.push(_states[statesIndex + 1]);
      }
      order.isHalfGriding = true;
    } else if (position === "Szlifiernia") {
      if (!stateArray.includes(_states[statesIndex - 1])) {
        stateArray.push(_states[statesIndex - 1]);
      }
      order.isHalfGriding = false;
    } else if (position === "Lakiernia") {
      order.forwardToGriding += 1;
      if (!order.veneerSymbol) {
        //All elements are both sides painted (order go to prev pos)
        if (order.surfaceLeft && !order.surfaceRight) {
          if (!stateArray.includes(_states[statesIndex - 1])) {
            stateArray.push(_states[statesIndex - 1]);
          }
        } else {
          //Not all elements are both sides painted (order go to prev&next pos)
          if (!stateArray.includes(_states[statesIndex - 1])) {
            stateArray.push(_states[statesIndex - 1]);
          }
          if (order.paintType === "Połysk") {
            if (!stateArray.includes(_states[statesIndex + 1])) {
              stateArray.push(_states[statesIndex + 1]);
            }
          } else {
            if (!stateArray.includes(_states[statesIndex + 2])) {
              stateArray.push(_states[statesIndex + 2]);
            }
          }
        }
      } else {
        if (!stateArray.includes(_states[statesIndex - 1])) {
          stateArray.push(_states[statesIndex - 1]);
        }
      }
    }
  } else {
    if (position === "Surówka" && order.veneerSymbol) {
      if (!stateArray.includes(_states[statesIndex + 3])) {
        stateArray.push(_states[statesIndex + 3]);
      }
    } else if (position === "Lakiernia" && order.paintType !== "Połysk") {
      if (!stateArray.includes(_states[statesIndex + 2])) {
        stateArray.push(_states[statesIndex + 2]);
      }
    } else {
      if (!stateArray.includes(_states[statesIndex + 1])) {
        stateArray.push(_states[statesIndex + 1]);
      }
    }
  }
  order.productionStatus = stateArray.join(" ").trim();
  return order;
};

const updateOrderProduction = async (order, position, employeesIds) => {
  const date = new Date();
  const production = order.production[position.toLowerCase()];
  const employees = employeesIds.map(item => item._id);
  let timeStart, timeStop, workTime, time;
  if (
    production.length !== 0 &&
    production[production.length - 1].timeStart &&
    !production[production.length - 1].timeStop
  ) {
    production[production.length - 1].timeStop = date;
    production[production.length - 1].employees = employees;

    timeStart = production[production.length - 1].timeStart;
    timeStop = date;
    time =
      date.getTime() - production[production.length - 1].timeStart.getTime();
    workTime = new Date(time);

    order.production[position.toLowerCase()] =
      production[production.length - 1];
  }
  return { order, timeStart, timeStop, workTime };
};

const stopOrder = async (
  orderId,
  employeesIds,
  position,
  isHalfGriding,
  isOrderCompleted
) => {
  try {
    console.log(" ");
    console.log("---===STOP ORDER===---");
    const employees = await getEmployees(employeesIds);
    console.log("employees.length", employees.length);

    let itemsToStatistics, orderToStatistics, timeStart, timeStop, workTime;

    let order = await getOrderById(orderId);

    if (order) {
      if (isOrderCompleted) {
        order.isLostElements = false;
      }
      const rightItemsObj = await getRightItems(
        order,
        position,
        order.productionStatus.trim(),
        isHalfGriding
      );
      itemsToStatistics = _.cloneDeep(rightItemsObj.rightItems);
      const desc = rightItemsObj.desc;

      orderToStatistics = _.cloneDeep(order);
      if (position === "Lakiernia") {
        if (isHalfGriding) {
          order.isLeftSidesInProduction = true;
          order.wasInGriding = true;
        } else {
          order.isLeftSidesInProduction = false;
        }
      }
      await handleElemetsToCorrect(order, position);
      await handleLostElements(order, position);
      await removeCurrentStateFromOrder(order, position);
      await addNextStateToOrder(order, position, isHalfGriding);
      const obj = await updateOrderProduction(order, position, employeesIds);
      if (obj) {
        timeStart = obj.timeStart;
        timeStop = obj.timeStop;
        workTime = obj.workTime;
      }
      if (position === "Podkład" && isHalfGriding) {
        order.isHalfGriding = true;
      }
      if (position === "Szlifiernia") {
        if (isHalfGriding) {
          order.isHalfGriding = false;
        }
      }
      //remove position from 'inProduction' field
      const indexInProduction = order.inProduction.indexOf(`${position}`);
      order.inProduction.splice(indexInProduction, 1);
      //Set last operation
      if (
        position === "Podkład" ||
        position === "Szlifiernia" ||
        position === "Lakiernia"
      ) {
        const date = new Date();
        const lastOperation = { date, position };
        order.lastOperation = lastOperation;
      }
      await updateProductionStatistics(
        orderToStatistics,
        desc,
        itemsToStatistics,
        0,
        position,
        employees
      );
      const employeesArr = employees.map(
        item => `${item.firstname} ${item.surname}`
      );
      await updateProductionHistory(
        order,
        desc,
        position,
        employeesArr,
        workTime
      );
      await Promise.all(
        employees.map(employee =>
          updateEmployeeStatistics(
            employee,
            employees,
            orderToStatistics,
            desc,
            itemsToStatistics,
            timeStart,
            timeStop,
            position
          )
        )
      );
    }
    await order.save();

    // Update timetable
    const timetable = await getTimetableForPosition(position);
    const today = new Date();
    timetable.days = timetable.days.map(item => {
      const itemDate = new Date(item.date);

      if (
        itemDate.getDate() === today.getDate() &&
        itemDate.getMonth() === today.getMonth()
      ) {
        console.log("---===Usuwanie z terminarza===---");
        item.orders = item.orders.filter(
          order => order._id.toString() !== orderId
        );
      }
      return item;
    });
    await timetable.save();

    return order;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { stopOrder };
