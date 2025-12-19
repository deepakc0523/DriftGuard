import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]); // registered users
  const [user, setUser] = useState(null); // logged-in user

  const signup = (email, password, role) => {
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return { success: false, message: "User already exists" };
    }

    setUsers([...users, { email, password, role }]);
    return { success: true };
  };

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: "Invalid credentials" };
    }

    setUser(found);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, users, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
