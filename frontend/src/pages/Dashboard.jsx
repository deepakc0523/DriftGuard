import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { useRepos } from "../components/RepoContext";
import AddRepoForm from "../components/AddRepoForm";



export default function Dashboard() {
  const { user, logout } = useAuth();
  const { repos, addRepo } = useRepos(); // ✅ NOW USED
  const [page, setPage] = useState("overview");

  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar setPage={setPage} />

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400">
              {user.email} ({user.role})
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* OVERVIEW */}
        {page === "overview" && (
          <div className="grid md:grid-cols-3 gap-6">
            <DashboardCard title="Repositories" value={repos.length} />
            <DashboardCard title="Active Baselines" value="2" />
            <DashboardCard title="Drift Alerts" value="1" />
          </div>
        )}

        {/* REPOSITORIES */}
        {page === "repos" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Repositories</h2>

            <table className="w-full text-left border border-gray-800">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-3">Repo Name</th>
                  <th className="p-3">Branch</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {repos.map((repo, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-800"
                  >
                    <td className="p-3">{repo.name}</td>
                    <td className="p-3">{repo.branch}</td>
                    <td
                      className={`p-3 ${
                        repo.status === "Healthy"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {repo.status}
                    </td>
                    <td className="p-3">
                      {user.role === "viewer" ? (
                        <span className="text-gray-500">View Only</span>
                      ) : (
                        <button className="text-green-400">
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ADD REPO FORM (Admin + Developer only) */}
            {user.role !== "viewer" && (
              <AddRepoForm addRepo={addRepo} />
            )}
          </div>
        )}

        {/* DRIFT */}
        {page === "drift" && (
          <p className="text-yellow-400">
            ⚠️ Drift detected in repository: driftguard-ui
          </p>
        )}

        {/* AUDIT */}
        {page === "audit" && (
          <p className="text-gray-400">
            Audit logs will appear here.
          </p>
        )}

        {/* ADMIN ONLY */}
        {page === "changes" && user.role === "admin" && (
          <p className="text-green-400">
            Pending change requests (Admin only)
          </p>
        )}
      </div>
    </div>
  );
}