const express = require("express");
const router = express.Router();
const { getMISReports, addMISReport,getAllMISReports } = require("../controllers/misReportController");

// GET all reports with filtering
router.get("/misRepo", getMISReports);
router.get("/getallMis", getAllMISReports);

// POST route to add new report
router.post("/addMisReport", addMISReport);

module.exports = router;
