import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./components/AuthContext";
import { RepoProvider } from "./components/RepoContext";
import { AuditProvider } from "./context/AuditContext";
import { DriftProvider } from "./context/DriftContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RepoProvider>
        <AuditProvider>
          <DriftProvider>
            <App />
          </DriftProvider>
        </AuditProvider>
      </RepoProvider>
    </AuthProvider>
  </StrictMode>
);
