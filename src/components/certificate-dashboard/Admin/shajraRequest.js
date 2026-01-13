import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getAllShajrahRequestsService,
  changeShajrahStatusService,
} from "../../../services/operations/AdminService";

export default function ShajrahRequests() {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // only date
  const formatDate = (d) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-IN");
  };

  // fetch
  const fetchData = async () => {
    if (!token) return;
    setLoading(true);

    const res = await getAllShajrahRequestsService({
      page,
      status,
      search,
      token,
    });

    console.log("GET SHAJRA RESPONSE ===>", res);

    if (res?.success) {
      setList(res.data || []);
      setPages(res.pages || 1);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, status]);

  // change status
  const handleStatus = async (id, newStatus) => {
    const res = await changeShajrahStatusService(id, newStatus, token);
    if (res?.success) fetchData();
  };

  return (
    <div className="space-y-4 text-white">

      <h2 className="text-xl font-semibold">Shajrah Requests</h2>

      {/* filters */}
      <div className="flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onBlur={fetchData}
          placeholder="Search by Client ID or Name"
          className="flex-1 rounded-md bg-richblack-800 border border-richblack-600 px-3 py-2"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md bg-richblack-800 border border-richblack-600 px-3 py-2"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="payment_pending">Payment Pending</option>
        </select>
      </div>

      {loading && <p className="text-center py-4">Loading...</p>}

      {!loading && (
        <div className="overflow-x-auto rounded-lg border border-richblack-700">

          <table className="w-full text-sm">

            <thead className="bg-richblack-800 text-richblack-200">
              <tr>
                <th className="p-2 text-left">Client ID</th>
                <th className="p-2 text-left">Full Name</th>
                <th className="p-2 text-left">Updated</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>

              {list.map((s, i) => (
                <tr key={i} className="border-t border-richblack-700">

                  <td className="p-2">{s?.client?.clientId}</td>

                  <td className="p-2">{s?.shajrah?.fullName || "-"}</td>

                  <td className="p-2">{formatDate(s?.updatedAt)}</td>

                  <td className="p-2 capitalize">{s?.shajrah?.status}</td>

                  <td className="p-2 flex gap-2">

                    <button
  onClick={() =>
    navigate("/certified/shajra", {
      state: { clientId: s?.client?.clientId },
    })
  }
  className="text-xs bg-yellow-400 text-black px-3 py-1 rounded"
>
  View Client
</button>


                    <button
                      onClick={() => handleStatus(s._id, "approved")}
                      className="text-xs bg-green-600 px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatus(s._id, "rejected")}
                      className="text-xs bg-pink-600 px-3 py-1 rounded"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => handleStatus(s._id, "payment_pending")}
                      className="text-xs bg-blue-600 px-3 py-1 rounded"
                    >
                      Payment Pending
                    </button>

                  </td>

                </tr>
              ))}

              {list.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-3 text-center">
                    No records found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>
      )}

      {/* pagination */}
      <div className="flex justify-between">

        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-richblack-700 px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <p>Page {page} of {pages}</p>

        <button
          onClick={() => setPage((p) => (p < pages ? p + 1 : p))}
          disabled={page === pages}
          className="bg-richblack-700 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}
