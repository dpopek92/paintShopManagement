const Customer = require("../../../models/Customer");

const removeCustomerProfileByUserId = async id => {
  return Customer.findOneAndDelete({ user: id });
};

module.exports = { removeCustomerProfileByUserId };
