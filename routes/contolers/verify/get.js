const { getUserById } = require("../../actions/users/get");
const sendMail = require("../../actions/email/sendEmailTemplate");

const get = {
  sendVerifyLink: async (req, res) => {
    const { id } = req.user;
    try {
      const user = await getUserById(id);

      const msg = `<h3>Dziękujemy za założenie konta</h3></br><p>Kliknij w link aby aktywować swoje konto.</p></br> <a href='http://zamowfronty.pl/api/verify/${req.user.id}'>LINK</a>`;
      await sendMail(user.email, "BLOW meble - Aktywacja konta", msg);

      return res.json({ msg: "Email sended" });
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
  activateUserAccount: async (req, res) => {
    const { userId } = req.params;

    try {
      let user = await getUserById(userId);

      user.isAccepted = true;
      await user.save();

      const msg = `<h3>Witamy w BLOW meble</h3></br><p>Twoje konto jest aktywne, możesz się zalogować: <a href='http://zamowfronty.pl/login}'>zamowfronty.pl</a>.</p>`;
      await sendMail(user.email, "BLOW meble - Konto aktywne", msg);

      return res.redirect("http://localhost:3000/activated");
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { get };
