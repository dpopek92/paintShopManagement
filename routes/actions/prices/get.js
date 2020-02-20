const Prices = require("../../../models/Prices");

// *
const getGlobalPrices = async () => {
  const prices = await Prices.findOne({ status: "global" });
  if (!prices) throw "There is no global prices";
  return prices;
};

module.exports = { getGlobalPrices };
