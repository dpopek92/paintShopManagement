const { getGlobalPrices } = require("../../actions/prices/get");

const update = {
  globalPrices: async (req, res) => {
    try {
      console.log("Zmiana cen");
      const prices = await getGlobalPrices();

      Object.keys(req.body).forEach(key => {
        const newPrice = req.body[key];

        if (typeof newPrice !== "object") {
          prices[key] = newPrice;
        } else {
          Object.keys(newPrice).forEach(keyNest => {
            const newPriceNest = newPrice[keyNest];

            if (typeof newPriceNest !== "object") {
              prices[key][keyNest] = newPriceNest;
            } else {
              Object.keys(newPriceNest).forEach(keyDeepNest => {
                const newPriceDeepNest = newPriceNest[keyDeepNest];

                prices[key][keyNest][keyDeepNest] = newPriceDeepNest;
              });
            }
          });
        }
      });

      await prices.save();

      return res.json(prices);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  }
};

module.exports = { update };
