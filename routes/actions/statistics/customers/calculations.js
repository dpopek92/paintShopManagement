// *
const customerSummary = async orders => {
  const ordersValues = {
    surfaceCnc: 0,
    surfaceFlat: 0,
    surfacePL: 0,
    surfacePP: 0,
    surfaceGloss: 0,
    surfaceSemigloss: 0,
    surfaceVeneers: 0,
    milledHandle: 0,
    milledPartHandle: 0,
    hingesHoles: 0,
    customerMaterial: 0,
    surfaceSummary: 0,
    reclamationsSurface: 0,
    reclamationsElements: 0,
    price: 0
  };

  if (orders) {
    orders.forEach(item => {
      const orderSurface = item.surfaceLeft + item.surfaceRight;

      if (item.orderType !== "Reklamacja (wina BLOW)") {
        //UPDATE ORDERS VALUES
        if (item.paintType === "Połysk") {
          ordersValues.surfaceGloss += orderSurface;
        } else {
          ordersValues.surfaceSemigloss += orderSurface;
        }
        if (item.surfaceRight) ordersValues.surfacePL += item.surfaceRight;
        if (item.surfaceLeft) ordersValues.surfacePP += item.surfaceLeft;
        if (item.surfaceCNC) {
          ordersValues.surfaceCnc += item.surfaceCNC;
          ordersValues.surfaceFlat += orderSurface - item.surfaceCNC;
        } else {
          ordersValues.surfaceFlat += orderSurface;
        }
        ordersValues.surfaceSummary += orderSurface;
        ordersValues.price += item.price;

        if (item.veneerSymbol) ordersValues.surfaceVeneers += orderSurface;
        if (item.milledHandle) ordersValues.milledHandle += item.milledHandle;
        if (item.milledPartHandle)
          ordersValues.milledPartHandle += item.milledPartHandle;
        if (item.hingesHoles) ordersValues.hingesHoles += item.hingesHoles;
        if (item.orderType === "Materiał klienta") {
          ordersValues.customerMaterial += orderSurface;
        }
      } else {
        if (item.orderType === "Reklamacja (wina BLOW)") {
          ordersValues.reclamationsSurface += orderSurface;
          ordersValues.reclamationsElements += item.elements;
        }
      }
    });
    return ordersValues;
  } else {
    throw "No orders";
  }
};

module.exports = { customerSummary };
