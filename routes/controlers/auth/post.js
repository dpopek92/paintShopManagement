const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../../actions/users/get");

const post = {
  // +
  getJWT: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await getUserByEmail(email);

      // See if password match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          email: "Nieprawidłowy email lub hasło",
          password: "Nieprawidłowy email lub hasło"
        });
      }

      // Return JWT
      const payload = {
        user: {
          id: user.id,
          permission: user.permission
        }
      };

      console.log(`${email} logged in`);
      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          return res.json({
            token
          });
        }
      );
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).json({ info: "Server error", msg: err });
    }
  }
};

module.exports = { post };
