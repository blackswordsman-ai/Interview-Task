const ClientBillingCollection = require("../models/clientBillingCollectionModel");

// Get all billing collections with optional search & date filtering
exports.getAllBillingCollections = async (req, res) => {
    try {
      let { search, startDate, endDate, page = 1, limit = 10 } = req.query;
      let filter = {};
  
      // Search by client name or patient name
      if (search) {
        filter.$or = [
          { clientName: { $regex: search, $options: "i" } },
          { patientName: { $regex: search, $options: "i" } }
        ];
      }
  
      // Filter by date range
      if (startDate && endDate) {
        filter.visitDate = { 
          $gte: new Date(startDate), 
          $lte: new Date(endDate)
        };
      }
  
      // Pagination
      const skip = (page - 1) * limit;
      const billingCollections = await ClientBillingCollection.find(filter)
        .skip(skip)
        .limit(limit);
  
      const totalCount = await ClientBillingCollection.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);
  
      res.json({
        billingCollections,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Add a new billing collection
exports.addBillingCollection = async (req, res) => {
  try {
    const newBilling = new ClientBillingCollection(req.body);
    await newBilling.save();
    res.status(201).json({ message: "Billing record added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export as Excel/PDF (To be implemented)
exports.exportBillingCollection = async (req, res) => {
  res.status(200).json({ message: "Export functionality coming soon!" });
};
