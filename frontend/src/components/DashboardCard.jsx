export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-green-400 mt-2">
        {value}
      </h3>
    </div>
  );
}
