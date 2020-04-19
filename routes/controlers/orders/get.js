const { getOrdersByStatus } = require("../../actions/orders/get");

const get = {
  new: async (req, res) => {
    try {
      const orders = await getOrdersByStatus("wysłane");

      return res.json(orders);
    } catch (err) {
      console.error(req.originalUrl, err.message);
      return res.status(500).send({ info: "Server error", msg: err });
    }
  }
};

module.exports = { get };
