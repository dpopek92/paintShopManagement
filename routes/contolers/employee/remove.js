const { getEmployeeProfile } = require("../../actions/employees/get");
const { removeEmployeeAccount } = require("../../actions/employees/remove");

const remove = {
  currentProfile: async (req, res) => {
    const { id } = req.user;

    try {
      const employee = await getEmployeeProfile(id);

      employee.surname = "DELETED";
      employee.email = `${employee.email}-DELETED`;
      employee.permission = "DELETED";
      employee.password = "-";

      await employee.save();

      console.log(`Employee ${employee.email} has deleted his profile`);
      return res.json(
        `User: ${employee.email}, have been deleted from database`
      );
    } catch (err) {
      console.log(req.originalUrl);
      console.log(err);
      res.status(500).send("Server error");
    }
  },

  employeeProfile: async (req, res) => {
    const { employeeId } = req.params;

    try {
      const employee = await getEmployeeProfile(employeeId);

      await removeEmployeeAccount(employeeId);

      console.log(
        `Admin has deleted Employee ${employee.email} and his orders`
      );
      return res.json(
        `User: ${employee.email}, and all his orders have been deleted from database`
      );
    } catch (err) {
      console.log(req.originalUrl);
      console.log(err);
      res.status(500).send("Server error");
    }
  }
};

module.exports = { remove };
