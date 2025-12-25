const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/role.middleware");

const {
  createBaseline,
  getBaselineByRepo,
} = require("../controllers/baseline.controller");

// ✅ CREATE BASELINE (ADMIN ONLY)
router.post(
  "/:repoId",
  authMiddleware,
  adminOnly,
  createBaseline
);

// ✅ GET BASELINE FOR A REPO
router.get(
  "/:repoId",
  authMiddleware,
  getBaselineByRepo
);

module.exports = router;
