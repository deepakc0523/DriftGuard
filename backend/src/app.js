console.log("✅ app.js LOADED");

const express = require("express");
const cors = require("cors");

// Route imports
const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const repoRoutes = require("./routes/repo.routes"); // ✅ ADD THIS
const baselineRoutes = require("./routes/baseline.routes");
const changeRequestRoutes = require("./routes/changeRequest.routes");
const githubTestRoutes = require("./routes/githubTest.routes");
const driftRoutes = require("./routes/drift.routes");
const driftAlertRoutes = require("./routes/driftAlert.routes");




const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/repos", repoRoutes); // ✅ ADD THIS
app.use("/api/baseline", baselineRoutes);
app.use("/api", changeRequestRoutes);
app.use("/api/test", githubTestRoutes);
app.use("/api", driftRoutes);
app.use("/api/drift-alerts", driftAlertRoutes);





// Root route
app.get("/", (req, res) => {
  res.send("DriftGuard Backend is running 🚀");
});

module.exports = app;
