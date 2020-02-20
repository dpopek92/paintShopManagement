const { checkPermission } = require("../../utils/functions");
const { getGlobalPrices } = require("../../actions/prices/get");

const get = {
  globalPrices: async (req, res) => {
    const { permission } = req.user;
    const perms = ["admin", "user"];

    try {
      if (!checkPermission(perms, permission)) {
        return res.status(400).send("You can not do this");
      }

      const prices = await getGlobalPrices();

      return res.json(prices);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  }
};

module.exports = { get };
