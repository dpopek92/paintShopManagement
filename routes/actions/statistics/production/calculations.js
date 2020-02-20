// *
const getMonthSummary = async orders => {
  const customers = {};
  const ordersValues = {
    surfaceCnc: 0,
    surfaceFlat: 0,
    surfacePL: 0,
    surfaceGloss: 0,
    surfaceSemigloss: 0,
    surfacePP: 0,
    surfaceVeneers: 0,
    milledHandle: 0,
    milledPartHandle: 0,
    hingesHoles: 0,
    customerMaterial: 0,
    surfaceSummary: 0,
    price: 0
  };
  const reclamations = {
    customerFault: 0,
    customerFaultElements: 0,
    blowFault: 0,
    blowFaultElements: 0
  };
  const reclamationReasons = {};

  if (orders) {
    orders.forEach(item => {
      const orderSurface = item.surfaceLeft + item.surfaceRight;
      //UPDATE CUSTOMER DATA
      const customer = item.user.company + " - " + item.user.firstname[0];
      if (!customers[customer]) {
        customers[customer] = {
          id: item.user._id,
          name: customer,
          ordersCount: 0,
          ordersSurface: 0,
          ordersPrice: 0
        };
      }
      if (
        item.orderType !== "Reklamacja (wina BLOW)" &&
        item.orderType !== "Poprawa (wina klienta)"
      ) {
        customers[customer].ordersCount += 1;
        customers[customer].ordersSurface +=
          item.surfaceLeft + item.surfaceRight;
        customers[customer].ordersPrice += item.price;

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
          reclamations.blowFault += orderSurface;
          reclamations.blowFaultElements += item.elements;

          if (item.reasonOfComplaint) {
            if (reclamationReasons[item.reasonOfComplaint]) {
              reclamationReasons[item.reasonOfComplaint] += orderSurface;
            } else {
              reclamationReasons[item.reasonOfComplaint] = orderSurface;
            }
          }
        } else if (item.orderType === "Poprawa (wina klienta)") {
          reclamations.customerFault += orderSurface;
          reclamations.customerFaultElements += item.elements;
        }
      }
    });
  }

  const data = { customers, ordersValues, reclamations, reclamationReasons };
  return data;
};

module.exports = { getMonthSummary };
