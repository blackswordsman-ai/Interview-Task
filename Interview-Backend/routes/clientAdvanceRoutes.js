const express = require("express");
const router = express.Router();
const clientAdvanceController = require("../controllers/clientAdvanceController");

// Get all client advances (filtered)
router.get("/advancePay", clientAdvanceController.getAllClientAdvances);

// Create a new client advance entry
router.post("/advancePayments", clientAdvanceController.createClientAdvance);

// Export data as PDF or Excel
router.get("/export/:format", clientAdvanceController.exportClientAdvances);

module.exports = router;
