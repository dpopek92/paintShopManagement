const bcrypt = require("bcryptjs");
const { checkIfUserExist, getUserByEmail } = require("../../actions/users/get");
const { checkIfCustomerProfileExist } = require("../../actions/customer/get");
const sendEmail = require("../../actions/email/sendEmailTemplate");
const { websiteAddress, adminEmailAddress } = require("../../utils/const");
const { moveFiles } = require("../../utils/files");
const { getCustomerByUserId } = require("../../actions/customer/get");
const { getGlobalSettings } = require("../../actions/settings/get");
const { setNewOrderNumber } = require("../../actions/orders/functions");
const Order = require("../../../models/Orders");

const post = {
  newOrder: async (req, res) => {
    const { id, permission } = req.user;
    const order = JSON.parse(req.body.order);
    const { user, paintType, type } = order;
    const { files } = req;
    const ownerId = user || id;

    const perms = ["admin", "user"];
    try {
      if (!perms.includes(permission)) {
        return res.status(400).json({ msg: "Nie możesz tego zrobić" });
      }
      const author = await getCustomerByUserId(id);
      const owner = await getCustomerByUserId(ownerId);
      const globalSettings = await getGlobalSettings();
      const { paintsProducers } = globalSettings;

      const newOrder = new Order(order);

      // set author
      newOrder.author = id;
      newOrder.user = user || id;

      // set number
      const number = await setNewOrderNumber(
        order,
        owner.currentFreeOrderId,
        ownerId
      );
      newOrder.number = number;

      if (!["reklamacja", "domówienie", "poprawa"].includes(type)) {
        owner.currentFreeOrderId = number + 1;
      }
      owner.ordersNumber += 1;
      await owner.save();

      // set paintProducers
      newOrder.paintProducer =
        paintType === "gloss"
          ? paintsProducers.gloss
          : paintsProducers.semiGloss;
      newOrder.baseProducer = paintsProducers.base;

      // set updateHistory
      const historyObj = {
        user: `${author.user.firstname} ${author.user.surname}`,
        date: new Date(),
        key: "nowe zamówienie",
        description: "Utworzenie nowego zamówienia"
      };
      newOrder.updateHistory.push(historyObj);

      // handle images
      const from = `./files/temp/`;
      const to = `./files/${ownerId}/${number}/`;
      await moveFiles(files, from, to);

      // send mail
      const msg = `Twoje zamówienie zostało złożone poprawnie`;
      await sendEmail(
        owner.user.email,
        `Zamówienie nr. ${number} złożone poprawnie`,
        msg
      );
      order.isMailToCustomer += 1;

      // save order
      await newOrder.save();

      return res.json({ id: newOrder._id });
    } catch (err) {
      console.error(req.originalUrl, err.message);
      return res.status(500).send({ info: "Server error", msg: err });
    }
  }
};

module.exports = { post };
