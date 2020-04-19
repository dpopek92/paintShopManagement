const { checkIfOrderExist, getUserOrders } = require("./get");

const setNewOrderNumber = async (order, currentFreeNumber, ownerId) => {
  const { type } = order;
  const types = ["reklamacja", "domówienie", "poprawa"];
  let isOrder = await checkIfOrderExist(ownerId, currentFreeNumber);

  if (!types.includes(type)) {
    let number = currentFreeNumber;
    while (isOrder) {
      number += 1;
      isOrder = await checkIfOrderExist(ownerId, number);
    }
    return number;
  } else {
    let orders = await getUserOrders(ownerId);
    orders = orders.filter(order => order.type === type);

    const number = order.number;
    const letter = type[0];
    let count = 0;
    let newNumber = `${number}.${letter}`;
    let isOrder = orders.find(order => order.number === newNumber);
    while (isOrder) {
      count += 1;
      newNumber = `${number}.${letter}${count}`;
      isOrder = orders.find(order => order.number === newNumber);
    }
    return newNumber;
  }
};

module.exports = { setNewOrderNumber };
