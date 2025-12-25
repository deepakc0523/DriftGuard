import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const RepoContext = createContext();

export function RepoProvider({ children }) {
  const [repos, setRepos] = useState([]);

  // 1️⃣ Load repos from backend
  useEffect(() => {
    const loadRepos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/repos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRepos(res.data);
      } catch (err) {
        console.error("Repo fetch failed", err.response?.data || err.message);
      }
    };

    loadRepos();
  }, []);

  // 2️⃣ Add repo via backend, then reload
  const addRepo = async (repoData) => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/repos",
      repoData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // reload repos
    const res = await axios.get("http://localhost:5000/api/repos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRepos(res.data);
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
