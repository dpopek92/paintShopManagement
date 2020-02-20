const { isObjectEmpty } = require("../../helpers/functions");

const getSurfacesValuesFromOrder = async (items, position) => {
 //returns the surface values of individual types of fronts (milling/flat/oneSide/bothSides)

 console.log(
  "WYCIAGANIE POWIERZCHNI KONKRETNYCH RODZAJOW ELEMENTOW - pozycji",
  items.length
 );

 const surfacesValues = {
  flatOneSide: 0,
  flatBothSides: 0,
  cncOneSide: 0,
  cncBothSides: 0
 };

 items.forEach(item => {
  if (item.type === "Gładki") {
   if (item.surfaceRight) {
    if (
     !isObjectEmpty(item.elementToCorrect) &&
     item.elementToCorrect.position === position
    ) {
     const singleElementSurface = item.surfaceRight / item.quantity;
     const surface = singleElementSurface * item.elementToCorrect.quantity;
     surfacesValues.flatOneSide += surface;
    } else if (
     !isObjectEmpty(item.elementLost) &&
     item.elementLost.position === position
    ) {
     const singleElementSurface = item.surfaceRight / item.quantity;
     const surface = singleElementSurface * item.elementLost.quantity;
     surfacesValues.flatOneSide += surface;
    } else {
     surfacesValues.flatOneSide += item.surfaceRight;
    }
   } else if (item.surfaceLeft) {
    if (
     !isObjectEmpty(item.elementToCorrect) &&
     item.elementToCorrect.position === position
    ) {
     const singleElementSurface = item.surfaceLeft / item.quantity;
     const surface = singleElementSurface * item.elementToCorrect.quantity;
     surfacesValues.flatBothSides += surface;
    } else if (
     !isObjectEmpty(item.elementLost) &&
     item.elementLost.position === position
    ) {
     const singleElementSurface = item.surfaceLeft / item.quantity;
     const surface = singleElementSurface * item.elementLost.quantity;
     surfacesValues.flatBothSides += surface;
    } else {
     surfacesValues.flatBothSides += item.surfaceLeft;
    }
   }
  } else {
   if (item.surfaceRight) {
    if (
     !isObjectEmpty(item.elementToCorrect) &&
     item.elementToCorrect.position === position
    ) {
     const singleElementSurface = item.surfaceRight / item.quantity;
     const surface = singleElementSurface * item.elementToCorrect.quantity;
     surfacesValues.cncOneSide += surface;
    } else if (
     !isObjectEmpty(item.elementLost) &&
     item.elementLost.position === position
    ) {
     const singleElementSurface = item.surfaceRight / item.quantity;
     const surface = singleElementSurface * item.elementLost.quantity;
     surfacesValues.cncOneSide += surface;
    } else {
     surfacesValues.cncOneSide += item.surfaceRight;
    }
   } else if (item.surfaceLeft) {
    if (
     !isObjectEmpty(item.elementToCorrect) &&
     item.elementToCorrect.position === position
    ) {
     const singleElementSurface = item.surfaceLeft / item.quantity;
     const surface = singleElementSurface * item.elementToCorrect.quantity;
     surfacesValues.cncBothSides += surface;
    } else if (
     !isObjectEmpty(item.elementLost) &&
     item.elementLost.position === position
    ) {
     const singleElementSurface = item.surfaceLeft / item.quantity;
     const surface = singleElementSurface * item.elementLost.quantity;
     surfacesValues.cncBothSides += surface;
    } else {
     surfacesValues.cncBothSides += item.surfaceLeft;
    }
   }
  }
 });

 console.log("surfacesValues", surfacesValues);

 return surfacesValues;
};

/**
|--------------------------------------------------
| FOR GET RIGHT ITEMS
|--------------------------------------------------
*/
//----check is order has lost/to correct elements at current position, or is all elements are made on current position
const isOrderIsCorrectedAtPosition = async (items, position) => {
 return await items.some(item => {
  if (!isObjectEmpty(item.elementToCorrect)) {
   if (item.elementToCorrect.position === position) {
    return true;
   } else return false;
  } else return false;
 });
};

const isLostItemstAreInProductionAtPosition = async (order, position) => {
 return await order.items.some(item => {
  if (!isObjectEmpty(item.elementLost) && !order.isLostElements) {
   if (item.elementLost.position === position) {
    return true;
   } else return false;
  } else return false;
 });
};

const allItemsAreMade = async (order, position, orderState) => {
 //wykonywane są wszystkie elementy kiedy status jest pojedyńczy && nie ma brakujących elementów lub są już odnalezione i są na aktualnej pozycji && nie ma poprawek lub są na aktualnej pozycji

 const orderStateArr = orderState.split(" ");

 const lostItemsFoundedAndOnCurrentState = order.items.every(item => {
  if (isObjectEmpty(item.elementLost)) return true;
  else if (item.elementLost.position === position && !order.isLostElements)
   return true;
 });

 const itemsToCorrectAreMadeOnThisPosition = order.items.every(item => {
  if (isObjectEmpty(item.elementToCorrect)) return true;
  else item.elementToCorrect.position === position;
  return true;
 });

 if (
  orderStateArr.length === 1 &&
  lostItemsFoundedAndOnCurrentState &&
  itemsToCorrectAreMadeOnThisPosition
 )
  return true;
 else return false;
};

//----get appropriate items: repaired, lost, others
const getRepairedItemsAtPosition = async (items, position) => {
 const repairedItems = [];

 await items.forEach(item => {
  if (
   !isObjectEmpty(item.elementToCorrect) &&
   item.elementToCorrect.position === position
  ) {
   return repairedItems.push(item);
  }
 });
 //  console.log(repairedItems.length);
 return repairedItems;
};

const getLostElementsAtPosition = async (order, position) => {
 // console.log("getLostElements");
 const lostElements = [];

 await order.items.forEach(item => {
  if (
   !isObjectEmpty(item.elementLost) &&
   !order.isLostElements &&
   item.elementLost.position === position
  ) {
   return lostElements.push(item);
  }
 });
 //  console.log(lostElements);
 return lostElements;
};

const getNotRepairedAndNotLostItemsAtPosition = async items => {
 //  console.log("getNotReapiredAndNotLostItems");
 const notRepairedItems = [];

 await items.forEach(item => {
  if (isObjectEmpty(item.elementToCorrect) && isObjectEmpty(item.elementLost)) {
   return notRepairedItems.push(item);
  }
 });

 return notRepairedItems;
};

const getHalfGridedItems = async order => {
 const edge = [order.paintType === "Połysk" ? "R2" : "R1", "-"];
 const halfGridedItems = [];

 order.items.forEach(item => {
  if (item.type !== "Gładki") {
   return halfGridedItems.push(item);
  } else if (order.handleSymbol1 || order.handleSymbol1) {
   if (
    !edge.includes(item.h1PEdge) ||
    !edge.includes(item.h2PEdge) ||
    !edge.includes(item.w1PEdge) ||
    !edge.includes(item.w2PEdge)
   ) {
    return halfGridedItems.push(item);
   }
  }
 });
 return halfGridedItems;
};

//Jeżeli zamówienie wychodzi z podkłady lub szlifierni i oznaczony jest przeszlif, bierze tylko elementy frezowane lub z uchwytami
//jeżeli całe zamówienie jest na stanowisku, nie ma poprawek lub ma je na tym stanowisku, nie ma braków lub ma je na tym stanowisku, bierze wszystkie elementy
//jeżeli całe zamówienie jest na stanowisku, ma braki ale nie odnalezione, bierze wszystkie elementy poza brakami

//ZAMÓWIENIE NA KILKU STANOWISKACH JEDNOCZESNIE
//jeżeli zamówienie jest poprawiane na aktualnym stanowisku, bierze tylko poprawki (i ewentualne odnalezione braki)
//jeżeli zamówienie ma odnalezione braki na aktualnym stanowisku, bierze tylko braki
//jeżeli lakiernia odda elementy 2stronne na szlifiernię, lakiernia bierze wszyskie elementy, szlifiernia od tej pory tylko 2 stronne, pozostałe stanowiska tylko jednostronne, lakiernia za 2 razem bierze tylko 2stronne i odznacza isLeftSides
//w pozostałych przypadkach brane jest wszystko poza brakami i poprawkami
const getRightItems = async (
 order,
 position,
 orderState,
 isHalfGriding = false
) => {
 console.log("---USTALANIE WYKONYWANYCH ELEMENTÓW---");
 const orderStateArr = orderState.split(" ");

 let rightItems = [];
 let desc = "";

 if (isHalfGriding && (position === "Podkład" || position === "Szlifiernia")) {
  rightItems = await getHalfGridedItems(order);
  desc = `Przeszlif ${rightItems.length} pozycji`;
  console.log(desc, `: ${rightItems.length}`);
 } else if (await allItemsAreMade(order, position, orderState)) {
  //  wykonywane są wszystkie elementy
  rightItems = order.items;
  desc = `Wykonanie wszystkich elementów`;
  console.log(desc, `: ${rightItems.length}`);
 } else {
  if (orderStateArr.length === 1 && order.isLostElements) {
   //wszsytkie elemnety poza brakującymi (całe zamówienie na aktualnym stanowisku)
   order.items.forEach(item => {
    if (isObjectEmpty(item.elementLost)) return rightItems.push(item);
   });
   desc = `Wykonanie wszystkich elementów, poza brakującymi`;
   console.log(desc, `: ${rightItems.length}`);
  } else if (orderStateArr.length > 1) {
   if (await isOrderIsCorrectedAtPosition(order.items, position)) {
    //Tylko poprawki
    rightItems = await getRepairedItemsAtPosition(order.items, position);
    desc = `Wykonanie elementów poprawianych`;
    console.log(desc, `: ${rightItems.length}`);
    if (await isLostItemstAreInProductionAtPosition(order, position)) {
     //+ braki
     rightItems = await rightItems.concat(
      getLostElementsAtPosition(order, position)
     );
     desc = `Wykonanie elementów poprawianych i brakujących`;
     console.log(desc, `: ${rightItems.length}`);
    }
   } else if (await isLostItemstAreInProductionAtPosition(order, position)) {
    //tylko braki
    rightItems = await getLostElementsAtPosition(order, position);
    desc = `Wykonanie elementów brakujących`;
    console.log(desc, `: ${rightItems.length}`);
   } else if (order.isLeftSidesInProduction) {
    if (position === "Szlifiernia" || position === "Lakiernia") {
     order.items.forEach(item => {
      if (item.surfaceLeft) return rightItems.push(item);
     });
     desc = `Wykonanie elementów obustronnych`;
     console.log(desc, `: ${rightItems.length}`);
    } else if (position === "Polernia" || position === "Pakowanie") {
     order.items.forEach(item => {
      if (item.surfaceRight) return rightItems.push(item);
     });
     desc = `Wykonanie elementów jednostronnych`;
     console.log(desc, `: ${rightItems.length}`);
    }
   } else {
    //wszystko poza brakami i poprawkami
    rightItems = await getNotRepairedAndNotLostItemsAtPosition(
     order.items,
     position
    );
    desc = `Wykonanie wszystkich elementów poza brakującymi i poprawkami`;
    console.log(desc, `: ${rightItems.length}`);
   }
  }
 }
 //  console.log(rightItems.length);
 return { rightItems, desc };
};

module.exports = {
 getSurfacesValuesFromOrder,
 getRightItems
};
