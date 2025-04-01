const mongoose = require("mongoose");

const ClientTransactionSchema = new mongoose.Schema({
    sNo: { type: Number, required: true },
    customerListName: { type: String, required: true },
    encounterDttm: { type: Date, required: true },
    billAmount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("ClientTransaction", ClientTransactionSchema);
