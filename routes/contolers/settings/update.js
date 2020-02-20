const { getGlobalSettings } = require("../../actions/settings/get");

const update = {
  globalSettings: async (req, res) => {
    try {
      const settings = await getGlobalSettings();

      Object.keys(req.body).forEach(key => {
        const item = req.body[key];
        settings[key] = item;
      });

      await settings.save();

      return res.json(settings);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  }
};

module.exports = { update };
