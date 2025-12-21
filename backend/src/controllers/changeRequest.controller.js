const ChangeRequest = require("../models/ChangeRequest");
const Baseline = require("../models/Baseline");
const Repo = require("../models/Repo");

// ===============================
// GET ALL CHANGE REQUESTS (ADMIN)
// ===============================
exports.getChangeRequests = async (req, res) => {
  try {
    const requests = await ChangeRequest.find()
      .populate("repo")
      .populate("baseline")
      .populate("requestedBy", "email role")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================================
// APPROVE / REJECT CHANGE REQUEST
// ==================================
exports.updateChangeRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const cr = await ChangeRequest.findById(req.params.id);
    if (!cr) {
      return res.status(404).json({ message: "Change request not found" });
    }

    if (cr.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Change request already processed" });
    }

    cr.status = status;
    await cr.save();

    // 🔥 If approved → move baseline forward
    if (status === "approved") {
      const baseline = await Baseline.findById(cr.baseline);
      baseline.commitHash = cr.github.headCommit;
      await baseline.save();
    }

    res.json({
      message: `Change request ${status}`,
      changeRequest: cr,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
