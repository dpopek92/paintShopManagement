const Timetable = require("../../../models/Timetable");

// *
const getAllTimetables = async () => {
  const timetables = await Timetable.find().populate({
    path: "days.orders",
    model: "order",
    select:
      "-items -production -manHours -customMilling -updateHistory -productionHistory",
    populate: {
      path: "user",
      model: "user",
      select: "_id company firstname"
    }
  });
  return timetables;
};

// *
const getTimetableForPosition = async position => {
  const timetable = await Timetable.findOne({ position }).populate({
    path: "days.orders",
    model: "order",
    select:
      "-items -production -manHours -customMilling -updateHistory -productionHistory",
    populate: {
      path: "user",
      model: "user",
      select: "_id company firstname"
    }
  });
  return timetable;
};

module.exports = { getAllTimetables, getTimetableForPosition };
