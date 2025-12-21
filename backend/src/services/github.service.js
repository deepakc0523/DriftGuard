const axios = require("axios");

// ------------------------------------
// Parse GitHub URL
// ------------------------------------
const parseGithubUrl = (url) => {
  const parts = url.replace("https://github.com/", "").split("/");
  return {
    owner: parts[0],
    repo: parts[1],
  };
};

// ------------------------------------
// Get latest commit SHA (Phase 1)
// ------------------------------------
const getLatestCommit = async (githubUrl) => {
  const { owner, repo } = parseGithubUrl(githubUrl);

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  return response.data[0].sha;
};

// ------------------------------------
// Compare baseline vs latest (Phase 3)
// ------------------------------------
const compareCommits = async (githubUrl, baseCommit, headCommit) => {
  const { owner, repo } = parseGithubUrl(githubUrl);

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/compare/${baseCommit}...${headCommit}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  return response.data.files; // changed files
};

module.exports = {
  getLatestCommit,
  compareCommits,
};
