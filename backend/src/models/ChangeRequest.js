const mongoose = require("mongoose");

const changeRequestSchema = new mongoose.Schema(
  {
    repo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repo",
      required: true,
    },
    baseline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Baseline",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reason: {
      type: String,
      default: "Auto-generated due to drift detection",
    },

    // 🔥 GitHub drift data
    github: {
      baseCommit: String,
      headCommit: String,
      files: [
        {
          filename: String,
          status: String,
          additions: Number,
          deletions: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChangeRequest", changeRequestSchema);
