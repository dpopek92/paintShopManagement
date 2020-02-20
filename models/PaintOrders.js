const mongoose = require("mongoose");

const PaintOrdersSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  orders: [
    {
      user: {
        type: String
      },
      date: {
        type: Date
      },
      skipped: [mongoose.Schema.Types.ObjectId],
      colors: [
        {
          color: {
            type: String,
            required: true
          },
          paintType: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          surfaceRight: {
            type: Number
            // required: true
          },
          surfaceLeft: {
            type: Number
            // required: true
          },
          orders: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "order"
            }
          ]
        }
      ]
    }
  ]
});

module.exports = PaintOrder = mongoose.model("paintOrders", PaintOrdersSchema);
