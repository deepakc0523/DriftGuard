const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { testGithub } = require("../controllers/githubTest.controller");

router.post("/github-test", authMiddleware, testGithub);

module.exports = router;
