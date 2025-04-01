const mongoose = require("mongoose");

const billingStatementSchema = new mongoose.Schema({
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  clientName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("BillingStatement", billingStatementSchema);
