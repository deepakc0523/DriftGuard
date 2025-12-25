const ChangeRequest = require("../models/ChangeRequest");
const Baseline = require("../models/Baseline");
const Repo = require("../models/Repo");
const DriftAlert = require("../models/DriftAlert");

// ===============================
// GET ALL CHANGE REQUESTS (ADMIN)
// ===============================
exports.getChangeRequests = async (req, res) => {
  try {
    const requests = await ChangeRequest.find()
      .populate("repo", "name")
      .populate("baseline")
      .populate("requestedBy", "email role")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch change requests" });
  }
};

// ==================================
// APPROVE / REJECT CHANGE REQUEST
// ==================================
exports.updateChangeRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // 1️⃣ Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // 2️⃣ Find Change Request
    const cr = await ChangeRequest.findById(id);
    if (!cr) {
      return res.status(404).json({ message: "Change request not found" });
    }

    // 3️⃣ Prevent double processing
    if (cr.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Change request already processed" });
    }

    // 4️⃣ Update CR status
    cr.status = status;
    await cr.save();

    // 🔗 4.1️⃣ Update linked Drift Alert status
    await DriftAlert.findOneAndUpdate(
      { changeRequestId: cr._id },
      {
        status: status === "approved" ? "APPROVED" : "REJECTED",
      }
    );

    // 5️⃣ If APPROVED → update baseline
    if (status === "approved") {
      const baseline = await Baseline.findById(cr.baseline);
      if (!baseline) {
        return res.status(404).json({ message: "Baseline not found" });
      }

      // 🔥 Move baseline forward
      baseline.commitHash = cr.github.headCommit;
      await baseline.save();
    }

    res.json({
      message: `Change request ${status} successfully`,
      changeRequest: cr,
    });
  } catch (error) {
    console.error("Update CR error:", error);
    res.status(500).json({ message: "Failed to update change request" });
  }
};
