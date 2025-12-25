const express = require("express");
const router = express.Router();

const DriftAlert = require("../models/DriftAlert");
const auth = require("../middleware/auth.middleware");

// GET all drift alerts (admin/dev)
router.get("/", auth, async (req, res) => {
  try {
    const alerts = await DriftAlert.find()
      .sort({ detectedAt: -1 });

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drift alerts" });
  }
});

module.exports = router;
