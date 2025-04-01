const MISReport = require("../models/misReportModel");

// Get all reports with filtering
exports.getMISReports = async (req, res) => {
  try {
    const { filter, search, fromDate, toDate } = req.query;

    let query = {};

    // Date filtering
    if (filter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query.sampleCollectedDate = { $gte: today };
    } else if (filter === "thisWeek") {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      query.sampleCollectedDate = { $gte: startOfWeek };
    } else if (filter === "thisMonth") {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      query.sampleCollectedDate = { $gte: startOfMonth };
    } else if (filter === "custom" && fromDate && toDate) {
      query.sampleCollectedDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }

    // Search filtering
    if (search) {
      query.$or = [
        { patientId: new RegExp(search, "i") },
        { patientName: new RegExp(search, "i") },
        { visitId: new RegExp(search, "i") },
      ];
    }

    const reports = await MISReport.find(query);

    // Summary Counts
    const totalCollected = await MISReport.countDocuments({ status: "Collected" });
    const totalAccepted = await MISReport.countDocuments({ status: "Accepted" });
    const collectedToday = await MISReport.countDocuments({ sampleCollectedDate: { $gte: new Date().setHours(0, 0, 0, 0) } });
    const acceptedToday = await MISReport.countDocuments({ sampleAcceptedDate: { $gte: new Date().setHours(0, 0, 0, 0) } });
    const notYetAccepted = await MISReport.countDocuments({ status: "Collected", sampleAcceptedDate: null });

    res.render("misReport", {
      reports,
      totalCollected,
      totalAccepted,
      collectedToday,
      acceptedToday,
      notYetAccepted
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Add new MIS report entry
exports.addMISReport = async (req, res) => {
  try {
    const { patientId, patientName, visitId, serviceName, sample, barcodeNo, status, sampleCollectedDate, sampleAcceptedDate } = req.body;

    // Create new report
    const newReport = new MISReport({
      patientId,
      patientName,
      visitId,
      serviceName,
      sample,
      barcodeNo,
      status: status || "Collected",
      sampleCollectedDate: new Date(sampleCollectedDate),
      sampleAcceptedDate: sampleAcceptedDate ? new Date(sampleAcceptedDate) : null,
    });

    await newReport.save();
    res.status(201).json({ message: "MIS Report added successfully", report: newReport });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all MIS reports
exports.getAllMISReports = async (req, res) => {
    try {
        const reports = await MISReport.find(); // Fetch all reports from DB
        res.json({ reports }); // Return data as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
