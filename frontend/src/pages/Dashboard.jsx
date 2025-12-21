import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { useRepos } from "../components/RepoContext";
import AddRepoForm from "../components/AddRepoForm";

import DriftOverview from "./drift/DriftOverview";
import DriftDetail from "./drift/DriftDetail";
import AuditLogs from "./audit/AuditLogs";
import ChangeRequests from "./admin/ChangeRequests"; // ✅ ADD THIS

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { repos, addRepo } = useRepos();
  const [page, setPage] = useState("overview");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar setPage={setPage} />

      {/* Main content */}
      <div className="flex-1 p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {user.email} ({user.role})
            </p>
          </div>

          <button
            onClick={logout}
            className="
              px-4 py-2
              bg-red-500/10 text-red-400
              border border-red-500/30
              rounded-lg
              hover:bg-red-500/20
            "
          >
            Logout
          </button>
        </div>

        {/* ================= OVERVIEW ================= */}
        {page === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="Repositories"
              value={repos.length}
              color="bg-blue-500/20 text-blue-400"
            />
            <DashboardCard
              title="Active Baselines"
              value="2"
              color="bg-green-500/20 text-green-400"
            />
            <DashboardCard
              title="Drift Alerts"
              value="1"
              color="bg-red-500/20 text-red-400"
            />
          </div>
        )}

        {/* ================= REPOSITORIES ================= */}
        {page === "repos" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Repositories</h2>

            <div className="overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-4">Repo Name</th>
                    <th className="p-4">Branch</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {repos.map((repo, index) => (
                    <tr
                      key={index}
                      className="border-t border-white/5"
                    >
                      <td className="p-4">{repo.name}</td>
                      <td className="p-4">{repo.branch}</td>
                      <td
                        className={`p-4 font-medium ${
                          repo.status === "Healthy"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {repo.status}
                      </td>
                      <td className="p-4">
                        {user.role === "viewer" ? (
                          <span className="text-gray-500">
                            View Only
                          </span>
                        ) : (
                          <button className="text-blue-400 hover:underline">
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Repo Form */}
            {user.role !== "viewer" && (
              <AddRepoForm addRepo={addRepo} />
            )}
          </div>
        )}

        {/* ================= DRIFT OVERVIEW ================= */}
        {page === "drift" && <DriftOverview setPage={setPage} />}

        {/* ================= DRIFT DETAIL ================= */}
        {page === "drift-detail" && (
          <DriftDetail setPage={setPage} />
        )}

        {/* ================= AUDIT LOGS ================= */}
        {page === "audit" && <AuditLogs />}

        {/* ================= CHANGE REQUESTS ================= */}
        {page === "changes" && user.role === "admin" && (
          <ChangeRequests />   // ✅ REAL PAGE CONNECTED
        )}
      </div>
    </div>
  );
}
