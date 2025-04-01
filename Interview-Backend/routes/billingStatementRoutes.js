const express = require("express");
const router = express.Router();
const billingStatementController = require("../controllers/billingStatementController");

// ✅ Routes
router.get("/getBill", billingStatementController.getBillingStatements);
router.post("/postBill", billingStatementController.createBillingStatement);
router.get("/export/pdf", billingStatementController.exportPDF);
router.get("/export/excel", billingStatementController.exportExcel);

module.exports = router;
