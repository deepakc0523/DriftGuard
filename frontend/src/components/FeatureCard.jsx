export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500 transition">
      <div className="text-green-400 text-2xl mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-400 text-sm">
        {description}
      </p>
    </div>
  );
}
