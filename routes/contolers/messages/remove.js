const { removeMessage } = require("../../actions/messages/remove");

const remove = {
  message: async (req, res) => {
    const { messageId } = req.params;
    try {
      await removeMessage(messageId);

      return res.send("Message removed");
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("Server error");
    }
  }
};

module.exports = { remove };
