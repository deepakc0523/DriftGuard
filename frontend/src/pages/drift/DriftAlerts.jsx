import { useState, useEffect } from "react";
import axios from "axios";

export default function DriftAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/drift-alerts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAlerts(res.data);
    } catch (err) {
      console.error("Failed to fetch drift alerts", err);
    } finally {
      setLoading(false);
    }
  };

  const count = (status) =>
    alerts.filter((a) => a.status === status).length;

  if (loading) {
    return (
      <div className="p-8 text-gray-400">
        Loading drift alerts...
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">Drift Alerts</h1>
      <p className="text-gray-400 mb-6">
        All detected configuration drifts across monitored repositories
      </p>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Summary title="Total Alerts" value={alerts.length} />
        <Summary title="Open" value={count("OPEN")} color="text-red-400" />
        <Summary title="Approved" value={count("APPROVED")} color="text-green-400" />
        <Summary title="Rejected" value={count("REJECTED")} color="text-yellow-400" />
      </div>

      {/* Table */}
      <div className="bg-[#0f172a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#020617] text-gray-400">
            <tr>
              <th className="p-4 text-left">Repository</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Files Changed</th>
              <th className="p-4">Detected At</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No drift alerts found
                </td>
              </tr>
            ) : (
              alerts.map((alert) => (
                <tr
                  key={alert._id}
                  onClick={() => setSelected(alert)}
                  className="border-b border-gray-800 hover:bg-[#020617] cursor-pointer"
                >
                  <td className="p-4">{alert.repoName}</td>

                  <td
                    className={`p-4 font-semibold ${
                      alert.severity === "HIGH"
                        ? "text-red-400"
                        : alert.severity === "MEDIUM"
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  >
                    {alert.severity}
                  </td>

                  <td className="p-4 text-gray-300">
                    {alert.filesChanged.join(", ")}
                  </td>

                  <td className="p-4 text-gray-400">
                    {new Date(alert.detectedAt).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <Status status={alert.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Side drawer */}
      {selected && (
        <AlertDrawer alert={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

/* ---------- Small UI pieces ---------- */

function Summary({ title, value, color = "text-white" }) {
  return (
    <div className="bg-[#0f172a] rounded-xl p-4">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function Status({ status }) {
  const map = {
    OPEN: "text-red-400",
    APPROVED: "text-green-400",
    REJECTED: "text-yellow-400",
  };
  return <span className={`font-semibold ${map[status]}`}>{status}</span>;
}

function AlertDrawer({ alert, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
      <div className="w-[420px] bg-[#020617] h-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Drift Alert</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <Info label="Repository" value={alert.repoName} />
        <Info label="Severity" value={alert.severity} />
        <Info
          label="Detected At"
          value={new Date(alert.detectedAt).toLocaleString()}
        />
        <Info label="Status" value={alert.status} />

        <div className="mt-4">
          <p className="text-gray-400 text-sm mb-2">Files Changed</p>
          <ul className="list-disc ml-5 text-gray-300">
            {alert.filesChanged.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <p className="text-gray-500 text-xs mt-8">
          This alert is part of the immutable audit trail.
        </p>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
