const express = require("express");
const router = express.Router();
const billTransactionController = require("../controllers/billTransactionController");

router.post("/addTransaction", billTransactionController.addTransaction);
router.get("/allTransaction", billTransactionController.getAllTransactions);
router.get("/export/excel", billTransactionController.exportToExcel);
router.get("/export/pdf", billTransactionController.exportToPDF);


// Example Express.js route fix



// Route to render EJS page
router.get("/bill-transactions", async (req, res) => {
    try {
        const transactions = await BillTransaction.find();
        res.render("billTransactions", { transactions });
    } catch (error) {
        res.status(500).send("Error fetching transactions");
    }
});





module.exports = router;
