const { getCustomerById } = require("../../actions/customer/get");
const { getGlobalSettings } = require("../../actions/settings/get");
const {
  calculateDiscounts
} = require("../../actions/prices/calculateUserPrices");

const update = {
  discounts: async (req, res) => {
    const { userPrices } = req.body;
    const { customerId } = req.params;
    try {
      const globalSettings = await getGlobalSettings();
      const { prices } = globalSettings;
      const customer = await getCustomerById(customerId);

      customer.discounts = calculateDiscounts(prices, userPrices);
      await customer.save();

      return res.json(newDiscounts);
    } catch (err) {
      console.error("ERROR: ", req.originalUrl, err.message);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { update };
