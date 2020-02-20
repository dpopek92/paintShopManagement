const Employee = require("../../../models/Employees");

const getEmployees = async arrayOfId => {
  return await Employee.find({ $or: arrayOfId });
};

// *
const getEmployeeById = async id => {
  const employee = await Employee.findById(id).select("-password");
  if (!employee) throw "There is no employees";
  return employee;
};

// *
const getEmployeeProfile = async id => {
  const employee = await Employee.findById(id);
  if (!employee) throw "There is no employees";
  return employee;
};

// *
const getEmployeesByArrayOfId = async arrayOfId => {
  return await Employee.find({ _id: { $in: arrayOfId } });
};

// *
const getEmployeesByPosition = async position => {
  const employees = await Employee.find({ positions: { $in: [position] } });
  if (!employees) throw "There is no employees at this position";
  return employees;
};

// *
const getAllEmployees = async () => {
  const employees = await Employee.find().select("-password");
  if (!employees) throw "There is no employees";
  return employees;
};

module.exports = {
  getEmployeeById,
  getEmployees,
  getEmployeesByArrayOfId,
  getEmployeesByPosition,
  getAllEmployees,
  getEmployeeProfile
};
