const Repo = require("../models/Repo");

// CREATE REPO
exports.createRepo = async (req, res) => {
  try {
    const { name, githubUrl, branch } = req.body;

    const repo = await Repo.create({
      name,
      githubUrl,
      branch,
      owner: req.user.id,
    });

    res.status(201).json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET REPOS FOR LOGGED-IN USER
exports.getMyRepos = async (req, res) => {
  try {
    const repos = await Repo.find({ owner: req.user.id });
    res.json(repos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
