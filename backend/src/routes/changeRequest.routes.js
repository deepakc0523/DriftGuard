const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/role.middleware");

const {
  getChangeRequests,
  updateChangeRequestStatus,
} = require("../controllers/changeRequest.controller");

// ===============================
// GET ALL CHANGE REQUESTS (ADMIN)
// ===============================
router.get(
  "/change-requests",
  authMiddleware,
  adminOnly,
  getChangeRequests
);

// ==================================
// APPROVE / REJECT CHANGE REQUEST
// ==================================
router.patch(
  "/change-requests/:id",
  authMiddleware,
  adminOnly,
  updateChangeRequestStatus
);

module.exports = router;
