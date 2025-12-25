const Repo = require("../models/Repo");
const Baseline = require("../models/Baseline");
const {
  getLatestCommit,
} = require("../services/github.service");

// ✅ CREATE BASELINE
exports.createBaseline = async (req, res) => {
  try {
    const { repoId } = req.params;

    // 1️⃣ Check repo exists
    const repo = await Repo.findById(repoId);
    if (!repo) {
      return res.status(404).json({ message: "Repo not found" });
    }

    // 2️⃣ Check baseline already exists
    const existing = await Baseline.findOne({ repo: repoId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Baseline already exists for this repo" });
    }

    // 3️⃣ Get latest commit hash from GitHub
    const latestCommit = await getLatestCommit(repo.githubUrl);

    // 4️⃣ Create baseline with REAL commit hash
    const baseline = await Baseline.create({
      repo: repoId,
      createdBy: req.user.id,
      commitHash: latestCommit,
      status: "active",
    });

    // 5️⃣ Update repo
    repo.baselineCreated = true;
    await repo.save();

    res.status(201).json({
      message: "Baseline created successfully",
      baseline,
    });
  } catch (error) {
    console.error("Create baseline error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET BASELINE BY REPO
exports.getBaselineByRepo = async (req, res) => {
  try {
    const baseline = await Baseline.findOne({
      repo: req.params.repoId,
    }).populate("createdBy", "email role");

    if (!baseline) {
      return res.status(404).json({ message: "Baseline not found" });
    }

    res.json(baseline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
