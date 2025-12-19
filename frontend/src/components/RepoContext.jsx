import { createContext, useContext, useState } from "react";

const RepoContext = createContext();

export function RepoProvider({ children }) {
  const [repos, setRepos] = useState([
    {
      name: "driftguard-ui",
      branch: "main",
      status: "Healthy",
    },
  ]);

  const addRepo = (repo) => {
    setRepos([...repos, repo]);
  };

  return (
    <RepoContext.Provider value={{ repos, addRepo }}>
      {children}
    </RepoContext.Provider>
  );
}

export function useRepos() {
  return useContext(RepoContext);
}
