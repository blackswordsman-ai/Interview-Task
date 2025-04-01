const ClientAdvance = require("../models/ClientAdvance");

// Get all client advances (with optional filtering)
exports.getAllClientAdvances = async (req, res) => {
    try {
      // Fetch all client advances from the database
      const clientAdvances = await ClientAdvance.find();
  
      // Extract unique client names
      const clients = [...new Set(clientAdvances.map(item => item.clientName))];
  
      // Send the data as JSON response
      res.json({ clientAdvances, clients });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Create new client advance entry
exports.createClientAdvance = async (req, res) => {
  try {
    const newAdvance = new ClientAdvance(req.body);
    const savedAdvance = await newAdvance.save();
    res.status(201).json(savedAdvance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export as PDF or Excel (Placeholder API)
exports.exportClientAdvances = async (req, res) => {
  try {
    const format = req.params.format; // 'pdf' or 'excel'
    res.json({ message: `Exporting client advances as ${format} (Feature coming soon)` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
