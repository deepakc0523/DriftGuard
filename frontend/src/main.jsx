import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./components/AuthContext";
import { RepoProvider } from "./components/RepoContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RepoProvider>
        <App />
      </RepoProvider>
    </AuthProvider>
  </StrictMode>
);
