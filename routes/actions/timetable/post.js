const Timetable = require("../../../models/Timetable");
const { weekDays } = require("../../utils/const");

const createTimetable = async (position, date) => {
  console.log(`CREATE NEW TIMETABLE FOR: ${position}`);
  const timetable = new Timetable({ position });
  let currentDate = date.getTime();

  for (let i = 0; i < 14; i++) {
    const newDate = new Date(currentDate);
    const weekDay = weekDays[newDate.getDay()];
    timetable.days.push({ date: newDate, day: weekDay });

    currentDate = currentDate + 86400000;
  }
  await timetable.save();
  return;
};

module.exports = { createTimetable };
