const bcrypt = require("bcryptjs");
const { checkIfUserExist, getUserByEmail } = require("../../actions/users/get");
const sendEmail = require("../../actions/email/sendEmailTemplate");

const post = {
  createNewUser: async (req, res) => {
    const {
      firstname,
      surname,
      company,
      email,
      password,
      permission,
      isAccepted,
      isTrusted,
      discount,
      ordersNumber,
      currentFreeOrderId
    } = req.body;
    try {
      let user = await checkIfUserExist(email);
      if (user) {
        return res.status(400).json({ msg: "email" });
      }

      // Create new user
      user = new User({
        firstname,
        surname,
        company,
        email,
        password,
        permission,
        isAccepted,
        isTrusted,
        discount,
        ordersNumber,
        currentFreeOrderId
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Sent activate email
      const subject = "BLOW meble - nowe konto oczekuje na akceptację";

      const msg = `<h3>Utworzono nowe konto</h3></br>
      <strong>Użytkownik:</strong></br><p>Imię: ${user.firstname}</br>Nazwisko: ${user.surname}</br>email: ${user.email}</p>
      <p>Aby zaakceptować kliknij w <a href='https://zamowfronty.pl/api/verify/${user.id}'>LINK</a>.</p>`;

      await sendEmail("biuro@mebleblow.pl", subject, msg);

      console.log(`We have a new user: ${user.email}`);

      return res.json({ msg: "Account created" });
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).json({ info: "Server error", msg: err });
    }
  },

  remindPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await getUserByEmail(email);

      // Send email
      const subject = "BLOW meble - odzyskiwanie konta";

      const msg = `<h3>Odzyskiwanie konta</h3></br><p>Po kliknięciu w <a href='https://zamowfronty.pl/recover/${user._id}'>LINK</a>, będziesz mógł ustawić nowe hasło do swojego konta.</p>`;

      await sendEmail(email, subject, msg);

      console.log(`User: ${user.email}, recover his account`);

      return res.json({ msg: "Email sended" });
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("server error");
    }
  }
};

module.exports = { post };
