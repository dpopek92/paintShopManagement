const { findProductionDocument } = require("./get");
const { getSurfacesValuesFromOrder } = require("../../orders/items");
const { reasonsOfComplaint } = require("../../../const/index");

// TO CORRECT
const updateSufacesInDocument = async (document, surfaces, position, day) => {
  if (!document.days[day]) {
    document.days[day] = {
      nowe: { orders: [] },
      surówka: { orders: [], employees: [] },
      podkład: { orders: [], employees: [] },
      szlifiernia: { orders: [], employees: [] },
      lakiernia: { orders: [], employees: [] },
      polernia: { orders: [], employees: [] },
      pakowanie: { orders: [], employees: [] },
      odebrane: { orders: [] }
    };
  }
  let fieldToUpdate = document.days[day][position.toLowerCase()];
  if (!fieldToUpdate.flatOneSide) fieldToUpdate.flatOneSide = 0;
  if (!fieldToUpdate.flatBothSides) fieldToUpdate.flatBothSides = 0;
  if (!fieldToUpdate.cncOneSide) fieldToUpdate.cncOneSide = 0;
  if (!fieldToUpdate.cncBothSides) fieldToUpdate.cncBothSides = 0;

  for (const key in surfaces) {
    if (surfaces.hasOwnProperty(key)) {
      const element = surfaces[key];

      fieldToUpdate[key] += element;
      console.log(`Wartość w statystykach - ${key}:`, fieldToUpdate[key]);
    }
  }

  document.days[day][position.toLowerCase()] = fieldToUpdate;
  await document.save();
  return document;
};

const updateEmployeesInStats = async (document, position, day, employees) => {
  const employeesArray = document.days[day][position.toLowerCase()].employees
    ? document.days[day][position.toLowerCase()].employees
    : [];

  // console.log(employees);

  employees.forEach(item => {
    const employee = {
      id: item._id,
      name: `${item.firstname} ${item.surname}`
    };
    // console.log(employee);
    const isEmployeeInArray = employeesArray.find(item => {
      console.log(item);
      console.log(employee);
      return item.id.toString() === employee.id.toString();
    });
    if (!isEmployeeInArray) {
      employeesArray.push(employee);
    }
  });

  document.days[day][position.toLowerCase()].employees = employeesArray;
  return document;
};

const updateOrdersInStats = async (
  document,
  position,
  day,
  order,
  desc,
  surfaces = null
) => {
  //update zamówień w statystykach produkcyjnych
  // console.log(position);
  const ordersArray = document.days[day][position.toLowerCase()].orders
    ? document.days[day][position.toLowerCase()].orders
    : [];

  const orderToStat = {
    id: order._id,
    desc: `${desc}${surfaces ? " " + surfaces + "m2" : ""}`
  };

  ordersArray.push(orderToStat);

  document.days[day][position.toLowerCase()].orders = ordersArray;
  return document;
};

const updateCorrections = async (
  document,
  order,
  elementsToCorrect,
  position,
  reasonOfComplaint,
  day
) => {
  // update number of correcred items
  let numberOfelements = 0;
  elementsToCorrect.forEach(
    item => (numberOfelements += parseInt(item.quantity, 10))
  );
  document.days[day][position.toLowerCase()].corrections += numberOfelements;
  // console.log(elementsToCorrect);

  const correctionsData =
    document.days[day][position.toLowerCase()].correctionsData;
  // console.log(correctionsData);

  //get surface value
  let surfaceValue = 0;
  order.items.forEach(item => {
    elementsToCorrect.forEach(element => {
      if (element._id.toString() === item._id.toString()) {
        // console.log("elementFound");
        surfaceValue +=
          ((item.surfaceRight || item.surfaceLeft) / item.quantity) *
          element.quantity;
      }
    });
  });

  let reason = "other";
  reasonsOfComplaint.forEach(item => {
    if (item.type === reasonOfComplaint) {
      reason = item.name;
    }
  });

  // console.log(reason);
  // console.log(reasonOfComplaint);
  //set surface vlaue and elements number in reason object
  correctionsData.reasons[reason].surface = surfaceValue;
  correctionsData.reasons[reason].elements = numberOfelements;
  correctionsData.surface += surfaceValue;

  // console.log(correctionsData);
  return document;
};

const updateProductionStatistics = async (
  order,
  desc,
  items,
  elementsToCorrect,
  position,
  employees,
  reasonOfComplaint = null
) => {
  console.log(" ");
  console.log("---UPDATE STATYSTYK PRODUKCJI---");
  const date = new Date();
  const day = date.getDate() - 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  console.log(position);

  try {
    let document = await findProductionDocument(year, month);
    let allSurfaces = 0;

    if (items) {
      const surfaces = await getSurfacesValuesFromOrder(items, position);
      for (const key in surfaces) {
        if (surfaces.hasOwnProperty(key)) {
          const element = surfaces[key];
          allSurfaces += element;
        }
      }
      document = await updateSufacesInDocument(
        document,
        surfaces,
        position,
        day
      );
    }
    if (employees) {
      document = await updateEmployeesInStats(
        document,
        position,
        day,
        employees
      );
    }
    if (order) {
      allSurfaces === 0 ? (allSurfaces = null) : (allSurfaces = allSurfaces);
      document = await updateOrdersInStats(
        document,
        position,
        day,
        order,
        desc,
        (surfaces = allSurfaces && allSurfaces.toFixed(2))
      );
    }
    if (elementsToCorrect) {
      document = await updateCorrections(
        document,
        order,
        elementsToCorrect,
        position,
        reasonOfComplaint,
        day
      );
    }

    await document.save();
    return document;
  } catch (error) {
    console.log(error);
  }
};

// AFTER REFACTOR

module.exports = { updateProductionStatistics };
