const bcrypt = require("bcryptjs");
const { checkIfUserExist } = require("../../actions/users/get");

const post = {
  newEmployee: async (req, res) => {
    const { firstname, surname, positions, email, password } = req.body;

    try {
      let employee = await checkIfUserExist(email);
      if (employee) {
        return res.status(400).json({ msg: "email" });
      }

      employee = new Employee({
        firstname,
        surname,
        positions,
        email,
        password
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      employee.password = await bcrypt.hash(password, salt);

      await employee.save();

      console.log("Nowy pracownik");
      res.json({ msg: "Employee created" });
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
};

module.exports = { post };
