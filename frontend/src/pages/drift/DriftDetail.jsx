import { useDrift } from "../../context/DriftContext";
import { useAuth } from "../../components/AuthContext";

export default function DriftDetail({ setPage }) {
  const {
    selectedDrift,
    setSelectedDrift,
    drifts,
    setDrifts,
    changeRequests,
    setChangeRequests
  } = useDrift();

  const { user } = useAuth();

  if (!selectedDrift) {
    return <p className="text-gray-400">No drift selected</p>;
  }

  // Developer/Admin raises change request
  const raiseChangeRequest = () => {
    const request = {
      id: crypto.randomUUID(),
      driftId: selectedDrift.id,
      filePath: selectedDrift.filePath,
      requestedBy: user.email,
      requestedAt: new Date().toLocaleString(),
      status: "PENDING"
    };
    setChangeRequests([...changeRequests, request]);
    alert("Change request raised");
  };

  // Admin approves change
  const approveChange = () => {
  // Update drift list
  const updatedDrifts = drifts.map((d) =>
    d.id === selectedDrift.id
      ? { ...d, authorized: true }
      : d
  );

  setDrifts(updatedDrifts);

  // 🔑 UPDATE SELECTED DRIFT ALSO
  const updatedSelected = updatedDrifts.find(
    (d) => d.id === selectedDrift.id
  );
  setSelectedDrift(updatedSelected);

  // Update change request
  setChangeRequests(
    changeRequests.map((cr) =>
      cr.driftId === selectedDrift.id
        ? { ...cr, status: "APPROVED" }
        : cr
    )
  );

  alert("Change approved");
};


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-yellow-400">
        Drift Details
      </h2>

      <div className="border border-yellow-500 p-6 rounded space-y-2">
        <p><b>File:</b> {selectedDrift.filePath}</p>
        <p><b>Change Type:</b> {selectedDrift.changeType}</p>
        <p><b>Severity:</b> {selectedDrift.severity}</p>

        <p>
          <b>Status:</b>{" "}
          {selectedDrift.authorized ? (
            <span className="text-green-400">Authorized</span>
          ) : (
            <span className="text-red-400">Unauthorized</span>
          )}
        </p>

        {/* Developer / Admin */}
        {!selectedDrift.authorized &&
          (user.role === "developer" ||
            user.role === "admin") && (
            <button
              onClick={raiseChangeRequest}
              className="mt-4 bg-yellow-600 px-4 py-2 rounded"
            >
              Raise Change Request
            </button>
          )}

        {/* Admin only */}
        {!selectedDrift.authorized &&
          user.role === "admin" && (
            <button
              onClick={approveChange}
              className="mt-4 ml-3 bg-green-600 px-4 py-2 rounded"
            >
              Approve Change
            </button>
          )}

        <button
          onClick={() => setPage("drift")}
          className="block mt-6 text-green-400"
        >
          ← Back to Drift Alerts
        </button>
      </div>
    </div>
  );
}
