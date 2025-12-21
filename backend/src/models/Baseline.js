const mongoose = require("mongoose");

const baselineSchema = new mongoose.Schema(
  {
    repo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repo",
      required: true,
      unique: true, // one baseline per repo
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commitHash: {
      type: String,
      default: "initial", // later from GitHub
    },
    status: {
      type: String,
      enum: ["active", "pending"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Baseline", baselineSchema);
