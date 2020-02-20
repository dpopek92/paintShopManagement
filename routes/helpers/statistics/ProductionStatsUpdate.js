const StatsProduction = require("../../../models/StatsProduction");
const Orders = require("../../../models/Orders");

const ProductionStatsUpdate = async (
 position,
 elementToCorrect,
 items = null,
 employees,
 order
) => {
 // console.log(items && items.length);
 // console.log(position);
 // console.log(elementToCorrect);

 //data
 const date = new Date();
 const day = date.getDate() - 1;
 const month = date.getMonth() + 1;
 const year = date.getFullYear();

 // console.log("day", day);

 // statsemployees

 // console.log("month", month);
 // console.log("year", year);

 // let productionStats = await StatsProduction.findOne({ year, month });
 // if (!productionStats) {
 //  productionStats = new StatsProduction({ year, month });
 //  console.log("notExist");
 // }

 // if (!productionStats.days[day]) {
 //  productionStats.days[day] = {
 //   nowe: {},
 //   surówka: {},
 //   podkład: {},
 //   szlifiernia: {},
 //   lakiernia: {},
 //   polernia: {},
 //   pakowanie: {},
 //   odebrane: {}
 //  };
 // }

 let fieldToUpdate = productionStats.days[day][position.toLowerCase()];
 if (!fieldToUpdate.employees) fieldToUpdate.employees = [];
 if (!fieldToUpdate.orders) fieldToUpdate.orders = [];
 if (!fieldToUpdate.flatOneSide) fieldToUpdate.flatOneSide = 0;
 if (!fieldToUpdate.flatBothSides) fieldToUpdate.flatBothSides = 0;
 if (!fieldToUpdate.cncOneSide) fieldToUpdate.cncOneSide = 0;
 if (!fieldToUpdate.cncBothSides) fieldToUpdate.cncBothSides = 0;
 if (!fieldToUpdate.corrections) fieldToUpdate.corrections = 0;

 if (items) {
  items.forEach(item => {
   if (item.type === "Gładki") {
    // FLAT ELEMENT
    if (item.surfaceRight) {
     //ONE SIDE ELEMENT
     if (item.elementToCorrect && item.elementToCorrect.position === position) {
      const singleElementSurface = item.surfaceRight / item.quantity;
      const surface = singleElementSurface * item.elementToCorrect.quantity;
      fieldToUpdate.flatOneSide += surface;
     } else {
      fieldToUpdate.flatOneSide += item.surfaceRight;
     }
     // console.log("FLAT - PL");
    } else if (item.surfaceLeft) {
     //BOTH SIDES ELEMENT
     if (item.elementToCorrect && item.elementToCorrect.position === position) {
      const singleElementSurface = item.surfaceLeft / item.quantity;
      const surface = singleElementSurface * item.elementToCorrect.quantity;
      fieldToUpdate.flatBothSides += surface;
     } else {
      fieldToUpdate.flatBothSides += item.surfaceLeft;
     }
     // console.log("FLAT - PP");
    }
   } else {
    //CNC ELEMENT
    //ONE SIDE ELEMENT
    if (item.surfaceRight) {
     if (item.elementToCorrect && item.elementToCorrect.position === position) {
      const singleElementSurface = item.surfaceRight / item.quantity;
      const surface = singleElementSurface * item.elementToCorrect.quantity;
      fieldToUpdate.cncOneSide += surface;
     } else {
      fieldToUpdate.cncOneSide += item.surfaceRight;
     }
     // console.log("CNC - PL");
    } else if (item.surfaceLeft) {
     //BOTH SIDES ELEMENT
     if (item.elementToCorrect && item.elementToCorrect.position === position) {
      const singleElementSurface = item.surfaceLeft / item.quantity;
      const surface = singleElementSurface * item.elementToCorrect.quantity;
      fieldToUpdate.cncBothSides += surface;
     } else {
      fieldToUpdate.cncBothSides += item.surfaceLeft;
     }
     // console.log("CNC - PP");
    }
   }
  });
 }

 fieldToUpdate.corrections += elementToCorrect;

 //add employees
 // if (employees) {
 //  employees.forEach(item => {
 //   const employee = { id: item._id, name: `${item.firstname} ${item.surname}` };
 //   // console.log("x");
 //   const isEmployeeInArray = fieldToUpdate.employees.find(item => {
 //    return item.id.toString() === employee.id.toString();
 //   });
 //   // console.log("z");
 //   if (!isEmployeeInArray) {
 //    fieldToUpdate.employees.push(employee);
 //   }
 //  });
 // }

 //add order
 // if (order) {
 //  const orderToStat = {
 //   id: order._id,
 //   name: `${order.user.company}.${order.number}`
 //  };
 //  // console.log("y");
 //  const isOrderInArray = fieldToUpdate.orders.find(item => {
 //   return item.id.toString() === orderToStat.id.toString();
 //  });

 //  if (!isOrderInArray) {
 //   fieldToUpdate.orders.push(orderToStat);
 //  }
 // }

 productionStats.days[day][position.toLowerCase()] = fieldToUpdate;
 console.log("production - STATS UPDATE");
 // console.log(productionStats.days[day][position.toLowerCase()]);

 // return productionStats.days[day][position.toLowerCase()];

 productionStats.save();
};

module.exports = ProductionStatsUpdate;
