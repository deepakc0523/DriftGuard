const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { checkDrift } = require("../controllers/drift.controller");

router.get("/drift/:repoId", authMiddleware, checkDrift);

module.exports = router;
