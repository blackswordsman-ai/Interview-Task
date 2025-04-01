const express = require("express");
const { addTransaction, getTransactions } = require("../controllers/transactionController");
const router = express.Router();

router.post("/add", addTransaction);
router.get("/list", getTransactions);
router.get("/add-transaction", (req, res) => {
    res.render("addTransaction");
  });
  

module.exports = router;
