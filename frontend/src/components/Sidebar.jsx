import { useAuth } from "./AuthContext";

export default function Sidebar({ setPage }) {
  const { user } = useAuth();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold text-green-400 mb-8">
        🛡️ DriftGuard
      </h2>

      <nav className="space-y-4">
        <button onClick={() => setPage("overview")} className="block text-left w-full hover:text-green-400">
          Dashboard
        </button>

        <button onClick={() => setPage("repos")} className="block text-left w-full hover:text-green-400">
          Repositories
        </button>

        <button onClick={() => setPage("drift")} className="block text-left w-full hover:text-green-400">
          Drift Alerts
        </button>

        <button onClick={() => setPage("audit")} className="block text-left w-full hover:text-green-400">
          Audit Logs
        </button>

        {/* Admin only */}
        {user.role === "admin" && (
          <button onClick={() => setPage("changes")} className="block text-left w-full hover:text-green-400">
            Change Requests
          </button>
        )}
      </nav>
    </div>
  );
}
