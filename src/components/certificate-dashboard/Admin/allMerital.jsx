import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import {
  getAllMeritalAdminService,
  getFilteredMeritalAdminService,
} from "../../../services/operations/AdminService";

import { updateMaritalStatusService } from "../../../services/operations/AdminService";

export default function AdminMaritalList() {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [clientId, setClientId] = useState("");

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await getAllMeritalAdminService();

      if (res?.success) {
        setList(res.data);
      } else {
        toast.error("Failed to load data");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);

      const res = await getFilteredMeritalAdminService({
        status,
        registerNo,
        clientId,
      });

      if (res?.success) {
        setList(res.data);
      } else {
        toast.error("No record found");
      }

    } catch (err) {
      console.log(err);
      toast.error("Filter failed");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setStatus("");
    setRegisterNo("");
    setClientId("");
    fetchAll();
  };

  const handleStatusChange = async (id, newStatus) => {

    if (!token) {
      toast.error("Admin token missing");
      return;
    }

    const res = await updateMaritalStatusService(id, newStatus, token);

    if (res) {
      fetchAll(); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4 text-white">

      <h2 className="text-2xl font-bold">
        🕌 Admin – Marital Certificates List
      </h2>

      {/* FILTER SECTION */}
      <div className="bg-richblack-800 border border-richblack-700 rounded-xl p-4">

        <div className="grid md:grid-cols-4 gap-3">

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-richblack-900 p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="payment_pending">Payment Pending</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <input
            value={registerNo}
            onChange={(e) => setRegisterNo(e.target.value)}
            className="bg-richblack-900 p-2 rounded"
            placeholder="Register Number"
          />

          <input
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="bg-richblack-900 p-2 rounded"
            placeholder="Client ID (AJQFT-XXXXX)"
          />

          <div className="flex gap-2">
            <button
              onClick={handleFilter}
              className="bg-caribbeangreen-200 text-black w-full rounded p-2 font-semibold"
            >
              Search
            </button>

            <button
              onClick={clearFilters}
              className="bg-pink-200 text-black w-full rounded p-2 font-semibold"
            >
              Clear
            </button>
          </div>

        </div>
      </div>

      {/* LIST SECTION */}
      <div className="bg-richblack-800 border border-richblack-700 rounded-xl p-2">

        {loading ? (
          <p className="text-center p-4">Loading…</p>
        ) : list?.length === 0 ? (
          <p className="text-center p-4 text-yellow-100">
            No certificates found
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-richblack-900">
                <th className="p-2">#</th>
                <th className="p-2">Register No</th>
                <th className="p-2">Client</th>
                <th className="p-2">Groom</th>
                <th className="p-2">Bride</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item, i) => (
                <tr key={item._id} className="border-b border-richblack-700">
                  <td className="p-2">{i + 1}</td>

                  <td className="p-2 font-bold text-blue-200">
                    {item.registerNumber}
                  </td>

                  <td className="p-2">
                    {item?.client?.fullName}
                    <br />
                    <span className="text-xs text-yellow-200">
                      {item?.client?.clientId}
                    </span>
                  </td>

                  <td className="p-2">{item?.groom?.fullName}</td>
                  <td className="p-2">{item?.bride?.fullName}</td>

                  <td className="p-2 capitalize">
                    <span className="bg-richblack-700 px-2 py-1 rounded">
                      {item.status}
                    </span>
                  </td>

                  <td className="p-2">
                    {item.createdAt?.substring(0, 10)}
                  </td>

                  {/* 🔥 ACTION DROPDOWN */}
                  <td className="p-2">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      className="bg-richblack-900 p-1 rounded"
                    >
                      <option value="payment_pending">Payment Pending</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}
