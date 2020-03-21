const Customer = require("../../../models/Customer");

const checkIfCustomerProfileExist = async id => {
  return await Customer.findById(id);
};

const getAllCustomers = async () => {
  return await Customer.find().populate("user", "-password");
};

const getCustomerByUserId = async id => {
  return await Customer.findOne({ user: id });
};

const getCustomerById = async id => {
  return await Customer.findById(id);
};

module.exports = {
  checkIfCustomerProfileExist,
  getAllCustomers,
  getCustomerByUserId,
  getCustomerById
};
