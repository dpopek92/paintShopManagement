const {
  getEmployeesWorkedHours
} = require("../../actions/statistics/employees/get");
const {
  updateWorkedHours
} = require("../../actions/statistics/employees/update");

const update = {
  employeeWorkedHours: async (req, res) => {
    const { month, year, data } = req.body;
    try {
      const employees = await getEmployeesWorkedHours(year, month);
      const values = await updateWorkedHours(employees, data);

      return res.json(values);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  }
};

module.exports = { update };
