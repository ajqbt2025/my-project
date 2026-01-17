import { useEffect, useState ,useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { 
  getAllClientsService,
  changeClientStatusService,
  deleteClientService
} from "../../../services/operations/AdminService";

export default function AllClients() {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log("All Clients....token",token)
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [copiedId, setCopiedId] = useState(null);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const fetchClients = useCallback(async () => {
    if (!token) return;

    setLoading(true);

    try {
      const res = await getAllClientsService(page, token);

      if (res?.success) {
        setClients(res.clients || []);
        setPages(res.pages || 1);
      }
    } catch (error) {
      console.error("Fetch clients error:", error);
    } finally {
      setLoading(false);
    }
  }, [page, token]);

  // run on page change
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const filtered = clients.filter((c) =>
    (c?.clientId || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(text);

    setTimeout(() => setCopiedId(null), 1200);
  };

  const handleStatusChange = async (clientId, status) => {
    const res = await changeClientStatusService(clientId, status, token);
    if (res?.success) fetchClients();
  };

  const handleDelete = async (clientId) => {
    if (!window.confirm("Are you sure?")) return;
    const res = await deleteClientService(clientId, token);
    if (res?.success) fetchClients();
  };

  return (
    <div className="space-y-4 text-white">

      <h2 className="text-xl font-semibold">All Clients</h2>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Client ID"
        className="w-full rounded-md bg-richblack-800 border border-richblack-600 px-3 py-2"
      />

      {loading && <p className="text-center py-4">Loading...</p>}

      {!loading && (
        <div className="overflow-x-auto rounded-lg border border-richblack-700">
          <table className="w-full text-sm">

            <thead className="bg-richblack-800 text-richblack-200">
              <tr>
                <th className="p-2 text-left">Client ID</th>
                <th className="p-2 text-left">Updated Date</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((c, i) => (
                <tr key={i} className="border-t border-richblack-700">

                  {/* ID + copy icon */}
                  <td className="p-2 flex items-center gap-2">

                    {c?.clientId}

                    <button
                      onClick={() => handleCopy(c?.clientId)}
                      className="text-xs border border-richblack-600 px-2 py-1 rounded hover:bg-richblack-700"
                    >
                      📋
                    </button>

                    {copiedId === c?.clientId && (
                      <span className="text-green-400 text-xs">
                        Copied!
                      </span>
                    )}

                  </td>

                  <td className="p-2">{formatDate(c?.updatedAt)}</td>

                  <td className="p-2">
                    <select
                      value={c?.status}
                      onChange={(e) =>
                        handleStatusChange(c.clientId, e.target.value)
                      }
                      className="bg-richblack-800 border border-richblack-600 px-2 py-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                  <td className="p-2 flex gap-2">

                    <button
                      onClick={() => navigate(`/certified/client/${c._id}`)}
                      className="text-xs bg-yellow-400 text-black px-3 py-1 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(c.clientId)}
                      className="text-xs bg-pink-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-3 text-center">
                    No clients found
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center">

        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-richblack-700 disabled:opacity-50"
        >
          Prev
        </button>

        <p>Page {page} of {pages}</p>

        <button
          onClick={() => setPage((p) => (p < pages ? p + 1 : p))}
          disabled={page === pages}
          className="px-3 py-1 rounded bg-richblack-700 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}
