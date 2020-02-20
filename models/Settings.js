const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
 status: {
  type: String,
  default: "global"
 },
 paintGloss: {
  type: String,
  default: "Renner"
 },
 paintSemigloss: {
  type: String,
  default: "Hesse"
 },
 paintBase: {
  type: String,
  default: "Renner"
 },
 dateVeneer: {
  type: Number,
  default: 28
 },
 dateMilling: {
  type: Number,
  default: 28
 },
 dateGloss: {
  type: Number,
  default: 21
 },
 dateSemigloss: {
  type: Number,
  default: 14
 }
});

module.exports = Settings = mongoose.model("settings", SettingsSchema);
