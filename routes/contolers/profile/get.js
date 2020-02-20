const { getUserById, getAllUsers } = require("../../actions/users/get");

const get = {
  currentUser: async (req, res) => {
    const { id } = req.user;
    try {
      const user = await getUserById(id);

      return res.json(user);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err.message);
      return res.status(500).send(err);
    }
  },

  allUsers: async (req, res) => {
    const { permission } = req.user;
    try {
      if (permission !== "admin") {
        return res.status(400).send("You can not do this");
      }

      const users = await getAllUsers();

      return res.json(users);
    } catch (err) {
      console.log(req.originalUrl);
      console.log(err.message);
      return res.status(500).send("Server error");
    }
  },

  userProfile: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await getUserById(userId);

      return res.json(user);
    } catch (err) {
      console.log(req.originalUrl);
      console.log(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { get };
