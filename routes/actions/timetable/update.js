//*
const updateOrdersInDay = async (timetable, dayId, orders) => {
  timetable.days = timetable.days.map(day => {
    if (day._id.toString() === dayId) {
      day.orders = orders;
      //   console.log(day);
    }
    return day;
  });
  return timetable;
};

//*
const addOrderToDay = async (timetable, date, order) => {
  timetable.days = timetable.days.map(day => {
    const dayDate = new Date(day.date);
    if (
      dayDate.getDate() === date.getDate() &&
      dayDate.getMonth() === date.getMonth()
    ) {
      if (
        !day.orders.find(
          dayOrder => dayOrder._id.toString() === order.toString()
        )
      ) {
        day.orders.push(order);
      }
    }
    return day;
  });
  return timetable;
};

//*
const removeOrderFromDay = async (timetable, orderId) => {
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
  return timetable;
};

// *
const removeOrderFromDays = (days, orderId) => {
  return days.map(day => {
    day.orders = day.orders.filter(
      order => order._id.toString() !== orderId.toString()
    );
    return day;
  });
};

module.exports = {
  removeOrderFromDays,
  updateOrdersInDay,
  addOrderToDay,
  removeOrderFromDay
};
