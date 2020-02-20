const { getGlobalSettings } = require("../../actions/settings/get");

const get = {
  globalSettings: async (req, res) => {
    try {
      const settings = await getGlobalSettings();

      return res.json(settings);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  realizationDates: async (req, res) => {
    try {
      const settings = await getGlobalSettings();

      return res.json(settings);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  paintMakers: async (req, res) => {
    try {
      const settings = await getGlobalSettings();

      return res.json(settings);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  }
};

module.exports = { get };
