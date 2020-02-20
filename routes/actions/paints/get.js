const PaintOrders = require("../../../models/PaintOrders");
const { createPaintsOrdersDocument } = require("./post");

// *
const getPaintsOrdersDocument = async (year, month) => {
  let document = await PaintOrders.findOne({ year, month });
  if (!document) {
    document = await createPaintsOrdersDocument(year, month);
  }
  return document;
};

// *
const getPaintsOrderByOrderId = async (year, month, id) => {
  const document = await PaintOrders.findOne({ year, month });
  const order = document.orders.find(item => {
    return item._id.toString() === id.toString();
  });
  return order;
};

module.exports = { getPaintsOrdersDocument, getPaintsOrderByOrderId };
