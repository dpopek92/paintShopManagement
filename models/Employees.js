const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  permission: {
    type: String,
    default: "employee"
  },
  isAccepted: {
    type: Boolean,
    default: true
  },
  earnings: {
    type: Number,
    default: 0
  },
  positions: [String],
  addDate: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
