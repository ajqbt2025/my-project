import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

import {
  getMaritalCertificateByRegisterNoService,
} from "../../services/operations/CertifiedService";

import ExistingDetails from "./meritalSection/ExistingDetails";
import MaritalForm from "./meritalSection/MaritalForm";
import MultiSearchBar from "../../pages/ClientSearchBar";

export default function MaritalCertificatePage() {
  const location = useLocation();

  const [registerNo, setRegisterNo] = useState("");
  const [groomAadhaar, setGroomAadhaar] = useState("");

  const [maritalDetails, setMaritalDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 📌 get data from navigation
  useEffect(() => {
    if (location.state) {
      setRegisterNo(location.state.registerNumber || "");
      setGroomAadhaar(location.state.groomAadhaar || "");
    }
  }, [location.state]);

  // 🔍 SEARCH (SINGLE SOURCE OF TRUTH)
  const handleSearch = useCallback(async () => {
    const reg = registerNo?.toString().trim();
    const aad = groomAadhaar?.toString().trim();

    if (!reg || !aad) {
      toast.error("Register Number aur Dulhe ka Aadhaar dono required");
      return;
    }

    setMaritalDetails(null);

    const res = await getMaritalCertificateByRegisterNoService({
      registerNumber: reg,
      groomAadhaar: aad,
    });

    if (res?.success) {
      setMaritalDetails(res.maritalCertificate);
      toast.success("Certificate found");
    } else {
      toast.error("No record found");
    }
  }, [registerNo, groomAadhaar]);

  // 🚀 auto search when both available
  useEffect(() => {
    if (registerNo && groomAadhaar) {
      handleSearch();
    }
  }, [registerNo, groomAadhaar, handleSearch]);

  const handleClear = () => {
    setRegisterNo("");
    setGroomAadhaar("");
    setMaritalDetails(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      <MultiSearchBar
        loading={false}
        onSearch={handleSearch}
        buttonText="Search Certificate"
        fields={[
          {
            label: "Register Number",
            value: registerNo,
            onChange: setRegisterNo,
            placeholder: "Enter Register Number (00001)",
          },
          {
            label: "Groom Aadhaar Number",
            value: groomAadhaar,
            onChange: setGroomAadhaar,
            placeholder: "Enter Dulhe ka Aadhaar Number",
          },
        ]}
      />

      <div className="flex gap-3">
        <button
          onClick={() => setShowForm(true)}
          className="rounded bg-caribbeangreen-200 text-black px-4 py-2 font-semibold"
        >
          Apply New Certificate
        </button>

        <button
          onClick={handleClear}
          className="rounded bg-pink-200 text-black px-4 py-2 font-semibold"
        >
          Clear Search
        </button>
      </div>

      {maritalDetails && (
        <ExistingDetails maritalDetails={maritalDetails} />
      )}

      {showForm && (
        <MaritalForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}




  return (
    <div className="max-w-5xl mx-auto space-y-6">

    <MultiSearchBar
        loading={false}
        onSearch={handleSearch}
        buttonText="Search Certificate"
        fields={[
          {
            label: "Register Number",
            value: registerNo,
            onChange: setRegisterNo,
            placeholder: "Enter Register Number (00001)",
          },
          {
            label: "Groom Aadhaar Number",
            value: groomAadhaar,
            onChange: setGroomAadhaar,
            placeholder: "Enter Dulhe ka Aadhaar Number",
          },
        ]}
      />
      <div className="flex gap-3">

        <button
          onClick={() => setShowForm(true)}
          className="rounded bg-caribbeangreen-200 text-black px-4 py-2 font-semibold"
        >
          Apply New Certificate
        </button>

        <button
          onClick={handleClear}
          className="rounded bg-pink-200 text-black px-4 py-2 font-semibold"
        >
          Clear Search
        </button>

      </div>



      {maritalDetails && (
        <ExistingDetails maritalDetails={maritalDetails} />
      )}

      {showForm && (
        <MaritalForm
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}
