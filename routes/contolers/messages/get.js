const {
  getAllMessages,
  getMessagesForEmployee
} = require("../../actions/messages/get");
const { firstUpperCaseLetter } = require("../../utils/string");

const get = {
  allMessages: async (req, res) => {
    try {
      const messages = await getAllMessages();

      return res.json(messages);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("Server error");
    }
  },
  messagesForEmployee: async (req, res) => {
    const { id } = req.user;
    let { position } = req.params;

    try {
      position = firstUpperCaseLetter(position);
      const messages = await getMessagesForEmployee(id, position);

      return res.json(messages);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("Server error");
    }
  }
};

module.exports = { get };
