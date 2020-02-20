const bcrypt = require("bcryptjs");
const { passwordByAccountRecover } = require("../profile").update;
const {
  getEmployeeById,
  getEmployeeProfile
} = require("../../actions/employees/get");

const update = {
  currentProfile: async (req, res) => {
    const { id } = req.params;

    try {
      const employee = await getEmployeeById(id);

      Object.keys(req.body).forEach(key => {
        const item = req.body[key];
        employee[key] = item;
      });
      await employee.save();

      console.log(`Employee profile ${employee.email} has been updated`);
      return res.json(employee);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },

  password: async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.user;

    try {
      const employee = await getEmployeeProfile(id);

      // Is current password match
      const isMatch = await bcrypt.compare(currentPassword, employee.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: "Wprowadzone aktualne hasło jest nieprawidłowe"
        });
      }

      // Encrypt and update password
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(newPassword, salt);

      employee.password = password;
      await employee.save();

      console.log(`Employee ${employee.email} has changed the password`);
      return res.json(employee);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("server error");
    }
  },

  passwordByAccountRecover,

  positions: async (req, res) => {
    const { employeeId } = req.params;
    const { positions } = req.body;

    try {
      const employee = await getEmployeeById(employeeId);

      employee.positions = positions;
      await employee.save();

      console.log(`Employee ${employee.email} positions has been updated`);
      return res.json(employee);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("server error");
    }
  },

  earnings: async (req, res) => {
    const { employeeId } = req.params;
    const { earnings } = req.body;

    try {
      const employee = await getEmployeeById(employeeId);

      employee.earnings = earnings;
      await employee.save();

      console.log(`Employee ${employee.email} earnings has been updated`);
      return res.json(employee);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("server error");
    }
  }
};

module.exports = { update };
