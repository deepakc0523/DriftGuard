const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  createBaseline,
  getBaselineByRepo,
} = require("../controllers/baseline.controller");

// Protected
router.post("/", authMiddleware, createBaseline);
router.get("/:repoId", authMiddleware, getBaselineByRepo);

module.exports = router;
