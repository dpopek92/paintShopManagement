const User = require("../../../models/Users");
const Employee = require("../../../models/Employees");
const Display = require("../../../models/Display");

// *
const getUserById = async id => {
  let user;
  user = await User.findById(id).select("-password");
  if (!user) user = await Employee.findById(id).select("-password");
  if (!user) user = await Display.findById(id).select("-password");
  if (!user) throw "There is no user with this id";
  return user;
};

// *
const getUserByEmail = async email => {
  let user;
  user = await User.findOne({ email });
  if (!user) user = await Employee.findOne({ email });
  if (!user) user = await Display.findOne({ email });
  if (!user) throw "There is no user with this email";
  return user;
};

// *
const getAllUsers = async () => {
  const users = await User.find({
    $or: [
      { permission: "user" },
      { permission: "admin" },
      { permission: "DELETED" }
    ]
  }).select("-password");

  return users;
};

// *
const checkIfUserExist = async email => {
  let user;
  user = await User.findOne({ email });
  return user;
};

module.exports = { getUserById, getUserByEmail, getAllUsers, checkIfUserExist };
