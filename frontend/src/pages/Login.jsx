import { useState } from "react";
import { useAuth } from "../components/AuthContext";

export default function Login({ goToSignup }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);

    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-md border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-400">
          DriftGuard Sign In
        </h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-gray-800 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-gray-800 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-500 text-black py-3 rounded font-semibold hover:bg-green-400">
          Sign In
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={goToSignup}
            className="text-green-400 underline"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
}
