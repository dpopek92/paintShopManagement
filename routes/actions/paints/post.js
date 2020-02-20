const PaintOrders = require("../../../models/PaintOrders");

// *
const createPaintsOrdersDocument = async (year, month) => {
  const document = await new PaintOrders({ year, month });
  await document.save();
  return document;
};

module.exports = { createPaintsOrdersDocument };
