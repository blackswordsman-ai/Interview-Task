const mongoose = require("mongoose");

const clientBillingCollectionSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientId: { type: String, required: true },
  visitDate: { type: Date, required: true },
  visitId: { type: String, required: true },
  clientName: { type: String, required: true },
  testName: { type: String, required: true },
  mrp: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  collectedAmount: { type: Number, required: true },
  dueAmount: { type: Number, required: true },
  b2b: { type: Number, required: true },
  differenceAmount: { type: Number, required: true },
  b2bPlName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("ClientBillingCollection", clientBillingCollectionSchema);
