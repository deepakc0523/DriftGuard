import { useEffect } from "react";
import { useDrift } from "../../context/DriftContext";
import { useAudit } from "../../context/AuditContext";
import { detectDrift } from "../../utils/driftLogic";
import { useAuth } from "../../components/AuthContext";

export default function DriftOverview({ setPage }) {
  const { user } = useAuth();
  const { addLog } = useAudit();

  const {
    baseline,
    setBaseline,
    drifts,
    setDrifts,
    setSelectedDrift
  } = useDrift();

  // 🔹 Mock current repository state
  const currentState = [
    { path: "config/db.js", hash: "999" },
    { path: "README.md", hash: "222" }
  ];

  // 🔹 Create baseline snapshot
  const createBaseline = () => {
    const snapshot = {
      files: [
        { path: "config/db.js", hash: "111" },
        { path: "README.md", hash: "222" }
      ],
      createdBy: user.email,
      createdAt: new Date().toLocaleString()
    };

    setBaseline(snapshot);

    addLog({
      title: "Baseline Created",
      description: "New baseline snapshot created",
      type: "Baseline",
      user: user.email,
      severity: "INFO"
    });
  };

  // 🔹 Remove baseline (Admin only)
  const removeBaseline = () => {
    setBaseline(null);
    setDrifts([]);

    addLog({
      title: "Baseline Removed",
      description: "Baseline snapshot removed",
      type: "Baseline",
      user: user.email,
      severity: "WARNING"
    });
  };

  // 🔹 Detect drift against baseline (preserve authorization)
  useEffect(() => {
    if (!baseline) return;

    const detected = detectDrift(
      baseline.files,
      currentState
    );

    const merged = detected.map((d) => {
      const existing = drifts.find(
        (old) => old.filePath === d.filePath
      );
      return existing
        ? { ...d, authorized: existing.authorized }
        : d;
    });

    setDrifts(merged);

    if (merged.length > 0) {
      addLog({
        title: "Drift Detected",
        description: "Unauthorized configuration drift detected",
        type: "Drift",
        user: "System",
        severity: "WARNING"
      });
    }
  }, [baseline]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-yellow-400">
        Drift Alerts
      </h2>

      {/* ================= BASELINE MANAGEMENT ================= */}
      <div className="border border-green-600 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2 text-green-400">
          Baseline Management
        </h3>

        {!baseline ? (
          user.role !== "viewer" && (
            <button
              onClick={createBaseline}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Create Baseline Snapshot
            </button>
          )
        ) : (
          <div className="space-y-2 text-sm">
            <p>
              <b>Status:</b>{" "}
              <span className="text-green-400">Active</span>
            </p>
            <p>
              <b>Files Tracked:</b> {baseline.files.length}
            </p>
            <p>
              <b>Created By:</b> {baseline.createdBy}
            </p>
            <p>
              <b>Created At:</b> {baseline.createdAt}
            </p>

            <div className="mt-3 space-x-3">
              {(user.role === "admin" ||
                user.role === "developer") && (
                <button
                  onClick={createBaseline}
                  className="bg-yellow-600 px-3 py-1 rounded"
                >
                  Recreate Baseline
                </button>
              )}

              {user.role === "admin" && (
                <button
                  onClick={removeBaseline}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Remove Baseline
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= DRIFT LIST ================= */}
      {!baseline && (
        <p className="text-gray-400">
          No baseline set. Drift detection is inactive.
        </p>
      )}

      {baseline && drifts.length === 0 && (
        <p className="text-green-400">
          No drift detected ✔
        </p>
      )}

      {drifts.map((drift) => (
        <div
          key={drift.id}
          onClick={() => {
            setSelectedDrift(drift);
            setPage("drift-detail");
          }}
          className="border border-yellow-500 p-4 rounded mb-3 cursor-pointer hover:bg-gray-900"
        >
          <p><b>File:</b> {drift.filePath}</p>
          <p><b>Change:</b> {drift.changeType}</p>
          <p><b>Severity:</b> {drift.severity}</p>
          <p>
            <b>Status:</b>{" "}
            {drift.authorized ? (
              <span className="text-green-400">Authorized</span>
            ) : (
              <span className="text-red-400">Unauthorized</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
