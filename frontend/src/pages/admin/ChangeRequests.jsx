import { useChangeRequests } from "../../context/ChangeRequestContext";

export default function ChangeRequests() {
  const {
    changeRequests,
    loading,
    updateChangeRequestStatus,
  } = useChangeRequests();

  if (loading) return <p>Loading change requests...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Change Requests
      </h1>

      {changeRequests.length === 0 && (
        <p>No change requests found.</p>
      )}

      {changeRequests.map((cr) => (
        <div
          key={cr._id}
          className="border rounded p-4 mb-4"
        >
          <p>
            <strong>Repo:</strong> {cr.repo.name}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">
              {cr.status}
            </span>
          </p>
          <p>
            <strong>Reason:</strong> {cr.reason}
          </p>

          {cr.status === "pending" && (
            <div className="mt-3 flex gap-2">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() =>
                  updateChangeRequestStatus(cr._id, "approved")
                }
              >
                Approve
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() =>
                  updateChangeRequestStatus(cr._id, "rejected")
                }
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
