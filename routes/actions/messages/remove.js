const Messages = require("../../../models/Messages");

// *
const removeMessage = async messageId => {
  return await Messages.findByIdAndDelete(messageId);
};

module.exports = { removeMessage };
