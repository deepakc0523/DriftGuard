import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { useRepos } from "../components/RepoContext";
import AddRepoForm from "../components/AddRepoForm";

import DriftDetail from "./drift/DriftDetail";
import DriftAlerts from "./drift/DriftAlerts";
import AuditLogs from "./audit/AuditLogs";
import ChangeRequests from "./admin/ChangeRequests";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { repos, addRepo } = useRepos();

  const [page, setPage] = useState("overview");

  // ================= CORE STATE =================
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [baseline, setBaseline] = useState(null);

  // ================= DRIFT STATE =================
  const [driftResult, setDriftResult] = useState(null);
  const [checkingDrift, setCheckingDrift] = useState(false);

  /* ================= BASELINE HELPERS ================= */

  const fetchBaseline = async (repoId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/baseline/${repoId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBaseline(res.data);
    } catch {
      setBaseline(null);
    }
  };

  useEffect(() => {
    if (selectedRepo) {
      fetchBaseline(selectedRepo._id);
      setDriftResult(null);
    } else {
      setBaseline(null);
      setDriftResult(null);
    }
  }, [selectedRepo]);

  const createBaseline = async () => {
    if (!selectedRepo) return;

    try {
      await axios.post(
        `http://localhost:5000/api/baseline/${selectedRepo._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(`Baseline created for ${selectedRepo.name}`);
      await fetchBaseline(selectedRepo._id);
    } catch (err) {
      console.error(err);
      alert("Failed to create baseline");
    }
  };

  /* ================= DRIFT HELPERS ================= */

  const checkDrift = async () => {
    if (!selectedRepo) return;

    try {
      setCheckingDrift(true);
      setDriftResult(null);

      const res = await axios.get(
        `http://localhost:5000/api/drift/${selectedRepo._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDriftResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to check drift");
    } finally {
      setCheckingDrift(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen">
      <Sidebar setPage={setPage} />

      <div className="flex-1 p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-400">
              {user.email} ({user.role})
            </p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20"
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
              value={baseline ? "1" : "0"}
              color="bg-green-500/20 text-green-400"
            />
            <DashboardCard
              title="Drift Alerts"
              value={driftResult?.drift ? "1" : "0"}
              color="bg-red-500/20 text-red-400"
            />
          </div>
        )}

        {/* ================= REPOSITORIES ================= */}
        {page === "repos" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Repositories</h2>

            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-4">Repo</th>
                  <th className="p-4">Branch</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {repos.map((repo) => (
                  <tr
                    key={repo._id}
                    onClick={() => setSelectedRepo(repo)}
                    className={`cursor-pointer border-t border-white/5 ${
                      selectedRepo?._id === repo._id
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <td className="p-4">{repo.name}</td>
                    <td className="p-4">{repo.branch}</td>
                    <td className="p-4 text-green-400">Healthy</td>
                    <td className="p-4 text-blue-400">Select</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ================= SELECTED REPO PANEL ================= */}
            {selectedRepo && (
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                <h3 className="text-lg font-semibold">
                  {selectedRepo.name}
                </h3>

                {baseline ? (
                  <p className="text-green-400">✅ Baseline Active</p>
                ) : (
                  <p className="text-yellow-400">
                    ⚠️ No baseline created
                  </p>
                )}

                {user.role === "admin" && !baseline && (
                  <button
                    onClick={createBaseline}
                    className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400"
                  >
                    Create Baseline
                  </button>
                )}

                {baseline && (
                  <button
                    onClick={checkDrift}
                    disabled={checkingDrift}
                    className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-400 disabled:opacity-50"
                  >
                    {checkingDrift ? "Checking..." : "Check Drift"}
                  </button>
                )}

                {driftResult && (
                  <div className="mt-3 p-3 rounded bg-black/30 border border-white/10">
                    {driftResult.drift ? (
                      <>
                        <p className="text-red-400 font-medium">
                          🚨 Drift detected
                        </p>
                        <ul className="list-disc ml-5 text-sm">
                          {driftResult.filesChanged?.map((f, i) => (
                            <li key={i}>
                              {f.filename} ({f.status})
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-green-400 font-medium">
                        ✅ No drift detected
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {user.role !== "viewer" && (
              <AddRepoForm addRepo={addRepo} />
            )}
          </div>
        )}

        {/* ================= OTHER PAGES ================= */}
        {page === "drift-detail" && <DriftDetail setPage={setPage} />}
        {page === "drift-alerts" && <DriftAlerts />}
        {page === "audit" && <AuditLogs />}
        {page === "changes" && user.role === "admin" && (
          <ChangeRequests />
        )}
      </div>
    </div>
  );
}
