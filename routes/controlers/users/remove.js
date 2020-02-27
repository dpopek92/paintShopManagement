const bcrypt = require("bcryptjs");
const { getUserByIdWithPassword } = require("../../actions/users/get");
const { getCustomerByUserId } = require("../../actions/customer/get");

const remove = {
  accountByUser: async (req, res) => {
    const { id, permission } = req.user;
    const { password } = req.body;
    try {
      if (permission === "admin") {
        return res.status(400).send("You can not remove admin");
      }

      const user = await getUserByIdWithPassword(id);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ password: "Wprowadzone hasło jest nieprawidłowe" });
      }

      const profile = await getCustomerByUserId(id);

      user.surname = "USUNIĘTO";
      user.email = `${user.email}-USUNIĘTO`;
      user.password = "-";
      user.company = "USUNIĘTO";

      profile.phone = "USUNIĘTO";
      profile.city = "USUNIĘTO";
      profile.street = "USUNIĘTO";
      profile.postcode = "USUNIĘTO";
      profile.NIP = "USUNIĘTO";
      profile.subordinates = [];

      await user.save();
      await profile.save();

      return res.json(user);
    } catch (err) {
      console.error(req.originalUrl, err.message);
      return res.status(500).send("server error");
    }
  }
};

module.exports = { remove };
