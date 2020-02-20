const Messages = require("../../../models/Messages");

// *
const addNewMessage = async (user, message, positions) => {
  const author = `${user.firstname} ${user.surname}`;
  const authorId = user._id;
  const newMessage = new Messages({ author, authorId, message, positions });
  await newMessage.save();
  return newMessage;
};

module.exports = { addNewMessage };
