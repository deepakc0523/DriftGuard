import { useEffect, useState } from "react";
import { useAuth } from "./components/AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user } = useAuth();
  const [page, setPage] = useState("landing");

  // ✅ When user logs out → go back to Landing
  useEffect(() => {
    if (!user) {
      setPage("landing");
    }
  }, [user]);

  // Logged in → Dashboard
  if (user) return <Dashboard />;

  if (page === "login") {
    return <Login goToSignup={() => setPage("signup")} />;
  }

  if (page === "signup") {
    return (
      <Signup
        onSuccess={() => setPage("login")}
        goToLogin={() => setPage("login")}
      />
    );
  }

  return <Landing onLogin={() => setPage("login")} />;
}

export default App;
