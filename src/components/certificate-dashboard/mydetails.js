import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMyClients } from "../../services/operations/CertifiedService";
import { useNavigate } from "react-router-dom";

const MyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await dispatch(fetchMyClients());
        if (res?.success) {
          setClients(res.data);
        }
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-richblack-900 px-6 py-8 font-inter">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* 🔖 HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-richblack-5">
            My Created Clients
          </h1>
          <p className="text-sm text-richblack-300">
            List of all clients created by you
          </p>
        </div>

        {/* 📋 TABLE CARD */}
        <div className="overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-[8%_34%_28%_30%] bg-richblack-700 px-5 py-3 text-sm font-semibold text-richblack-50">
            <span>#</span>
            <span>Client Name</span>
            <span>Mobile Number</span>
            <span>Status</span>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="px-5 py-6 text-center text-sm text-richblack-300">
              Loading clients...
            </div>
          )}

          {/* EMPTY */}
          {!loading && clients.length === 0 && (
            <div className="px-5 py-6 text-center text-sm text-richblack-300">
              No clients found
            </div>
          )}

          {/* ROWS */}
          {!loading &&
            clients.map((client, index) => (
              <div
                key={client._id}
                onClick={() =>
                  navigate(`/certified/client/${client._id}`)
                }
                className="
                  grid grid-cols-[8%_34%_28%_30%] items-center
                  px-5 py-3 text-sm
                  border-t border-richblack-700
                  cursor-pointer transition
                  hover:bg-richblack-700
                "
              >
                <span className="text-richblack-300">
                  {index + 1}
                </span>

                <span className="font-medium text-richblack-5">
                  {client.personalDetails?.fullName || "-"}
                </span>

                <span className="text-richblack-100">
                  {client.personalDetails?.mobileNum || "-"}
                </span>

                <StatusBadge status={client.status} />
                
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyDetails;

/* ---------------- STATUS BADGE ---------------- */

const StatusBadge = ({ status }) => {
  const base =
    "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold capitalize";

  if (status === "approved") {
    return (
      <span className={`${base} bg-caribbeangreen-100 text-caribbeangreen-700`}>
        Approved
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className={`${base} bg-pink-100 text-pink-700`}>
        Rejected
      </span>
    );
  }

  return (
    <span className={`${base} bg-yellow-100 text-yellow-700`}>
      Pending
    </span>
  );
};
