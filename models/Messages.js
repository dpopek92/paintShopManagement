const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
 author: { type: String, required: true },
 authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
 positions: [String],
 message: { type: String },
 addDate: { type: Date, default: Date.now },
 readedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "employee" }],
 creadedAt: { type: Date, default: Date.now, expires: 2419200000 }
});

// MessagesSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 });

module.exports = Messages = mongoose.model("message", MessagesSchema);

//2419200000 - 28 days
