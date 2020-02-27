const bcrypt = require("bcryptjs");
const {
  getUserById,
  getUserByIdWithPassword
} = require("../../actions/users/get");
const { getCustomerByUserId } = require("../../actions/customer/get");

const update = {
  password: async (req, res) => {
    const { id } = req.user;
    let { password, newPassword } = req.body;
    try {
      let user = await getUserByIdWithPassword(id);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          password: "Wprowadzone hasło jest nieprawidłowe"
        });
      }

      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      user.password = newPassword;
      await user.save();

      console.log(`User ${user.email} has changed the password`);
      return res.json(user);
    } catch (err) {
      console.error(req.originalUrl, err.message);
      return res.status(500).send("server error");
    }
  },

  data: async (req, res) => {
    const { id, permission } = req.user;
    const {
      firstname,
      surname,
      email,
      company,
      NIP,
      street,
      city,
      postcode,
      phone
    } = req.body;
    const userValues = { firstname, surname, email, company };
    const profileValues = {
      NIP,
      street,
      city,
      postcode,
      phone
    };

    const perms = ["admin", "user"];
    try {
      const user = await getUserById(id);
      Object.keys(userValues).forEach(key => {
        const item = userValues[key];
        user[key] = item;
      });

      let profile;
      if (perms.includes(permission)) {
        profile = await getCustomerByUserId(id);

        Object.keys(profileValues).forEach(key => {
          const item = profileValues[key];
          profile[key] = item;
        });
      }

      await user.save();
      await profile.save();

      return res.json({ user, profile });
    } catch (err) {
      console.error(req.originalUrl, err.message);
      return res.status(500).send("server error");
    }
  }
};

module.exports = { update };
