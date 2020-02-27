const bcrypt = require("bcryptjs");
const { checkIfUserExist, getUserByEmail } = require("../../actions/users/get");
const { checkIfCustomerProfileExist } = require("../../actions/customer/get");
const sendEmail = require("../../actions/email/sendEmailTemplate");
const { websiteAddress, adminEmailAddress } = require("../../utils/const");

const post = {
  //+
  createNewUser: async (req, res) => {
    const { firstname, surname, company, email, password } = req.body;
    try {
      let user = await checkIfUserExist(email);
      if (user) {
        return res.status(400).json({ email: "Podany email jest już zajęty" });
      }

      // Create new user
      user = new User({
        firstname,
        surname,
        company,
        email,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      let profile = await checkIfCustomerProfileExist(user._id);
      if (profile) {
        return res.status(400).json({ email: "Podany email jest już zajęty" });
      }

      profile = new CustomerProfile({
        user: user._id
      });

      await user.save();
      await profile.save();

      // Sent activate email
      const subject = "nowe konto oczekuje na akceptację";

      const msg = `<h3>Utworzono nowe konto</h3></br>
      <strong>Użytkownik:</strong></br><p>Imię: ${user.firstname}</br>Nazwisko: ${user.surname}</br>email: ${user.email}</p>
      <p>Aby zaakceptować kliknij w <a href='
      ${websiteAddress}api/verify/${user._id}
      '>LINK</a>.</p>`;

      await sendEmail(adminEmailAddress, subject, msg);

      console.log(`We have a new user: ${user.email}`);

      return res.json({ msg: "Account created" });
    } catch (err) {
      console.error(req.originalUrl, err.message);
      return res.status(500).send({ info: "Server error", msg: err });
    }
  },

  remindPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await getUserByEmail(email);

      // Send email
      const subject = "odzyskiwanie konta";

      const msg = `<h3>Odzyskiwanie konta</h3></br><p>Po kliknięciu w <a href='${websiteAddress}recover/${user._id}'>LINK</a>, będziesz mógł ustawić nowe hasło do swojego konta.</p>`;

      await sendEmail(email, subject, msg);

      console.log(`User: ${user.email}, recover his account`);

      return res.json({ msg: "Email sended" });
    } catch (err) {
      console.error(req.originalUrl, err.message);
      return res.status(500).send("server error");
    }
  }
};

module.exports = { post };
