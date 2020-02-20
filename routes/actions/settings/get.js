const Settings = require("../../../models/Settings");

// *
const getGlobalSettings = async () => {
  const settings = await Settings.findOne({
    status: "global"
  });
  if (!settings) throw "There is no global settings";
  return settings;
};

module.exports = {
  getGlobalSettings
};
