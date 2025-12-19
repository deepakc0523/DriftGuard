import Navbar from "../components/Navbar";

export default function Hero({ onLogin }) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Top Navigation */}
      <Navbar onLogin={onLogin} />
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-32">
        {/* Tagline */}
        <span className="text-green-400 text-sm mb-4 tracking-wide">
          ⚡ Enterprise-Grade SCM Platform
        </span>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Intelligent{" "}
          <span className="text-green-400">Change Control</span>
          <br />
          & Drift Detection
        </h1>

        {/* Description */}
        <p className="text-gray-400 max-w-2xl mt-6">
          DriftGuard helps teams monitor Git repositories, establish approved
          configuration baselines, detect unauthorized changes, and enforce
          structured change management workflows.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button className="bg-green-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-green-400 transition">
            Launch Platform →
          </button>

          <a
            href="#architecture"
            className="border border-gray-600 px-6 py-3 rounded-md hover:border-white transition"
          >
            View Architecture
          </a>
        </div>
      </div>
    </section>
  );
}
