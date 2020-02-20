const { findEmployeeDocument } = require("./get");
const {
  getSurfacesValuesFromOrder,
  getRightItems
} = require("../../orders/items");
const { isObjectInArray } = require("../../../helpers/functions");

const updateTimeInStats = async (
  position,
  document,
  timeStart,
  timeStop,
  day
) => {
  //set begin and end of workday (start first and end last order)

  let currentDay = document.days[day][position.toLowerCase()];

  if (!currentDay) {
    currentDay = {
      timeStart,
      timeStop
    };
  } else {
    if (!currentDay.timeStart) currentDay.timeStart = timeStart;
    if (!currentDay.timeStop) currentDay.timeStop = timeStop;
    if (currentDay.timeStart > timeStart) {
      currentDay.timeStart = timeStart;
    }
    if (currentDay.timeStop < timeStop) {
      currentDay.timeStop = timeStop;
    }
  }

  document.days[day][position.toLowerCase()] = currentDay;

  await document.save();
  return document;
};

const updateOrdersInStats = async (
  document,
  order,
  allEmployees,
  day,
  desc,
  surfaces,
  position
) => {
  //sets completed orders in array

  const currentDay = document.days[day][position.toLowerCase()];
  const id = order._id;

  //  console.log(currentDay[position.toLowerCase()]);

  if (allEmployees.length === 1) {
    console.log(currentDay);
    currentDay.selfMadeOrders.push({
      id,
      desc: `${desc}${surfaces ? " " + surfaces + "m2" : ""}`
    });
  } else {
    const employeesArr = [];
    allEmployees.forEach(employee =>
      employeesArr.push({
        id: employee._id,
        name: `${employee.firstname} ${employee.surname}`
      })
    );
    currentDay.notSelfMadeOrders.push({
      id,
      desc: `${desc}${surfaces ? " " + surfaces + "m2" : ""}`,
      employees: employeesArr
    });
  }

  console.log(currentDay);
  document.days[day][position.toLowerCase()] = currentDay;
  await document.save();
  return document;
};

const updateSurfacesInDocument = async (
  document,
  items,
  position,
  allEmployees,
  day
) => {
  //adds values of completed items to statistics (by element type)
  //  console.log("updateSurfacesValues");

  const employees = allEmployees.length;
  const currentDay = document.days[day];
  const positionToUpdate = currentDay[position.toLowerCase()];
  let allSurfaces = 0;

  return getSurfacesValuesFromOrder(items)
    .then(surfaceValues => {
      for (const key in surfaceValues) {
        if (surfaceValues.hasOwnProperty(key)) {
          const value = surfaceValues[key];
          allSurfaces += value;
          positionToUpdate[key] += value / employees;
          console.log(
            `Wartość w statystykach - ${key}:`,
            positionToUpdate[key]
          );
        }
      }
      return positionToUpdate;
    })
    .then(async positionToUpdate => {
      document.days[day][position.toLowerCase()] = positionToUpdate;
      await document.save();
      return { document, allSurfaces };
    });
};

const updateEmployeeStatistics = async (
  employee,
  allEmployees,
  order,
  desc,
  items,
  timeStart,
  timeStop,
  position
) => {
  console.log(" ");
  console.log("---UPDATE STATYSTYK PRACOWNIKA---");

  //  console.log(position);
  //  console.log(desc);

  //data
  const date = new Date();
  const day = date.getDate() - 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  try {
    let document = await findEmployeeDocument(year, month, employee._id);
    if (document) {
      await updateTimeInStats(position, document, timeStart, timeStop, day);
      const obj = await updateSurfacesInDocument(
        document,
        items,
        position,
        allEmployees,
        day
      );
      await updateOrdersInStats(
        document,
        order,
        allEmployees,
        day,
        desc,
        (surface = obj.allSurfaces ? obj.allSurfaces.toFixed(2) : null),
        position
      );

      return document;
    }
  } catch (err) {
    console.log(err);
  }
};

// *
const updateWorkedHours = async (employees, data) => {
  Object.keys(data).map(key => {
    employees.forEach(async employee => {
      if (employee._id.toString() === key) {
        employee.workedHours = data[key].workedHours;
        await employee.save();
      }
    });
  });

  return data;
};

module.exports = { updateEmployeeStatistics, updateWorkedHours };
