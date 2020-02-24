const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "global"
  },
  paintsProducers: {
    gloss: { type: String, default: "Renner" },
    semiGloss: { type: String, default: "Renner" },
    base: { type: String, default: "Renner" }
  },
  realizationDates: {
    veneer: {
      type: Number,
      default: 28
    },
    milling: {
      type: Number,
      default: 28
    },
    gloss: {
      type: Number,
      default: 21
    },
    semigloss: {
      type: Number,
      default: 14
    }
  }
});

module.exports = Settings = mongoose.model("settings", SettingsSchema);
