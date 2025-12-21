import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

const ChangeRequestContext = createContext();

export const ChangeRequestProvider = ({ children }) => {
  const { token } = useAuth();
  const [changeRequests, setChangeRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChangeRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/change-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChangeRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch change requests", err);
    } finally {
      setLoading(false);
    }
  };

  const updateChangeRequestStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/change-requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI immediately
      setChangeRequests((prev) =>
        prev.map((cr) =>
          cr._id === id ? { ...cr, status } : cr
        )
      );
    } catch (err) {
      console.error("Failed to update change request", err);
    }
  };

  useEffect(() => {
    if (token) fetchChangeRequests();
  }, [token]);

  return (
    <ChangeRequestContext.Provider
      value={{
        changeRequests,
        loading,
        fetchChangeRequests,
        updateChangeRequestStatus,
      }}
    >
      {children}
    </ChangeRequestContext.Provider>
  );
};

export const useChangeRequests = () =>
  useContext(ChangeRequestContext);
