const mongoose = require("mongoose");

const DisplaySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isAccepted: {
    type: Boolean,
    default: true
  },
  permission: {
    type: String,
    default: "display",
    required: true
  }
});

module.exports = Display = mongoose.model("display", DisplaySchema, "display");
