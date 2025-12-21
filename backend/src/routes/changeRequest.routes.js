const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  getChangeRequests,
  updateChangeRequestStatus,
} = require("../controllers/changeRequest.controller");

// Get all change requests (admin)
router.get("/change-requests", authMiddleware, getChangeRequests);

// Approve / Reject change request
router.patch(
  "/change-requests/:id",
  authMiddleware,
  updateChangeRequestStatus
);

module.exports = router;
