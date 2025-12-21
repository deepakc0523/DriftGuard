const { getLatestCommit } = require("../services/github.service");

exports.testGithub = async (req, res) => {
  try {
    const { githubUrl } = req.body;
    const commit = await getLatestCommit(githubUrl);
    res.json({ latestCommit: commit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
