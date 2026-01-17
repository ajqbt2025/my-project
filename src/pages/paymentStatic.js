import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { createPaymentService } from "../services/operations/clientpay";
import { createFullClient } from "../services/operations/ClientService";


export default function PaymentPage() {
const [showModal, setShowModal] = useState(false);
const [registerNo, setRegisterNo] = useState("");
const [beneficiaryName, setBeneficiaryName] = useState("");
const [paymentDate, setPaymentDate] = useState(
  new Date().toISOString().split("T")[0]
);

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    serviceType,
    price,
    qr,
    upiId = "raja9145@sbi",
    payload,
  } = state || {};
console.log("CLIENT PAYLOAD ===>", payload);

  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qr");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionId) {
      toast.error("Transaction ID required");
      return;
    }
    if (!beneficiaryName || !paymentDate) {
  toast.error("Beneficiary Name and Payment Date required");
  return;
}

    try {

      /* ================================
         ⭐ CREATE CLIENT AFTER PAYMENT
      ================================= */
      if (serviceType === "client") {

  // 1️⃣ Create Client First
  const clientRes = await dispatch(createFullClient(payload));

  if (!clientRes?.success) {
    toast.error("Client creation failed");
    return;
  }

  const newClientId = clientRes?.client?.clientId;   // ⭐ GET clientId
  console.log("NEW CLIENT ID ===>", newClientId);

  const payRes = await createPaymentService({
  serviceType: "client",
  clientId: newClientId,
  transactionId,
  amount: price,
  mode: paymentMethod,

  // ⭐ NEW REQUIRED FIELDS
  beneficiaryName,
  paymentDate,
});


  if (!payRes?.success) {
    toast.error("Payment save failed");
    return;
  }

  toast.success("Client created and payment saved successfully");
  navigate("/certified/profile");
  return;
}


      /* ================================
         ⭐ SHAJRAH PAYMENT
      ================================= */
      if (serviceType === "shajrah") {
        const res = await createPaymentService({
  serviceType: "shajrah",
  clientId: payload?.clientId,
  draftId: payload?.draftId,
  transactionId,
  amount: price,
  mode: paymentMethod,

  // ⭐ NEW REQUIRED FIELDS
  beneficiaryName,
  paymentDate,
});


        if (res?.success) {
          toast.success("Payment successful — Shajrah submitted");
          navigate("/certified/shajra");
          return;
        }

        toast.error("Shajrah payment failed");
        return;
      }

      /* ================================
         ⭐ MARITAL CERTIFICATE PAYMENT
      ================================= */
   if (serviceType === "marital") {

  const res = await createPaymentService({
  serviceType: "marital",
  clientId: payload?.clientId,
  draftId: payload?.draftId,
  transactionId,
  amount: price,
  mode: paymentMethod,

  // ⭐ NEW REQUIRED FIELDS
  beneficiaryName,
  paymentDate,
});

  console.log("merital after payment res",res)
  if (res?.success) {

    toast.success("Payment successful");

    // ⭐ REGISTER NUMBER FROM RESPONSE
    setRegisterNo(res?.registerNumber || res?.data?.registerNumber);

    // ⭐ OPEN MODAL
    setShowModal(true);
    
    return;
  }

  toast.error("Marital certificate payment failed");
  return;
}



    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-richblack-800 py-10 font-inter">

      <div className="max-w-xl mx-auto bg-richblack-900 rounded-2xl shadow-xl p-8 border border-richblack-700">

        <h2 className="text-2xl text-center font-bold text-caribbeangreen-100 mb-5">
          Payment for {serviceType}
        </h2>

        <p className="text-center text-yellow-50 text-xl font-bold mb-4">
          ₹{price}
        </p>

        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setPaymentMethod("qr")}
            className={`px-4 py-2 rounded-lg border 
              ${paymentMethod === "qr"
                ? "bg-caribbeangreen-200 text-black font-bold"
                : "bg-richblack-700 text-white"}`}
          >
            Pay by QR
          </button>

          <button
            onClick={() => setPaymentMethod("upi")}
            className={`px-4 py-2 rounded-lg border 
              ${paymentMethod === "upi"
                ? "bg-caribbeangreen-200 text-black font-bold"
                : "bg-richblack-700 text-white"}`}
          >
            Pay by UPI ID / Number
          </button>
        </div>

        {paymentMethod === "qr" && (
          <div className="text-center">
            <img
              src={qr}
              alt="payment-qr"
              className="w-60 h-60 mx-auto rounded-xl border border-richblack-600"
            />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="text-center bg-richblack-800 border border-richblack-600 rounded-xl p-4">
            <p className="text-white text-lg font-semibold">
              Pay to UPI ID:
            </p>
            <p className="text-yellow-50 text-xl font-bold mt-2">
              {upiId}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">

          <label className="text-white font-semibold">Transaction ID</label>

          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
            className="w-full bg-richblack-800 text-white border border-richblack-600 px-4 py-2 rounded-lg"
            placeholder="Enter Transaction ID"
            required
          />
  <label className="text-white font-semibold">Beneficiary Name</label>
<input
  type="text"
  value={beneficiaryName}
  onChange={(e) => setBeneficiaryName(e.target.value)}
  className="w-full bg-richblack-800 text-white border border-richblack-600 px-4 py-2 rounded-lg"
  placeholder="Enter Beneficiary Name"
  required
/>

<label className="text-white font-semibold mt-2 block">Payment Date</label>
<input
  type="date"
  value={paymentDate}
  onChange={(e) => setPaymentDate(e.target.value)}
  className="w-full bg-richblack-800 text-white border border-richblack-600 px-4 py-2 rounded-lg"
  required
/>

          <button
            type="submit"
            className="w-full bg-caribbeangreen-200 hover:bg-caribbeangreen-300 transition text-black font-bold py-3 rounded-xl mt-2"
          >
            Confirm Payment
          </button>
        </form>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[380px] text-center">

      <h2 className="text-2xl font-bold text-green-600 mb-2">
        🎉 Congratulations!
      </h2>

      <p className="text-richblack-700 font-semibold">
        Marital Certificate Payment Successful
      </p>

      <p className="mt-3 text-lg font-bold text-blue-600">
        Register Number:
      </p>

      <p className="text-3xl font-extrabold tracking-widest text-richblack-900">
        {registerNo || "———"}
      </p>

      <button
        onClick={() => {
          setShowModal(false);
          // optional:
          navigate("/certified/meritalCertificate");
        }}
        className="mt-6 w-full bg-caribbeangreen-200 hover:bg-caribbeangreen-300 text-black font-bold py-2 rounded-xl"
      >
        OK
      </button>

    </div>

  </div>
)}

    </div>
  );
}
