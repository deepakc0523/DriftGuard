export default function Architecture() {
  return (
    <section
      id="architecture"
      className="py-24 bg-gradient-to-b from-black to-gray-900 text-white px-6"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          System <span className="text-green-400">Architecture</span>
        </h2>
        <p className="text-gray-400 mt-4">
          Production-grade architecture designed for enterprise scalability
        </p>
      </div>

      {/* Architecture Boxes */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="border border-gray-800 rounded-xl p-6 bg-gray-900">
          <h3 className="text-green-400 font-semibold mb-3">Frontend</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>React + Vite</li>
            <li>Tailwind CSS</li>
            <li>Real-time Dashboard</li>
            <li>Diff Visualization</li>
          </ul>
        </div>

        <div className="border border-gray-800 rounded-xl p-6 bg-gray-900">
          <h3 className="text-green-400 font-semibold mb-3">Backend API</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>Node.js / Express</li>
            <li>Git Integration</li>
            <li>Drift Detection Engine</li>
            <li>Change Workflow Logic</li>
          </ul>
        </div>

        <div className="border border-gray-800 rounded-xl p-6 bg-gray-900">
          <h3 className="text-green-400 font-semibold mb-3">Data Layer</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>PostgreSQL Database</li>
            <li>Baseline Snapshots</li>
            <li>Audit Logs</li>
            <li>Change History</li>
          </ul>
        </div>
      </div>

      {/* Flow Line */}
      <p className="text-center text-sm text-gray-500 mt-12">
        User Interface → API Layer → Data Storage → Git Repositories
      </p>
    </section>
  );
}
