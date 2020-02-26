const { getAllCustomers, getCustomer } = require("../../actions/customer/get");

const get = {
  // +
  allCustomers: async (req, res) => {
    try {
      const customers = await getAllCustomers();

      return res.json(customers);
    } catch (error) {
      console.log(req.originalUrl);
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  },
  currentProfile: async (req, res) => {
    const { id } = req.user;
    try {
      const customer = await getCustomer(id);

      return res.json(customer);
    } catch (error) {
      console.log(req.originalUrl);
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  },
  customerProfile: async (req, res) => {}
};

module.exports = { get };
