const ClientTransaction = require("../models/ClientTransaction");

// Get all client transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await ClientTransaction.find().sort({ encounterDttm: -1 });

        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error });
    }
};


// Add a new transaction
exports.addTransaction = async (req, res) => {
    try {
        const { sNo, customerListName, encounterDttm, billAmount } = req.body;
        
        // Create and save new transaction
        const newTransaction = new ClientTransaction({ sNo, customerListName, encounterDttm, billAmount });
        const savedTransaction = await newTransaction.save();

        // Send JSON response with saved transaction
        res.status(201).json({
            message: "Transaction added successfully",
            transaction: savedTransaction
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding transaction", error });
    }
};

