export default function Navbar({ onLogin }) {
  return (
    <nav className="flex items-center justify-between px-8 py-5">
      <div className="text-green-400 font-semibold text-lg">
        🛡️ DriftGuard
      </div>

      <div className="hidden md:flex gap-6 text-gray-300 text-sm">
        <a href="#features">Features</a>
        <a href="#architecture">Architecture</a>
        <a href="#workflow">Workflow</a>
      </div>

      <button
        onClick={onLogin}
        className="bg-green-500 text-black px-4 py-2 rounded font-semibold"
      >
        Login
      </button>
    </nav>
  );
}
