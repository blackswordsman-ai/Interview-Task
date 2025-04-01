const Transaction = require("../models/transactionModel");

exports.addTransaction = async (req, res) => {
  try {
    const { referralName, doctor, reportType, financialYear, monthlyData } = req.body;
    
    // Calculate total amount
    const total = Object.values(monthlyData).reduce((sum, value) => sum + value, 0);

    const transaction = new Transaction({
      referralName,
      doctor,
      reportType,
      financialYear,
      monthlyData,
      total,
    });

    await transaction.save();
    res.status(201).json({ message: "Transaction added successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

exports.getTransactions = async (req, res) => {
    try {
      const { doctor, reportType, financialYear } = req.query;
  
      // Build filter object based on query parameters
      const filter = {};
      if (doctor) filter.doctor = doctor;
      if (reportType) filter.reportType = reportType;
      if (financialYear) filter.financialYear = financialYear;
  
      // Fetch transactions from the database
      const transactions = await Transaction.find(filter);
  
      // Render the EJS view and pass transactions data
      res.render('billingReport', { 
        transactions, 
        doctor, 
        reportType, 
        financialYear 
      });
    } catch (error) {
      // Handle errors and render an error page or send a response
      res.status(500).render('error', { error: "Failed to fetch transactions" });
    }
  };
  