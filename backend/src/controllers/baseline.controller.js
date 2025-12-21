const Baseline = require("../models/Baseline");
const Repo = require("../models/Repo");
const { getLatestCommit } = require("../services/github.service");

// ===============================
// CREATE BASELINE (Phase 2)
// ===============================
exports.createBaseline = async (req, res) => {
  try {
    const { repoId } = req.body;

    // 1️⃣ Check repo exists
    const repo = await Repo.findById(repoId);
    if (!repo) {
      return res.status(404).json({ message: "Repo not found" });
    }

    // 2️⃣ Check baseline already exists
    const existingBaseline = await Baseline.findOne({ repo: repoId });
    if (existingBaseline) {
      return res.status(400).json({ message: "Baseline already exists" });
    }

    // 3️⃣ Fetch latest commit from GitHub
    const latestCommitHash = await getLatestCommit(repo.githubUrl);

    // 4️⃣ Create baseline with real commit hash
    const baseline = await Baseline.create({
      repo: repoId,
      createdBy: req.user.id,
      commitHash: latestCommitHash,
      status: "active",
    });

    // 5️⃣ Mark repo as baseline created
    repo.baselineCreated = true;
    await repo.save();

    // 6️⃣ Return baseline
    res.status(201).json(baseline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET BASELINE FOR A REPO
// ===============================
exports.getBaselineByRepo = async (req, res) => {
  try {
    const baseline = await Baseline.findOne({ repo: req.params.repoId });

    if (!baseline) {
      return res.status(404).json({ message: "Baseline not found" });
    }

    res.json(baseline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
