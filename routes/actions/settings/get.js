const Settings = require("../../../models/Settings");

const getGlobalSettings = async () => {
  let settings = await Settings.findOne({ status: "global" });
  if (!settings) {
    settings = new Settings();
    await settings.save();
  }
  return settings;
};

module.exports = { getGlobalSettings };
