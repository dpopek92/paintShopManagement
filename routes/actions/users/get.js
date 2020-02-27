const User = require("../../../models/Users");

// +
const getUserById = async id => {
  const user = await User.findById(id).select("-password");
  if (!user) throw "There is no user with this id";
  return user;
};

// +
const getUserByIdWithPassword = async id => {
  const user = await User.findById(id);
  if (!user) throw "There is no user with this id";
  return user;
};

// +
const getUserByEmail = async email => {
  const user = await User.findOne({ email });
  if (!user) throw "There is no user with this email";
  return user;
};

// +
const checkIfUserExist = async email => {
  const user = await User.findOne({ email });
  return user;
};

module.exports = {
  getUserById,
  getUserByEmail,
  checkIfUserExist,
  getUserByIdWithPassword
};
