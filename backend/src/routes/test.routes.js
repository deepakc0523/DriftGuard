const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/role.middleware");

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

router.get("/admin", authMiddleware, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin 👑",
    user: req.user,
  });
});

module.exports = router;
