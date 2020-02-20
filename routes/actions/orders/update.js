// *
const addProductionStatus = async (order, productionStatus) => {
  const stateArray = order.productionStatus.trim().split(" ");
  if (!stateArray.includes(productionStatus)) {
    stateArray.push(productionStatus);
  }
  order.productionStatus = stateArray.join(" ").trim();
  return order;
};

// *
const updateOrderHistory = async (order, user, what, desc) => {
  const userName = `${user.firstname} ${
    user.company ? user.company : user.surname
  }`;

  const obj = {
    user: userName,
    date: new Date(),
    key: what,
    desc
  };

  order.updateHistory.push(obj);
  return order;
};

// *
const updateProductionHistory = async (
  order,
  desc,
  position,
  employees,
  time = null
) => {
  const obj = {
    date: new Date(),
    desc,
    position,
    time,
    employees
  };
  order.productionHistory.push(obj);
  return order;
};

// *
const startProduction = async (order, position) => {
  let production = order.production[position.toLowerCase()];
  if (!production.length || production[production.length - 1].timeStop) {
    production.push({ timeStart: new Date() });
  }
  order.production[position.toLowerCase()] = production;
  return order;
};

// *
const endProduction = async (order, employees = []) => {
  Object.keys(order.production).forEach(key => {
    const item = order.production[key];
    if (item.length && !item[item.length - 1].hasOwnProperty("timeStop")) {
      item[item.length - 1].timeStop = new Date();
      item[item.length - 1].employees = employees;
    }
    order.production[key] = item;
  });
  return order;
};

// *
const getWorkTimeFromProduction = async (order, position) => {
  const production = order.production[position.toLowerCase()];
  const { timeStart, timeStop } = production[production.length - 1];
  const time = timeStop - timeStart;
  return new Date(time);
};

// *
const addProductionComment = async (order, position, comment) => {
  const obj = {
    date: new Date(),
    position,
    comment
  };
  order.employeesComments.push(obj);
  return order;
};

// *
const updateManHours = async (order, hours, price, discount) => {
  const manHoursPrice = hours * (price - discount);
  const obj = {
    hours,
    price: manHoursPrice
  };
  order.manHours = obj;
  return order;
};

// *
const setLostElements = async (order, lostElements) => {
  order.items = order.items.map(item => {
    lostElements.forEach(element => {
      if (element._id.toString() === item._id.toString()) {
        item.elementToCorrect = {};
        item.elementLost = {
          position: element.name,
          quantity: element.quantity
        };
      }
    });
    return item;
  });
  return order;
};

// *
const setElementsToCorrect = async (order, elements, position) => {
  order.items = order.items.map(item => {
    const { _id: itemId } = item;
    elements.forEach(element => {
      const { _id: elementId } = element;
      if (elementId === itemId.toString()) {
        item.elementLost = {};
        item.elementToCorrect = {
          position,
          quantity: element.quantity
        };
      }
    });
    return item;
  });
  return order;
};

// *
const setInProductionField = async (order, position, type = "add") => {
  if (type === "add") {
    if (!order.inProduction.includes(position))
      order.inProduction.push(position);
  } else if (type === "remove") {
    order.inProduction = order.inProduction.filter(item => item !== position);
  }
  return order;
};

// *
const incrementOrderNumber = async (number, orders) => {
  let numbersArr = orders.map(item => item.number);
  if (number.toString().includes(".")) {
    const firstNumber = number.split(".")[0];
    let letter;
    if (number.includes("P")) letter = "P";
    if (number.includes("R")) letter = "R";
    if (number.includes("D")) letter = "D";
    let simmilarNumbers = numbersArr.filter(item =>
      item.includes(`.${letter}`)
    );
    let secondNumber = 0;
    simmilarNumbers.forEach(item => {
      if (item[item.length - 1] === letter) return;
      if (item[item.length - 1] >= secondNumber)
        secondNumber = item[item.length - 1];
    });
    secondNumber = parseInt(secondNumber, 10) + 1;
    return `${firstNumber}.${letter}${secondNumber}`;
  } else {
    numbersArr = numbersArr.map(nr => parseInt(nr, 10));
    let largestNumber = 0;
    numbersArr.forEach(nr =>
      nr >= largestNumber
        ? (largestNumber = nr)
        : (largestNumber = largestNumber)
    );
    return (largestNumber += 1);
  }
};

// *
const changeImagesPath = async (
  orderOwnerId,
  orderNumber,
  items,
  customMilling
) => {
  items = items.map(item => {
    if (item.image.path) {
      let fileName = item.image.path.split("/");
      fileName = fileName[fileName.length - 1];
      item.image.path = `/${orderOwnerId}/${orderNumber}/${fileName}`;
      return item;
    } else {
      return item;
    }
  });
  if (customMilling.path) {
    let millingFileName = customMilling.path.split("/");
    millingFileName = millingFileName[millingFileName.length - 1];
    customMilling.path = `/${orderOwnerId}/${orderNumber}/${millingFileName}`;
  }

  return { items, customMilling };
};

module.exports = {
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
  getWorkTimeFromProduction,
  incrementOrderNumber,
  changeImagesPath
};
