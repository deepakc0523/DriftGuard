const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { createRepo, getMyRepos } = require("../controllers/repo.controller");

// Protected routes
router.post("/", authMiddleware, createRepo);
router.get("/", authMiddleware, getMyRepos);

module.exports = router;
