const mongoose = require("mongoose");

const misReportSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  visitId: { type: String, required: true },
  serviceName: { type: String, required: true },
  sample: { type: String, required: true },
  barcodeNo: { type: String, required: true, unique: true },
  status: { type: String, enum: ["Collected", "Accepted", "Pending"], default: "Pending" },
  sampleCollectedDate: { type: Date, required: true },
  sampleAcceptedDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("MISReport", misReportSchema);
