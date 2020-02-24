const mongoose = require("mongoose");

const EmployeeProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  earnings: {
    type: Number,
    default: 0
  },
  positions: [String]
});

module.exports = EmployeeProfile = mongoose.model(
  "employeeProfile",
  EmployeeProfileSchema
);
