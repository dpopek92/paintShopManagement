const bcrypt = require("bcryptjs");
const { getProfileById } = require("../../actions/profile/get");
const { getUserById } = require("../../actions/users/get");
const { getGlobalPrices } = require("../../actions/prices/get");

const update = {
  currentProfile: async (req, res) => {
    const { id } = req.user;
    const { email } = req.body;
    try {
      const user = await getProfileById(id);

      Object.keys(req.body).forEach(key => {
        const item = req.body[key];
        user[key] = item;
      });
      await user.save();

      console.log(`Profile ${email} was updated`);
      return res.json(user);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("server error");
    }
  },

  password: async (req, res) => {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;
    try {
      console.log("Zmiana hasła");
      const user = await getProfileById(id);

      // Is current password match
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: "Wprowadzone aktualne hasło jest nieprawidłowe"
        });
      }

      // Encrypt and update password
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(newPassword, salt);

      user.password = password;
      await user.save();

      console.log(`User ${user.email} has changed the password`);
      return res.json(user);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err.message);
      return res.status(500).send("server error");
    }
  },

  passwordByAccountRecover: async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;

    try {
      const user = await getUserById(userId);

      // Encrypt and update password
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      user.password = newPassword;
      await user.save();

      console.log(`User ${user.email} has recover his account`);
      return res.json(user);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err.message);
      return res.status(500).send("server error");
    }
  },

  subordinates: async (req, res) => {
    const { subordinates } = req.body;
    const { userId } = req.params;

    try {
      console.log("Aktualizacja podwładnych");
      const user = await getProfileById(userId);

      user.subordinates = subordinates;
      await user.save();

      return res.json(user);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("server error");
    }
  },

  discounts: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await getProfileById(userId);
      const globalPrices = await getGlobalPrices();

      Object.keys(req.body).forEach(key => {
        const userPrice = req.body[key];
        const price = globalPrices[key];

        if (typeof userPrice !== "object") {
          user.discounts[key] = price - userPrice;
        } else {
          Object.keys(userPrice).forEach(keyNest => {
            const userPriceNest = userPrice[keyNest];
            const priceNest = price[keyNest];

            if (typeof userPriceNest !== "object") {
              user.discounts[key][keyNest] = priceNest - userPriceNest;
            } else {
              Object.keys(userPriceNest).forEach(keyDeepNest => {
                const userPriceDeepNest = userPriceNest[keyDeepNest];
                const priceDeepNest = priceNest[keyDeepNest];

                user.discounts[key][keyNest][keyDeepNest] =
                  priceDeepNest - userPriceDeepNest;
              });
            }
          });
        }
      });

      await user.save();

      console.log(`Admin changed prices for user ${user.email}`);
      return res.json(user.discounts);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("server error");
    }
  }
};

module.exports = { update };
