import { useAuth } from "./AuthContext";

export default function Sidebar({ setPage }) {
  const { user } = useAuth();

  return (
    <aside className="w-64 min-h-screen px-6 py-8">
      {/* Brand */}
      <div className="mb-12">
        <h1 className="text-2xl font-extrabold text-[var(--accent-green)]">
          🛡 DriftGuard
        </h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          SCM Drift Control
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <SidebarButton
          label="Dashboard"
          onClick={() => setPage("overview")}
        />

        {(user.role === "admin" || user.role === "developer") && (
          <>
            <SidebarButton
              label="Repositories"
              onClick={() => setPage("repos")}
            />
            <SidebarButton
              label="Drift Alerts"
              onClick={() => setPage("drift")}
            />
            <SidebarButton
              label="Audit Logs"
              onClick={() => setPage("audit")}
            />
          </>
        )}

        {user.role === "admin" && (
          <SidebarButton
            label="Change Requests"
            onClick={() => setPage("changes")}
            highlight
          />
        )}
      </nav>
    </aside>
  );
}

/* ===== Reusable Button ===== */

function SidebarButton({ label, onClick, highlight = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-3 rounded-lg
        text-sm font-medium
        ${
          highlight
            ? "text-[var(--accent-yellow)]"
            : "text-[var(--text-primary)]"
        }
        hover:bg-white/5
        hover:text-[var(--accent-green)]
      `}
    >
      {label}
    </button>
  );
}
