const { getMessageById } = require("../../actions/messages/get");

const update = {
  setMessageReaded: async (req, res) => {
    const { messageId } = req.params;
    const { id } = req.user;

    try {
      const message = await getMessageById(messageId);

      message.readedBy.push(id);
      await message.save();

      return res.json(message);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("Server error");
    }
  }
};

module.exports = { update };
