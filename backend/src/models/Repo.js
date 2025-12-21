const mongoose = require("mongoose");

const repoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      default: "main",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    baselineCreated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repo", repoSchema);
