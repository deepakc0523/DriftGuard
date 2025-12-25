const axios = require("axios");

// 🔹 Extract owner & repo from GitHub URL
function parseRepoUrl(githubUrl) {
  // examples:
  // https://github.com/user/repo.git
  // https://github.com/user/repo

  const cleaned = githubUrl
    .replace("https://github.com/", "")
    .replace(".git", "")
    .trim();

  const [owner, repo] = cleaned.split("/");

  return { owner, repo };
}

// 🔹 Get latest commit SHA
exports.getLatestCommit = async (githubUrl) => {
  const { owner, repo } = parseRepoUrl(githubUrl);

  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  return res.data[0].sha; // latest commit SHA
};

// 🔹 Compare two commits
exports.compareCommits = async (githubUrl, base, head) => {
  const { owner, repo } = parseRepoUrl(githubUrl);

  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  return res.data.files;
};
