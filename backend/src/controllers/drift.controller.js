const Repo = require("../models/Repo");
const Baseline = require("../models/Baseline");
const ChangeRequest = require("../models/ChangeRequest");
const DriftAlert = require("../models/DriftAlert");

const {
  getLatestCommit,
  compareCommits,
} = require("../services/github.service");

// ================= CHECK DRIFT =================
exports.checkDrift = async (req, res) => {
  try {
    const { repoId } = req.params;

    // 1️⃣ Validate Repo
    const repo = await Repo.findById(repoId);
    if (!repo) {
      return res.status(404).json({ message: "Repo not found" });
    }

    // 2️⃣ Validate Baseline
    const baseline = await Baseline.findOne({ repo: repoId });
    if (!baseline) {
      return res.status(404).json({ message: "Baseline not found" });
    }

    // 3️⃣ Get latest commit from GitHub
    const latestCommit = await getLatestCommit(repo.githubUrl);

    // 4️⃣ No drift case
    if (baseline.commitHash === latestCommit) {
      return res.json({
        drift: false,
        message: "No drift detected",
      });
    }

    // 5️⃣ Check for existing pending Change Request
    const existingCR = await ChangeRequest.findOne({
      repo: repoId,
      status: "pending",
    });

    if (existingCR) {
      return res.json({
        drift: true,
        message: "Drift detected (change request already pending)",
        changeRequestId: existingCR._id,
        filesChanged: existingCR.github.files,
      });
    }

    // 6️⃣ Compare commits (baseline vs latest)
    const files = await compareCommits(
      repo.githubUrl,
      baseline.commitHash,
      latestCommit
    );

    // 7️⃣ Auto-create Change Request
    const cr = await ChangeRequest.create({
      repo: repoId,
      baseline: baseline._id,
      requestedBy: req.user.id,
      status: "pending",
      github: {
        baseCommit: baseline.commitHash,
        headCommit: latestCommit,
        files: files.map((file) => ({
          filename: file.filename,
          status: file.status,
          additions: file.additions,
          deletions: file.deletions,
        })),
      },
    });

    // ✅ 8️⃣ CREATE DRIFT ALERT (NEW – EVENT LOG)
    await DriftAlert.create({
      repoId: repo._id,
      repoName: repo.name,
      filesChanged: files.map((file) => file.filename),
      severity: "HIGH", // simple rule for now
      status: "OPEN",
      changeRequestId: cr._id,
    });

    // 9️⃣ Respond to frontend
    return res.json({
      drift: true,
      message: "Drift detected and change request created",
      changeRequestId: cr._id,
      filesChanged: cr.github.files,
    });
  } catch (error) {
    console.error("Drift check error:", error);
    res.status(500).json({
      message: "Failed to check drift",
      error: error.message,
    });
  }
};
