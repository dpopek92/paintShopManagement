const { getAllTimetables } = require("../../actions/timetable/get");
const { positionsForTimetables } = require("../../utils/const");
const { createTimetable } = require("../../actions/timetable/post");

const post = {
  createTimetable: async (req, res) => {
    try {
      const date = new Date();

      for (let i = 0; i < positionsForTimetables.length; i++) {
        const position = positionsForTimetables[i];
        await createTimetable(position, date);
      }

      const timetables = await getAllTimetables();
      return res.json(timetables);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { post };
