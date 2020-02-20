const User = require("../../../models/Users");

// *
const getProfileById = async id => {
  const user = await User.findById(id);
  if (!user) throw "There is no user with this id";
  return user;
};

module.exports = { getProfileById };
