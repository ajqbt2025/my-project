import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/common/Footer";
import { searchCertificateByClientIdService } from "../services/operations/ClientService";
import { toast } from "react-hot-toast";

import client from "../assests/buttonImage/student-section.png";
import certificate from "../assests/buttonImage/certificate.png";
import MultiSearchBar from "./ClientSearchBar";
import { ACCOUNT_TYPE } from "../utils/constants";
import { useSelector } from "react-redux";
import PublicNotification from "../components/common/Notification"
const Home = () => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!clientId.trim()) return;

    setLoading(true);
    const data = await searchCertificateByClientIdService(clientId,token);
    setResult(data);
    setLoading(false);
  };
  const userType = user?.accountType;
  return (
    <div>
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
    <PublicNotification/>
        <div className="w-full max-w-2xl mt-8">
          <MultiSearchBar
            loading={loading}
            onSearch={handleSearch}
            buttonText="Search"
            fields={[
              {
                label: "Client ID",
                value: clientId,
                onChange: setClientId,
                placeholder: "Enter Client ID...",
              },
            ]}
          />

          {loading && <p className="text-yellow-200 mt-3">Searching...</p>}

          {/* ⭐ RESULT CARD */}
          {!loading && result?.success && (
            <div className="bg-richblack-800 mt-5 p-5 rounded border border-richblack-600">
              <h2 className="text-xl font-semibold mb-2">Client Details</h2>

              <p>
                <b>Client ID:</b> {result.clientId}
              </p>
              <p>
                <b>Name:</b> {result.name}
              </p>
              <p>
                <b>Overall Status:</b> {result.overallStatus}
              </p>

              <div className="h-[1px] bg-richblack-700 my-3" />

              {/* ⭐ ID CARD */}
              <h3 className="text-yellow-300 font-semibold">ID Card</h3>
              <p>Status: {result.idCard?.status}</p>

              {result.idCard?.status === "issued" && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() =>
                      navigate("/certified/Id-card", {
                        state: { clientId: result.clientId },
                      })
                    }
                    className="
                      bg-yellow-100 text-black px-3 py-1
                      rounded-xl font-medium
                      shadow-[0_0_10px_#FFD60A70]
                      hover:bg-yellow-50
                    "
                  >
                    View ID Card
                  </button>

                  {userType === ACCOUNT_TYPE.ADMIN && (
                    <button
                      onClick={() =>
                        navigate("/certified/uploadIdCard", {
                          state: { clientId: result.clientId },
                        })
                      }
                      className="bg-blue-100 text-black px-3 py-1 rounded-xl"
                    >
                      Upload ID Card
                    </button>
                  )}
                </div>
              )}

              <div className="h-[1px] bg-richblack-700 my-3" />

              {/* ⭐ SHAJRA */}
              <h3 className="text-green-300 font-semibold">Shajra</h3>
              <p>Status: {result.shajra?.status}</p>
              <p>Family ID: {result.shajra?.familyId || "—"}</p>

              {result.shajra?.status !== "not applied" && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() =>
                      navigate("/certified/shajra", {
                        state: {
                          clientId: result.clientId,
                          familyId: result.shajra?.familyId || "",
                        },
                      })
                    }
                    className="
                    bg-caribbeangreen-100 text-black px-3 py-1
                    rounded-xl shadow-[0_0_12px_#06D6A066]
                    hover:bg-caribbeangreen-50
                  "
                  >
                    View Shajrah
                  </button>
                  {userType === ACCOUNT_TYPE.ADMIN && (
                    <button
                      onClick={() =>
                        navigate("/certified/uploadIdCard", {
                          state: { clientId: result.clientId },
                        })
                      }
                      className="bg-blue-100 text-black px-3 py-1 rounded-xl"
                    >
                      Upload Shajra
                    </button>
                  )}
                </div>
              )}

              <div className="h-[1px] bg-richblack-700 my-3" />

              {/* ⭐ MARITAL CERTIFICATES */}
              <h3 className="text-blue-300 font-semibold">
                Marital Certificate
              </h3>

              {Array.isArray(result.marital) && result.marital.length > 0 ? (
                <div className="space-y-3">
                  {result.marital.map((m, index) => (
                    <div
                      key={index}
                      className="border border-richblack-700 p-3 rounded"
                    >
                      <p>
                        <b>Certificate #{index + 1}</b>
                      </p>
                      <p>Status: {m.status}</p>
                      <p>Register No: {m.registerNumber || "—"}</p>
                      <p>Dulha Aadhaar: {m.groomAadhaar || "—"}</p>

                      {m.status === "approved" && (
                        <button
                          onClick={() =>
                            navigate("/certified/meritalCertificate", {
                              state: {
                                registerNumber: m.registerNumber,
                                groomAadhaar: m.groomAadhaar,
                              },
                            })
                          }
                          className="
                            mt-2 bg-blue-100 text-black px-3 py-1
                            rounded-xl shadow-[0_0_12px_#118AB270]
                            hover:bg-blue-50
                          "
                        >
                          Search This Certificate
                        </button>
                      )}

                      {m.status === "pending" && (
                        <button className="mt-2 bg-yellow-100 text-black px-3 py-1 rounded-xl">
                          Pending Approval
                        </button>
                      )}

                      {m.status === "rejected" && (
                        <button className="mt-2 bg-red-100 text-black px-3 py-1 rounded-xl">
                          Rejected
                        </button>
                      )}

                      {m.status === "payment_pending" && (
                        <button className="mt-2 bg-purple-100 text-black px-3 py-1 rounded-xl">
                          Payment Pending
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No marital certificates applied</p>
              )}
            </div>
          )}
        </div>
        {/* ====== BUTTON SECTION ====== */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* 🟦 CREATE CLIENT */}
          <Link to="/notice/client">
            <div
              className="
        w-[230px] h-[120px]
        flex items-center gap-4
        p-4
        bg-richblack-800
        border border-blue-300/50
        rounded-2xl
        cursor-pointer
        transition
        hover:scale-[1.02]
        hover:shadow-[0_0_20px_#3abff880]
        hover:border-blue-100
      "
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-black">
                ➕
              </div>

              <div>
                <p className="text-blue-50 font-semibold text-sm">
                  Create Client
                </p>
                <div className="w-12 h-[2px] bg-blue-50 my-1 rounded-full" />
                <p className="text-[11px] text-richblack-200">
                  Click to register new client
                </p>
              </div>
            </div>
          </Link>

          {/* 🟢 CLIENT LIST — ADMIN ONLY */}
          {ACCOUNT_TYPE.ADMIN === userType && (
            <Link to="/admin/clients">
              <div
                className="
          w-[230px] h-[120px]
          flex items-center gap-4
          p-4
          bg-richblack-800
          border border-green-300/50
          rounded-2xl
          cursor-pointer
          transition
          hover:scale-[1.02]
          hover:shadow-[0_0_20px_#5cff9e66]
          hover:border-green-100
        "
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-black">
                  📋
                </div>

                <div>
                  <p className="text-green-50 font-semibold text-sm">
                    Client List
                  </p>
                  <div className="w-12 h-[2px] bg-green-50 my-1 rounded-full" />
                  <p className="text-[11px] text-richblack-200">
                    View all registered clients
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* 🟨 CERTIFICATE MANAGEMENT */}
          <Link to="/certified/profile">
            <div
              className="
        w-[230px] h-[120px]
        flex items-center gap-4
        p-4
        bg-richblack-800
        border border-yellow-300/50
        rounded-2xl
        cursor-pointer
        transition
        hover:scale-[1.02]
        hover:shadow-[0_0_20px_#ffd85c66]
        hover:border-yellow-100
      "
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-black">
                🧾
              </div>

              <div>
                <p className="text-yellow-50 font-semibold text-sm">
                  Certificate Management
                </p>
                <div className="w-12 h-[2px] bg-yellow-50 my-1 rounded-full" />
                <p className="text-[11px] text-richblack-200">
                  Check & manage certificates
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full max-w-xl mx-auto mt-4 rounded-2xl bg-richblack-800 border border-caribbeangreen-200 p-4 text-white shadow">
          <p className="text-sm text-caribbeangreen-100 font-semibold">
            🚀 Webora – Digital Services
          </p>

          <h2 className="text-lg font-bold mt-1">
            Website • App • Logo • Editing • Real-Estate Solutions
          </h2>

          <p className="text-pure-greys-200 text-sm mt-1">
            Apne business ko online layen – professional service ke sath
            7447733134
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
