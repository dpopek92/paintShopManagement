const {
  getAllEmployees,
  getEmployeeById,
  getEmployeesByPosition
} = require("../../actions/employees/get");
const { checkPermission } = require("../../utils/functions");

const get = {
  allEmployees: async (req, res) => {
    try {
      const employees = await getAllEmployees();

      return res.json(employees);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  employeeProfile: async (req, res) => {
    const { employeeId } = req.params;
    const { userId, permission } = req.user;

    try {
      if (permission !== "admin" && userId !== employeeId) {
        return res.status(400).send("You can not do this");
      }
      const employee = await getEmployeeById(employeeId);

      return res.json(employee);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  positionEmployees: async (req, res) => {
    const { position } = req.params;
    const { permission } = req.user;
    const perms = ["admin", "employee"];

    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      const employees = await getEmployeesByPosition(position);

      return res.json(employees);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { get };
