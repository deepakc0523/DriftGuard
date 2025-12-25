const mongoose = require("mongoose");

const DriftAlertSchema = new mongoose.Schema({
  repoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Repo",
    required: true,
  },

  repoName: {
    type: String,
    required: true,
  },

  filesChanged: {
    type: [String],
    default: [],
  },

  // 🔗 LINK TO CHANGE REQUEST (THIS WAS MISSING)
  changeRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChangeRequest",
    required: true,
  },

  severity: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "MEDIUM",
  },

  status: {
    type: String,
    enum: ["OPEN", "APPROVED", "REJECTED"],
    default: "OPEN",
  },

  detectedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DriftAlert", DriftAlertSchema);
