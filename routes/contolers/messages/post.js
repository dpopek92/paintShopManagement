const { getUserById } = require("../../actions/users/get");
const { addNewMessage } = require("../../actions/messages/post");

const post = {
  newMessage: async (req, res) => {
    console.log("Nowa wiadomość");
    const { id } = req.user;
    const { message, positions } = req.body;

    try {
      const user = await getUserById(id);

      const newMessage = await addNewMessage(user, message, positions);

      return res.json(newMessage);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("Server error");
    }
  }
};

module.exports = { post };
