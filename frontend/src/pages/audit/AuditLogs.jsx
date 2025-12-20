import { useAudit } from "../../context/AuditContext";

export default function AuditLogs() {
  const { logs } = useAudit();

  const stats = {
    total: logs.length,
    drift: logs.filter(l => l.type === "Drift").length,
    change: logs.filter(l => l.type === "Change").length,
    baseline: logs.filter(l => l.type === "Baseline").length,
    error: logs.filter(l => l.severity === "ERROR").length
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1">Audit Logs</h2>
      <p className="text-gray-400 mb-6">
        Complete history of all system actions and events
      </p>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Events" value={stats.total} />
        <StatCard label="Change Requests" value={stats.change} />
        <StatCard label="Drift Events" value={stats.drift} />
        <StatCard label="Baseline Changes" value={stats.baseline} />
        <StatCard label="Errors" value={stats.error} />
      </div>

      {/* Table */}
      <div className="border border-gray-800 rounded">
        <table className="w-full text-left">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-3">Event</th>
              <th className="p-3">Type</th>
              <th className="p-3">User</th>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Severity</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr
                key={log.id}
                className="border-t border-gray-800"
              >
                <td className="p-3">
                  <div className="font-semibold">
                    {log.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    {log.description}
                  </div>
                </td>
                <td className="p-3">{log.type}</td>
                <td className="p-3">{log.user}</td>
                <td className="p-3">{log.timestamp}</td>
                <td className="p-3">
                  <SeverityBadge level={log.severity} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && (
          <p className="p-4 text-gray-400">
            No audit logs available yet.
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function StatCard({ label, value }) {
  return (
    <div className="border border-gray-800 p-4 rounded text-center">
      <div className="text-xl font-bold">
        {value}
      </div>
      <div className="text-gray-400 text-sm">
        {label}
      </div>
    </div>
  );
}

function SeverityBadge({ level }) {
  let color = "bg-blue-600";

  if (level === "ERROR") color = "bg-red-600";
  else if (level === "WARNING") color = "bg-yellow-600";

  return (
    <span className={`${color} px-2 py-1 rounded text-sm`}>
      {level}
    </span>
  );
}
