import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  getPaymentSummaryService,
  getAllPaymentService,
} from "../../../services/operations/clientpay";

export default function PaymentSummaryPage() {
  const [successData, setSuccessData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [totals, setTotals] = useState({});
  const [allPayments, setAllPayments] = useState([]);
  const [showAllPayments, setShowAllPayments] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getPaymentSummaryService();

    if (!res?.success) return;
    console.log("💳 Payment Dashboard", res);
    const s = res.data;

    // SUCCESS PIE DATA
    setSuccessData([
      { name: "Client Service", value: s.success.client },
      { name: "Shajrah Service", value: s.success.shajrah },
      { name: "Marital Service", value: s.success.marital },
    ]);

    // PENDING PIE DATA
    setPendingData([
      { name: "Client Service", value: s.pending.client },
      { name: "Shajrah Service", value: s.pending.shajrah },
      { name: "Marital Service", value: s.pending.marital },
    ]);

    // TOTALS
    setTotals({
      successTotal: s.success.total,
      pendingTotal: s.pending.total,
      grandTotal: s.grandTotal,
    });
    const allRes = await getAllPaymentService();
    if (allRes?.success) {
      setAllPayments(allRes.data.payments);
    }
  };

  // ----------- UNIQUE COLOR FUNCTION -----------
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

  return (
    <div className="p-4 md:p-6 text-white space-y-8 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold">💳 Payment Dashboard</h2>

      {/* ===== TOTAL CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-richblack-800 p-4 rounded-xl text-center">
          <p className="text-pure-greys-200">✔️ Success Total</p>
          <h2 className="text-3xl font-bold text-caribbeangreen-100">
            ₹ {totals.successTotal || 0}
          </h2>
        </div>

        <div className="bg-richblack-800 p-4 rounded-xl text-center">
          <p className="text-pure-greys-200">⏳ Pending Total</p>
          <h2 className="text-3xl font-bold text-yellow-100">
            ₹ {totals.pendingTotal || 0}
          </h2>
        </div>

        <div className="bg-richblack-800 p-4 rounded-xl text-center">
          <p className="text-pure-greys-200">💠 Grand Total</p>
          <h2 className="text-3xl font-bold text-pink-100">
            ₹ {totals.grandTotal || 0}
          </h2>
        </div>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SUCCESS PIE */}
        <div className="bg-richblack-800 p-4 rounded-xl text-center">
          <h3 className="text-lg mb-2">✔️ Successful Payments</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={successData} outerRadius={110} label>
                {successData.map((e, i) => (
                  <Cell key={i} fill={stringToColor(e.name)} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* PENDING PIE */}
        <div className="bg-richblack-800 p-4 rounded-xl text-center">
          <h3 className="text-lg mb-2">⏳ Pending Payments</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={pendingData} outerRadius={110} label>
                {pendingData.map((e, i) => (
                  <Cell key={i} fill={stringToColor(e.name)} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-richblack-800 p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">📄 All Payments Details</h3>

        {allPayments.length === 0 ? (
          <p className="text-sm text-gray-400">No payment data found</p>
        ) : (
          <div className="space-y-4">
            {(showAllPayments ? allPayments : allPayments.slice(0, 3)).map(
              (p, i) => (
                <div
                  key={i}
                  className="border border-richblack-600 rounded-lg p-3 text-sm space-y-1"
                >
                  {/* ROW 1 */}
                  <div className="flex justify-between">
                    <span className="text-pure-greys-300">Client ID</span>
                    <span className="font-semibold">{p.clientIdString}</span>
                  </div>

                  {/* ROW 2 */}
                  <div className="flex justify-between">
                    <span className="text-pure-greys-300">Service Type</span>
                    <span className="capitalize">{p.serviceType}</span>
                  </div>

                  {/* ROW 3 */}
                  <div className="flex justify-between">
                    <span className="text-pure-greys-300">Payment Mode</span>
                    <span className="uppercase">{p.mode}</span>
                  </div>

                  {/* ROW 4 */}
                  <div className="flex justify-between">
                    <span className="text-pure-greys-300">Amount</span>
                    <span className="font-bold text-caribbeangreen-100">
                      ₹ {p.amount}
                    </span>
                  </div>

                  {/* ROW 5 */}
                  <div className="flex justify-between">
                    <span className="text-pure-greys-300">Status</span>
                    <span
                      className={`font-semibold ${
                        p.status === "success"
                          ? "text-caribbeangreen-100"
                          : "text-yellow-100"
                      }`}
                    >
                      {p.status.toUpperCase()}
                    </span>
                  </div>

                  {/* ROW 6 */}
                  <div className="flex justify-between">
                    <span className="text-pure-greys-300">Transaction ID</span>
                    <span className="font-mono">{p.transactionId}</span>
                  </div>

                  {/* ROW 7 */}
                  <div className="flex justify-between">
                    <span className="text-pure-greys-300">Beneficiary</span>
                    <span>{p.beneficiaryName}</span>
                  </div>

                  {/* ROW 8 */}
                  <div className="flex justify-between">
                    <span className="text-pure-greys-300">Payment Date</span>
                    <span>{new Date(p.paymentDate).toLocaleDateString()}</span>
                  </div>
                </div>
              )
            )}

            {/* SEE MORE / SEE LESS */}
            {allPayments.length > 3 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllPayments(!showAllPayments)}
                  className="text-sm text-blue-400 hover:underline"
                >
                  {showAllPayments ? "See Less ▲" : "See More ▼"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
