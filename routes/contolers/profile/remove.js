const { getProfileById } = require("../../actions/profile/get");
const { removeUserAccount } = require("../../actions/profile/remove");
const { removeAllUserOrders } = require("../../actions/orders/remove");

const remove = {
  currentUser: async (req, res) => {
    const { id } = req.user;

    try {
      const user = await getProfileById(id);

      if (user.permission === "admin") {
        return res.status(400).send("You can not remove an admin");
      }

      // Update profile
      user.surname = "DELETED";
      user.permission = "DELETED";
      user.email = `${user.email}-DELETED`;
      user.password = "-";
      user.discounts = "";

      await user.save();

      console.log(`User ${user.email} was deleted his profile`);
      return res.json(
        `User: ${user.firstname} - ${user.company}, have been deleted from database`
      );
    } catch (err) {
      console.log(req.originalUrl);
      console.log(err);
      return res.status(500).send("Server error");
    }
  },

  userProfile: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await getProfileById(userId);

      if (user.permission === "admin") {
        return res.status(400).send("You can not remove an admin");
      }

      // Remove user orders
      await removeAllUserOrders(userId);

      // Remove user account
      await removeUserAccount(userId);

      console.log(`Admin has deleted User ${user.email} and his orders`);
      return res.json(
        `User: ${user.email}, and all his orders have been deleted from database`
      );
    } catch (err) {
      console.log(req.originalUrl);
      console.log(err);
      return res.status(500).send("Server error");
    }
  }
};

module.exports = { remove };
