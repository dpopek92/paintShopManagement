const User = require("../../../models/Users");

// *
const removeUserAccount = async id => {
  return User.findOneAndDelete({ _id: id });
};

module.exports = { removeUserAccount };
