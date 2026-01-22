import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { setClient } from "../../../../slices/clientSlice";

import logo from "../../../../assests/head logo2.png";
import logo2 from "../../../../assests/head logo.png";
import staticqr from "../../../../assests/buttonImage/createClientQR2.jpeg";

export default function CreateClientPage({ loading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(false);
  
  const {
    personalDetails,
    qualification,
    occupation,
    physicalCondition,
    maritalStatus,
    fatherGuardian,
    grandParent,
    bankDetails,

    personalDetailsId,
    qualificationId,
    occupationId,
    physicalConditionId,
    maritalStatusId,
    fatherGuardianId,
    grandParentId,
    bankDetailsId,
  } = useSelector((state) => state.client);

  console.log("📌 FULL REDUX DATA", {
    personalDetails,
    qualification,
    occupation,
    physicalCondition,
    maritalStatus,
    fatherGuardian,
    grandParent,
    bankDetails,
  });

const handleCreateClient = async () => {
    if (!agreement) {
      toast.error("Please accept the agreement before proceeding.");
      return;
    }

    // ⭐ payload ready – this will be created AFTER payment
    const clientPayload = {
      personalDetailsId,
      qualificationId,
      occupationId,
      physicalConditionId,
      maritalStatusId,
      fatherGuardianId,
      grandParentId,
      bankDetailsId,
    };

    // save redux
    dispatch(setClient(clientPayload));

    // ⭐ redirect to universal payment page
    navigate("/paymentPage", {
  state: {
    serviceType: "client",
    price: 13,
    qr: staticqr,   // yahan apni image bhejna
    payload: clientPayload,
  },
});

  };



  return (
    <div className="bg-white w-[794px] mx-auto my-10 p-10 border border-gray-300 shadow-lg box-border max-[900px]:w-[95%]">

      <div className="flex justify-between items-center mb-4">
        <img src={logo} className="w-[50px]" alt="logo" />
        <img src={logo2} className="w-[200px]" alt="logo2" />
      </div>
      <hr />

      <Section title="Personal Details">
        <DetailsGrid obj={personalDetails} />
      </Section>

      <Section title="Qualification Details">
        <DetailsGrid obj={qualification} />
      </Section>

      <Section title="Occupation / Job Details">
        <DetailsGrid obj={occupation} />
      </Section>

      <Section title="Physical / Disability Details">
        <DetailsGrid obj={physicalCondition} />
      </Section>

      <Section title="Marital Status">
        <DetailsGrid obj={maritalStatus} />
      </Section>

      <Section title="Father / Guardian / Spouse">
        <DetailsGrid obj={fatherGuardian} />
      </Section>

      <Section title="Grand Parent">
        <DetailsGrid obj={grandParent} />
      </Section>

      <Section title="Bank Details">
        <DetailsGrid obj={bankDetails} />
      </Section>

      <Agreement
        agreement={agreement}
        setAgreement={setAgreement}
        handleCreateClient={handleCreateClient}
        loading={loading}
      />
    </div>
  );
}

/* ========= REUSABLE SECTION WRAPPER ========= */

const Section = ({ title, children }) => (
  <div className="border border-black mb-6">
    <div className="px-3 py-2 border-b border-black font-bold text-sm">
      {title}
    </div>
    <div>{children}</div>
  </div>
);

/* ========= UNIVERSAL OBJECT GRID ========= */

// ⭐ AUTO FIELD RENDERER WITH NESTED OBJECT SUPPORT
const DetailsGrid = ({ obj }) => {
  if (!obj) return <div className="p-3">No data</div>;

  const renderValue = (value) => {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) return "-";

    // Date string cut to yyyy-mm-dd
    if (typeof value === "string" && value.includes("T")) {
      return value.substring(0, 10);
    }

    // If nested object → render inner table
    if (typeof value === "object" && !Array.isArray(value)) {
      return (
        <div className="ml-2 border border-gray-400">
          {Object.entries(value).map(([k, v], i) => {
            const nestedLabel = k
              .replace(/_/g, " ")
              .replace(/([A-Z])/g, " $1")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <div
                key={i}
                className="grid grid-cols-[40%_60%] border-b last:border-b-0"
              >
                <div className="px-2 py-1 border-r font-medium">
                  {nestedLabel}
                </div>
                <div className="px-2 py-1">
                  {renderValue(v)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return String(value);
  };

  return (
    <div className="border border-black">
      {Object.entries(obj).map(([key, value], i) => {
        if (["_id", "__v"].includes(key)) return null;

        const label = key
          .replace(/_/g, " ")
          .replace(/([A-Z])/g, " $1")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <div
            key={i}
            className="grid grid-cols-[35%_65%] border-b last:border-b-0"
          >
            <div className="px-3 py-2 border-r font-semibold">
              {label}
            </div>

            <div className="px-3 py-2">
              {renderValue(value)}
            </div>
          </div>
        );
      })}
    </div>
  );
};


/* ========= AGREEMENT ========= */

const Agreement = ({ agreement, setAgreement, handleCreateClient, loading }) => (
  <>
    <div className="border border-black mt-6">
      <div className="px-3 py-2 border-b border-black font-bold text-sm">
        Declaration / Agreement
      </div>

      <div className="px-4 py-3 text-sm">
        <p>
          I hereby declare that the information provided above is true and correct
          to the best of my knowledge.
        </p>

        <div className="flex items-center gap-3 mt-4">
          <input
            type="checkbox"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
          />
          <span>I agree to the above declaration.</span>
        </div>
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button
        onClick={handleCreateClient}
        disabled={loading}
        className="border border-black px-6 py-2 text-sm font-semibold hover:bg-gray-100 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Submit Application"}
      </button>
    </div>
  </>
);
