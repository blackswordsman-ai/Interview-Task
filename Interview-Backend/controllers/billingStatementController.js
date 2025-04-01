const BillingStatement = require("../models/billingStatementModel");

// ✅ Get all billing statements with optional filtering by date range and client name
exports.getBillingStatements = async (req, res) => {
    try {
      const billingStatements = await BillingStatement.find();
      // Send the billing statements as a JSON response
      res.json(billingStatements);
    } catch (error) {
      // Send an error response with a 500 status code if something goes wrong
      res.status(500).json({ message: error.message });
    }
  };
  
  

// ✅ Create a new billing statement
exports.createBillingStatement = async (req, res) => {
  try {
    const { fromDate, toDate, clientName, totalAmount } = req.body;

    const newStatement = new BillingStatement({ fromDate, toDate, clientName, totalAmount });
    await newStatement.save();

    res.status(201).json({ message: "Billing statement created successfully", data: newStatement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Export billing statements as PDF (Placeholder for PDF logic)
exports.exportPDF = (req, res) => {
  res.status(200).json({ message: "Export PDF feature coming soon!" });
};

// ✅ Export billing statements as Excel (Placeholder for Excel logic)
exports.exportExcel = (req, res) => {
  res.status(200).json({ message: "Export Excel feature coming soon!" });
};
