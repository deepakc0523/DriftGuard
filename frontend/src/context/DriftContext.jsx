import { createContext, useContext, useState } from "react";

const DriftContext = createContext();

export const DriftProvider = ({ children }) => {
  const [baseline, setBaseline] = useState(null);
  const [drifts, setDrifts] = useState([]);
  const [selectedDrift, setSelectedDrift] = useState(null);

  // 🔐 CHANGE REQUESTS
  const [changeRequests, setChangeRequests] = useState([]);

  return (
    <DriftContext.Provider
      value={{
        baseline,
        setBaseline,
        drifts,
        setDrifts,
        selectedDrift,
        setSelectedDrift,
        changeRequests,
        setChangeRequests
      }}
    >
      {children}
    </DriftContext.Provider>
  );
};

export const useDrift = () => useContext(DriftContext);
