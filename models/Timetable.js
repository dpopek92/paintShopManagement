const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
    unique: true
  },
  days: [
    {
      date: {
        type: Date,
        required: true
      },
      day: {
        type: String,
        required: true
      },
      orders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order"
        }
      ]
    }
  ]
});

module.exports = Timetable = mongoose.model("timetable", TimetableSchema);
