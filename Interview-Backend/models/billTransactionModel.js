const mongoose = require("mongoose");

const billTransactionSchema = new mongoose.Schema({
  receiptNumber: { type: String, required: true, unique: true },
  patientName: { type: String, required: true },
  clientName: { type: String, required: true },
  visitDate: { type: Date, required: true },
  visitId: { type: String, required: true },
  grossAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  dueAmount: { 
    type: Number, 
    default: function() { return this.netAmount - this.paidAmount; } // Auto-calculate due amount
  },
  paymentMode: { 
    type: String, 
    enum: ["Cash", "Card", "Online", "Other","Upi"], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("BillTransaction", billTransactionSchema);
