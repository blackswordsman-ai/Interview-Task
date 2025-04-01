const express = require("express");
const router = express.Router();
const clientTransactionController = require("../controllers/clientTransactionController");

// Route to get all transactions
router.get("/clientTransaction", clientTransactionController.getAllTransactions);

// Route to add a new transaction
router.post("/addTransaction", clientTransactionController.addTransaction);

module.exports = router;
