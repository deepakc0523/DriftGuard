export default function Navbar({ onLogin }) {
  return (
    <nav className="flex items-center justify-between px-8 py-5">
      <div className="text-green-400 font-semibold text-lg select-none">
        🛡️ DriftGuard
      </div>

      <div className="hidden md:flex gap-6 text-gray-300 text-sm">
        <a href="#features" className="hover:text-white cursor-pointer">
          Features
        </a>
        <a href="#architecture" className="hover:text-white cursor-pointer">
          Architecture
        </a>
        <a href="#workflow" className="hover:text-white cursor-pointer">
          Workflow
        </a>
      </div>

      {/* ✅ Cursor becomes hand on hover */}
      <button
        onClick={onLogin}
        className="bg-green-500 text-black px-4 py-2 rounded font-semibold cursor-pointer hover:bg-green-400 transition"
      >
        Login
      </button>
    </nav>
  );
}
