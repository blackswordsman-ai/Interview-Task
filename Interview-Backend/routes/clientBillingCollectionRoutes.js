const express = require("express");
const router = express.Router();
const clientBillingController = require("../controllers/clientBillingCollectionController");

// Routes
router.get("/clientCollection", clientBillingController.getAllBillingCollections);
router.post("/addClientColl", clientBillingController.addBillingCollection);
router.get("/export", clientBillingController.exportBillingCollection);

module.exports = router;
