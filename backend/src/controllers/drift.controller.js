const Repo = require("../models/Repo");
const Baseline = require("../models/Baseline");
const ChangeRequest = require("../models/ChangeRequest");
const {
  getLatestCommit,
  compareCommits,
} = require("../services/github.service");

exports.checkDrift = async (req, res) => {
  try {
    const { repoId } = req.params;

    // 1️⃣ Repo
    const repo = await Repo.findById(repoId);
    if (!repo) {
      return res.status(404).json({ message: "Repo not found" });
    }

    // 2️⃣ Baseline
    const baseline = await Baseline.findOne({ repo: repoId });
    if (!baseline) {
      return res.status(404).json({ message: "Baseline not found" });
    }

    // 3️⃣ Latest commit
    const latestCommit = await getLatestCommit(repo.githubUrl);

    // 4️⃣ No drift
    if (baseline.commitHash === latestCommit) {
      return res.json({
        drift: false,
        message: "No drift detected",
      });
    }

    // 5️⃣ Check if pending CR already exists
    const existingCR = await ChangeRequest.findOne({
      repo: repoId,
      status: "pending",
    });

    if (existingCR) {
      return res.json({
        drift: true,
        message: "Drift detected (change request already pending)",
        changeRequestId: existingCR._id,
      });
    }

    // 6️⃣ Compare commits
    const files = await compareCommits(
      repo.githubUrl,
      baseline.commitHash,
      latestCommit
    );

    // 7️⃣ Auto create Change Request
    const cr = await ChangeRequest.create({
      repo: repoId,
      baseline: baseline._id,
      requestedBy: req.user.id,
      github: {
        baseCommit: baseline.commitHash,
        headCommit: latestCommit,
        files: files.map((f) => ({
          filename: f.filename,
          status: f.status,
          additions: f.additions,
          deletions: f.deletions,
        })),
      },
    });

    res.json({
      drift: true,
      message: "Drift detected and change request created",
      changeRequestId: cr._id,
      filesChanged: cr.github.files,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
