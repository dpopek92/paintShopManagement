const { getGlobalSettings } = require("../../actions/settings/get");

const update = {
  settings: async (req, res) => {
    const { body } = req;
    console.log(body);
    try {
      const settings = await getGlobalSettings();

      Object.keys(body).forEach(key => {
        const item = body[key];
        settings[key] = item;
      });

      await settings.save();

      return res.json(settings);
    } catch (err) {
      console.error("ERROR: ", req.originalUrl, err.message);
      return res.status(500).send({ info: "Server error", msg: err });
    }
  }
};

module.exports = { update };
