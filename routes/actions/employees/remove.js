const Employee = require("../../../models/Employees");

// *
const removeEmployeeAccount = async id => {
  return Employee.findOneAndDelete({ _id: id });
};

module.exports = { removeEmployeeAccount };
