import React, { useEffect, useState ,useCallback} from "react";
import { useSelector } from "react-redux";

import {
  getAdminClientActivityService,
  getClientStatusReportService,
  getClientCreatedByAdminsService,
} from "../../../services/operations/AdminService";

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AdminMonitorPage() {
  const { token } = useSelector((state) => state.auth);

  const [activity, setActivity] = useState(null);
  const [statusReport, setStatusReport] = useState(null);
  const [createdByReport, setCreatedByReport] = useState(null);

  const [activeTab, setActiveTab] = useState("activity");
  const [loading, setLoading] = useState(true);

  const [showClientMore, setShowClientMore] = useState(false);
  const [showMaritalMore, setShowMaritalMore] = useState(false);
  const [showShajrahMore, setShowShajrahMore] = useState(false);

  const loadAll = useCallback(async () => {
    if (!token) return;

    setLoading(true);

    try {
      const a = await getAdminClientActivityService(token);
      const s = await getClientStatusReportService(token);
      const c = await getClientCreatedByAdminsService(token);

      if (a?.success) setActivity(a.data);
      if (s?.success) setStatusReport(s.data);
      if (c?.success) setCreatedByReport(c.data);
    } catch (error) {
      console.error("Admin monitor load error:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ✅ dependency fixed
  useEffect(() => {
    loadAll();
  }, [loadAll]);


  if (loading)
    return (
      <div className="text-white p-6 text-center text-lg">⏳ Loading…</div>
    );

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 255;
      color += ("00" + value.toString(16)).slice(-2);
    }
    return color;
  };

  const clientPie =
    statusReport?.clients?.map((x) => ({
      name: x._id,
      value: x.count,
    })) || [];

  const maritalPie =
    statusReport?.marital?.map((x) => ({
      name: x._id,
      value: x.count,
    })) || [];

  const shajrahPie =
    statusReport?.shajrah?.map((x) => ({
      name: x._id || "unknown",
      value: x.count,
    })) || [];

  const clientsToShow = showClientMore
    ? activity.clients
    : activity.clients.slice(0, 5);

  const maritalToShow = showMaritalMore
    ? activity.marital
    : activity.marital.slice(0, 5);

  const shajrahToShow = showShajrahMore
    ? activity.shajrah
    : activity.shajrah.slice(0, 5);

  // ⭐⭐⭐ MERGE ALL ADMINS (UNION) ⭐⭐⭐
  const allAdmins = {};

  (createdByReport?.clients || []).forEach((a) => {
    allAdmins[a.adminId] = {
      adminId: a.adminId,
      name: a.name,
      email: a.email,
      clients: a.count || 0,
      marital: 0,
      shajrah: 0,
    };
  });

  (createdByReport?.marital || []).forEach((m) => {
    if (!allAdmins[m.adminId]) {
      allAdmins[m.adminId] = {
        adminId: m.adminId,
        name: m.name,
        email: m.email,
        clients: 0,
        marital: m.count || 0,
        shajrah: 0,
      };
    } else {
      allAdmins[m.adminId].marital = m.count || 0;
    }
  });

  (createdByReport?.shajrah || []).forEach((s) => {
    if (!allAdmins[s.adminId]) {
      allAdmins[s.adminId] = {
        adminId: s.adminId,
        name: s.name,
        email: s.email,
        clients: 0,
        marital: 0,
        shajrah: s.count || 0,
      };
    } else {
      allAdmins[s.adminId].shajrah = s.count || 0;
    }
  });

  const admins = Object.values(allAdmins);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 text-white space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-center md:text-left">
        🛡 Admin Monitoring Dashboard
      </h2>

      {/* -------- TABS -------- */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        <button
          className={`px-3 md:px-4 py-2 rounded-xl ${
            activeTab === "activity"
              ? "bg-caribbeangreen-200 text-black"
              : "bg-richblack-700"
          }`}
          onClick={() => setActiveTab("activity")}
        >
          📌 Recent Activity
        </button>

        <button
          className={`px-3 md:px-4 py-2 rounded-xl ${
            activeTab === "status"
              ? "bg-caribbeangreen-200 text-black"
              : "bg-richblack-700"
          }`}
          onClick={() => setActiveTab("status")}
        >
          📊 Status Report
        </button>

        <button
          className={`px-3 md:px-4 py-2 rounded-xl ${
            activeTab === "admins"
              ? "bg-caribbeangreen-200 text-black"
              : "bg-richblack-700"
          }`}
          onClick={() => setActiveTab("admins")}
        >
          🧑‍💼 Admin Wise Report
        </button>
      </div>

      {/* ================== ACTIVITY TAB ================== */}
      {activeTab === "activity" && activity && (
        <div className="space-y-6">
          {/* CLIENT */}
          <div className="bg-richblack-800 p-4 rounded-xl overflow-auto">
            <h3 className="text-lg mb-2">👤 Latest Clients</h3>

            <table className="w-full text-xs  md:text-sm">
              <thead>
                <tr className="bg-richblack-900">
                  <th className="p-2">Client ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Created By</th>
                </tr>
              </thead>

              <tbody>
                {clientsToShow.map((c) => (
                  <tr key={c._id} className="border-b border-richblack-700">
                    <td className="p-2">{c.clientId}</td>
                    <td className="p-2">{c.personalDetails?.fullName}</td>
                    <td className="p-2 capitalize">{c.status}</td>
                    <td className="p-2">{c.createdBy?.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => setShowClientMore(!showClientMore)}
              className="mt-3 text-sm text-caribbeangreen-200 underline"
            >
              {showClientMore ? "Show Less" : "Show More"}
            </button>
          </div>

          {/* MARITAL */}
          <div className="bg-richblack-800 p-4 rounded-xl overflow-auto">
            <h3 className="text-lg mb-2">💍 Latest Marital Certificates</h3>

            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="bg-richblack-900">
                  <th className="p-2">Register No</th>
                  <th className="p-2">Client ID</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {maritalToShow.map((m) => (
                  <tr key={m._id} className="border-b border-richblack-700">
                    <td className="p-2">{m.registerNumber}</td>
                    <td className="p-2">{m.client?.clientId}</td>
                    <td className="p-2 capitalize">{m.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => setShowMaritalMore(!showMaritalMore)}
              className="mt-3 text-sm text-caribbeangreen-200 underline"
            >
              {showMaritalMore ? "Show Less" : "Show More"}
            </button>
          </div>

          {/* SHAJRAH */}
          <div className="bg-richblack-800 p-4 rounded-xl overflow-auto">
            <h3 className="text-lg mb-2">🌳 Latest Shajrah</h3>

            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="bg-richblack-900 ">
                  <th className="p-2">Client ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {shajrahToShow.map((s) => (
                  <tr key={s._id} className="border-b border-richblack-700">
                    <td className="p-2">{s.client?.clientId}</td>
                    <td className="p-2">{s.shajrah?.fullName}</td>
                    <td className="p-2 capitalize">{s.shajrah?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => setShowShajrahMore(!showShajrahMore)}
              className="mt-3 text-sm text-caribbeangreen-200 underline"
            >
              {showShajrahMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      )}

      {/* ================= STATUS CHARTS ================= */}
      {activeTab === "status" && statusReport && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ title: "👤 Client Status", data: clientPie },
            { title: "💍 Marital Status", data: maritalPie },
            { title: "🌳 Shajrah Status", data: shajrahPie }].map(
            (item, i) => (
              <div
                key={i}
                className="bg-richblack-800 p-4 rounded-xl text-center"
              >
                <h3 className="mb-2 font-semibold">{item.title}</h3>

                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie dataKey="value" data={item.data} outerRadius={90} label>
                      {item.data.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={stringToColor(entry.name || index.toString())}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )
          )}
        </div>
      )}

      {/* ================= ADMIN UNION TABLE ================= */}
      {activeTab === "admins" && createdByReport && (
        <div className="bg-richblack-800 p-4 rounded-xl overflow-auto">
          <h3 className="text-xl mb-3">🧑‍💼 Admin Wise Creation</h3>

          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="bg-richblack-900">
                <th className="p-2">Admin</th>
                <th className="p-2">Email</th>
                <th className="p-2">Clients</th>
                <th className="p-2">Marital</th>
                <th className="p-2">Shajrah</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((a) => (
                <tr key={a.adminId} className="border-b border-richblack-700">
                  <td className="p-2">{a.name}</td>
                  <td className="p-2">{a.email}</td>
                  <td className="p-2">{a.clients}</td>
                  <td className="p-2">{a.marital}</td>
                  <td className="p-2">{a.shajrah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
