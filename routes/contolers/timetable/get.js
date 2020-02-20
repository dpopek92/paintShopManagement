const {
  getAllTimetables,
  getTimetableForPosition
} = require("../../actions/timetable/get");
const { checkPermission } = require("../../utils/functions");
const { firstUpperCaseLetter } = require("../../utils/string");

const get = {
  allPositions: async (req, res) => {
    try {
      console.log("Pobranie pełnego terminarza");
      const timetables = await getAllTimetables();

      return res.json(timetables);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  position: async (req, res) => {
    const { permission } = req.user;
    const { position } = req.params;
    const perms = ["admin", "employee"];
    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      const timetable = await getTimetableForPosition(
        firstUpperCaseLetter(position)
      );
      return res.json(timetable);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { get };
