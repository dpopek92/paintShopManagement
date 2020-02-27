const User = require("../../../models/Users");

const removeUserAccountById = async id => {
  return User.findByIdAndDelete(id);
};

module.exports = { removeUserAccountById };
