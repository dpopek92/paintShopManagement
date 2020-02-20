const Messages = require("../../../models/Messages");

// *
const getMessagesForEmployee = async (employeeId, position) => {
  const messages = await Messages.find({
    $or: [{ authorId: employeeId }, { positions: position }]
  });
  if (!messages) throw "There is no messages for you";
  // console.log(messages);
  return messages;
};

// *
const getMessageById = async id => {
  const message = await Messages.findById(id);
  if (!message) throw "There is no message with this id";
  return message;
};

// *
const getAllMessages = async () => {
  const messages = await Messages.find();
  if (!messages) throw "There is no messages";
  return messages;
};

module.exports = { getMessagesForEmployee, getMessageById, getAllMessages };
