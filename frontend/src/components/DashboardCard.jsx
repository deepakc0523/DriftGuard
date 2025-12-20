export default function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="card card-hover p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-[var(--text-muted)] mb-1">
          {title}
        </p>
        <p className="text-3xl font-bold tracking-tight">
          {value}
        </p>
      </div>

      {icon && (
        <div
          className={`
            w-12 h-12 rounded-xl
            flex items-center justify-center
            ${color}
          `}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
