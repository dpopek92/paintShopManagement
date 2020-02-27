const { getUserById } = require("../../actions/users/get");
const { removeUserAccountById } = require("../../actions/users/remove");
const {
  removeCustomerProfileByUserId
} = require("../../actions/customer/remove");

const remove = {
  accountByAdmin: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await getUserById(userId);
      if (user.permission === "admin") {
        return res
          .status(400)
          .json({ msg: "Nie możesz usunąć administratora" });
      }

      await removeCustomerProfileByUserId(userId);
      await removeUserAccountById(userId);

      return res.send("Usunięto konto użytkownika");
    } catch (err) {
      console.error(req.originalUrl, err);
      return res.status(500).send("server error");
    }
  }
};

module.exports = { remove };
