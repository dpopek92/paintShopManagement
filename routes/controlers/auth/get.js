const { getUserById } = require("../../actions/users/get");

const get = {
  // +
  getMe: async (req, res) => {
    const { id } = req.user;
    try {
      const user = await getUserById(id);

      return res.json(user);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { get };
