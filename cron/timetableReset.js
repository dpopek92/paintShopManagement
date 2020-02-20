const { getAllTimetables } = require("../routes/actions/timetable/get");
const { weekDays } = require("../routes/utils/const");

const timetableReset = async () => {
  try {
    console.log(" ");
    console.log("---===RESTART KALENDARZA==---");
    console.log(new Date());
    console.log(" ");

    const positions = await getAllTimetables();
    positions.forEach(async position => {
      const day1 = position.days[0];
      const day2 = position.days[1];
      day2.orders = day1.orders.concat(day2.orders);
      position.days.shift();

      const lastDay = position.days[position.days.length - 1];
      const lastDayDate = new Date(lastDay.date);
      const nextDayTime = lastDayDate.getTime() + 86400000;
      const nextDayDate = new Date(nextDayTime);
      const weekDay = weekDays[nextDayDate.getDay()];
      const obj = { date: nextDayDate, day: weekDay };
      position.days.push(obj);
      await position.save();
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

module.exports = timetableReset;
