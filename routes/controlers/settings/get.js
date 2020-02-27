const { getGlobalSettings } = require("../../actions/settings/get");

const get = {
  settings: async (req, res) => {
    try {
      const settings = await getGlobalSettings();

      return res.json(settings);
    } catch (err) {
      console.error(req.originalUrl, err.message);
      return res.status(500).send({ info: "Server error", msg: err });
    }
  }
};

module.exports = { get };
