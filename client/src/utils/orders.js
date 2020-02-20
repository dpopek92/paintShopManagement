export const isDeadlinePassed = date => {
 const currentDate = new Date();
 const deadline = new Date(date);

 return deadline < currentDate;
};

export const isOrderWetForStaticList = order => {
 const currentDate = Date.now();

 let dryTime;
 if (order.productionStatus !== "Zakończone") {
  if (order.paintType === "Połysk") {
   if (order.lastOperation) {
    if (order.lastOperation.position === "Lakiernia") {
     dryTime = 86400000;
     const timeStop = new Date(order.lastOperation.date).getTime();
     if (currentDate - timeStop < dryTime) {
      return true;
     }
    }
   }
  } else {
   if (order.lastOperation) {
    if (order.lastOperation.position === "Podkład") {
     if (!order.isHalfGriding) {
      dryTime = 28800000;
      const timeStop = new Date(order.lastOperation.date).getTime();
      if (currentDate - timeStop < dryTime) {
       return true;
      }
     } else {
      dryTime = 7200000;
      const timeStop = new Date(order.lastOperation.date).getTime();
      if (currentDate - timeStop < dryTime) {
       return true;
      }
     }
    } else if (order.lastOperation.position === "Lakiernia") {
     dryTime = 18000000;
     const timeStop = new Date(order.lastOperation.date).getTime();
     if (currentDate - timeStop < dryTime) {
      return true;
     }
    }
   }
  }
 }
 return false;
};

export const isOrderWetForDynamicList = (order, position) => {
 const currentDate = Date.now();
 let dryTime;
 if (order.productionStatus !== "Zakończone") {
  if (position === "Szlifiernia") {
   if (order.lastOperation) {
    if (order.lastOperation.position === "Podkład") {
     if (!order.isHalfGriding) {
      dryTime = 28800000;
      const timeStop = new Date(order.lastOperation.date).getTime();
      if (currentDate - timeStop < dryTime) {
       return true;
      }
     } else {
      dryTime = 7200000;
      const timeStop = new Date(order.lastOperation.date).getTime();
      if (currentDate - timeStop < dryTime) {
       return true;
      }
     }
    } else if (order.lastOperation.position === "Lakiernia") {
     dryTime = 18000000;
     const timeStop = new Date(order.lastOperation.date).getTime();
     if (currentDate - timeStop < dryTime) {
      return true;
     }
    }
   }
  } else if (position === "Polernia") {
   if (order.lastOperation) {
    if (order.lastOperation.position === "Lakiernia") {
     dryTime = 86400000;
     const timeStop = new Date(order.lastOperation.date).getTime();
     if (currentDate - timeStop < dryTime) {
      return true;
     }
    }
   }
  } else if (position === "Pakowanie") {
   if (order.lastOperation) {
    if (order.lastOperation.position === "Lakiernia") {
     dryTime = 18000000;
     const timeStop = new Date(order.lastOperation.date).getTime();
     if (currentDate - timeStop < dryTime) {
      return true;
     }
    }
   }
  }
 }
 return false;
};

export const isOrderNeedsToBeSandedAgain = order => {
 const currentDate = Date.now();

 let timeFromGriding;
 if (order.veneerSymbol) {
  return false;
 } else if (order.productionStatus.includes("Lakiernia")) {
  if (order.lastOperation) {
   if (order.lastOperation.position === "Szlifiernia") {
    timeFromGriding = 43200000;
    const timeStop = new Date(order.lastOperation.date).getTime();
    if (currentDate - timeStop > timeFromGriding) {
     // if (!order.productionStatus.includes("Szlifiernia")) {
     //  addOrderStatusByApp(order._id, "Szlifiernia");
     // }
     return true;
    }
   }
  }
 }
 return false;
};
