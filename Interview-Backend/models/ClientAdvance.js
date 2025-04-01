const mongoose = require("mongoose");

const clientAdvanceSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientCode: { type: String, required: true, unique: true },
  advancePaymentDate: { type: Date, required: true },
  collectedUser: { type: String, required: true },
  remark: { type: String },
  receiptNumber: { type: String, required: true, unique: true },
  paymentMethod: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("ClientAdvance", clientAdvanceSchema);
