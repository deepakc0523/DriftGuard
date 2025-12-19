import { useState } from "react";

export default function AddRepoForm({ addRepo }) {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("main");

  const handleSubmit = (e) => {
    e.preventDefault();
    addRepo({
      name,
      branch,
      status: "Healthy",
    });
    setName("");
    setBranch("main");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-gray-900 border border-gray-800 p-4 rounded"
    >
      <h3 className="font-semibold mb-4">Add Repository</h3>

      <input
        className="w-full mb-3 p-2 bg-gray-800 border border-gray-700 rounded"
        placeholder="Repository name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="w-full mb-3 p-2 bg-gray-800 border border-gray-700 rounded"
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />

      <button className="bg-green-500 text-black px-4 py-2 rounded">
        Add Repo
      </button>
    </form>
  );
}
