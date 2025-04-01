const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  referralName: { type: String, required: true, trim: true },
  doctor: { type: String, required: true, trim: true },
  reportType: { 
    type: String, 
    required: true, 
    trim: true,
    enum: ["Monthly", "Yearly"]  // Restrict to specific report types
  },
  financialYear: { type: String, required: true, trim: true },
  monthlyData: {
    Jan: { type: Number, default: 0 },
    Feb: { type: Number, default: 0 },
    Mar: { type: Number, default: 0 },
    Apr: { type: Number, default: 0 },
    May: { type: Number, default: 0 },
    Jun: { type: Number, default: 0 },
    Jul: { type: Number, default: 0 },
    Aug: { type: Number, default: 0 },
    Sep: { type: Number, default: 0 },
    Oct: { type: Number, default: 0 },
    Nov: { type: Number, default: 0 },
    Dec: { type: Number, default: 0 },
  },
  total: { type: Number, default: 0 }, // Will be auto-calculated
}, { timestamps: true }); // Adds createdAt & updatedAt fields

// Middleware: Auto-calculate total before saving
transactionSchema.pre("save", function (next) {
  this.total = Object.values(this.monthlyData).reduce((sum, month) => sum + month, 0);
  next();
});

module.exports = mongoose.model("Transaction", transactionSchema);
