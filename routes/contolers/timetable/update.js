const {
  getTimetableForPosition,
  getAllTimetables
} = require("../../actions/timetable/get");
const {
  updateOrdersInDay,
  addOrderToDay,
  removeOrderFromDay,
  removeOrderFromDays
} = require("../../actions/timetable/update");
const { firstUpperCaseLetter } = require("../../utils/string");
const { weekDays } = require("../../utils/const");

const update = {
  dayOnPosition: async (req, res) => {
    const { position, dayId, orders } = req.body;
    try {
      console.log(" ");
      console.log(`Aktualizacja terminarza: ${position}`);
      console.log(" ");

      let timetable = await getTimetableForPosition(
        firstUpperCaseLetter(position)
      );

      timetable = await updateOrdersInDay(timetable, dayId, orders);
      await timetable.save();

      //   console.log(timetable);
      return res.json(timetable);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  addOrder: async (req, res) => {
    console.log("Planowanie produkcji zamówienia");
    const { orderId, productionPlan } = req.body;
    try {
      const timetables = await getAllTimetables();

      productionPlan.forEach(async item => {
        const date = new Date(item.date);
        const { position } = item;

        let timetable = timetables.find(table => table.position === position);
        timetable = await addOrderToDay(timetable, date, orderId);
        await timetable.save();
      });

      return res.json(timetables);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  editOrder: async (req, res) => {
    console.log("Edycja planu produkcji zamówienia");
    const { orderId, productionPlan } = req.body;

    try {
      let timetables = await getAllTimetables();
      timetables = timetables.map(position => {
        position.days = removeOrderFromDays(position.days, orderId);
        return position;
      });

      timetables.forEach(async pos => {
        const plan = productionPlan.find(
          item => item.position === pos.position
        );

        if (plan) {
          const date = new Date(plan.date);
          pos = await addOrderToDay(pos, date, orderId);
        }

        await pos.save();
        return;
      });

      return res.json(timetables);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  removeOrder: async (req, res) => {
    const { orderId, position } = req.body;
    try {
      let timetable = await getTimetableForPosition(position);

      timetable = await removeOrderFromDay(timetable, orderId);
      await timetable.save();

      return res.send("Done");
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  // temp
  nextDay: async (req, res) => {
    try {
      console.log("---===RESTART KALENDARZA==---");
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
      return res.json(positions);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { update };
