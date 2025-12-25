import { useState } from "react";

export default function AddRepoForm({ addRepo }) {
  const [name, setName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔒 Basic validation (IMPORTANT)
    if (!name.trim() || !githubUrl.trim()) {
      setError("Repository name and GitHub URL are required");
      return;
    }

    try {
      setLoading(true);

      // 🔑 This matches backend Repo model exactly
      await addRepo({
        name: name.trim(),
        githubUrl: githubUrl.trim(),
        branch: branch.trim() || "main",
      });

      // ✅ Clear form after success
      setName("");
      setGithubUrl("");
      setBranch("main");
    } catch (err) {
      console.error(err);
      setError("Failed to add repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5 space-y-4"
    >
      <h3 className="text-lg font-semibold">Add Repository</h3>

      {/* Repo Name */}
      <input
        type="text"
        placeholder="Repository name (e.g. driftguard-ui)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded bg-black/30 border border-white/10 focus:outline-none"
      />

      {/* GitHub URL */}
      <input
        type="text"
        placeholder="GitHub repository URL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        className="w-full p-2 rounded bg-black/30 border border-white/10 focus:outline-none"
      />

      {/* Branch */}
      <input
        type="text"
        placeholder="Branch (default: main)"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className="w-full p-2 rounded bg-black/30 border border-white/10 focus:outline-none"
      />

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          px-4 py-2 rounded-lg
          bg-green-500 text-black font-medium
          hover:bg-green-400
          disabled:opacity-50
        "
      >
        {loading ? "Adding..." : "Add Repo"}
      </button>
    </form>
  );
}
