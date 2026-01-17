

// import React, { useState } from "react";
// import toast from "react-hot-toast";

// import {
//   getMaritalCertificateByClientIdService,
// } from "../../services/operations/CertifiedService";

// import SearchSection from "./meritalSection/SearchSection";
// import ExistingDetails from "./meritalSection/ExistingDetails";
// import MaritalForm from "./meritalSection/MaritalForm";

// // export default function MaritalCertificatePage() {

// //   const [clientId, setClientId] = useState("");
// //   const [notFound, setNotFound] = useState(false);
// //   const [maritalDetails, setMaritalDetails] = useState(null);
// //   const [showForm, setShowForm] = useState(false);
// //   const [createdRegisterNo, setCreatedRegisterNo] = useState(null);


// //   // 🔍 SEARCH FUNCTION
// //   const handleSearch = async () => {
// //     if (!clientId) return toast.error("Client ID required");

// //     setShowForm(false);
// //     setMaritalDetails(null);

// //     const res = await getMaritalCertificateByClientIdService(clientId);
// //     console.log("first,res",res)
// //     if (res?.success && res?.data?.maritalCertificate) {
// //       setMaritalDetails(res.data.maritalCertificate);
// //       setNotFound(false);
// //       toast.success("Certificate found");
// //     } else {
// //       toast.error("No record found — Apply kar sakte ho");
// //       setNotFound(true);
// //     }
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto space-y-6">

// //       {/* 🔍 Search & Apply */}
// //       <SearchSection
// //         clientId={clientId}
// //         setClientId={setClientId}
// //         onSearch={handleSearch}
// //         onApply={() => setShowForm(true)}
// //         notFound={notFound}
// //       />

// //       {/* 🟢 Existing details */}
// //       {maritalDetails && (
// //         <ExistingDetails maritalDetails={maritalDetails} />
// //       )}

// //       {/* 📝 Apply Form */}
// //       {showForm && (
// //   <MaritalForm
// //     onClose={() => setShowForm(false)}
// //     onCreated={(regNo)=> setCreatedRegisterNo(regNo)}
// //   />
// // )}

// //     </div>
// //   );
// // }
// import {
//   getMaritalCertificateByRegisterNoService,
// } from "../../services/operations/CertifiedService";

// export default function MaritalCertificatePage() {

//   const [registerNo, setRegisterNo] = useState("");
//   const [maritalDetails, setMaritalDetails] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [createdRegisterNo, setCreatedRegisterNo] = useState(null);

//   // 🔍 SEARCH FUNCTION
//   const handleSearch = async () => {
//     if (!registerNo) return toast.error("Register Number required");

//     setShowForm(false);
//     setMaritalDetails(null);
//     setCreatedRegisterNo(null);

//     const res = await getMaritalCertificateByRegisterNoService(registerNo);
//     console.log(res)
//     if (res?.success) {
//   setMaritalDetails(res.maritalCertificate);   // ⭐ yahan change
//   toast.success("Certificate found");
//     } else {
//       toast.error("No record found");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">

//       {/* 🔍 Search */}
//       <SearchSection
//         clientId={registerNo}
//         setClientId={setRegisterNo}
//         onSearch={handleSearch}
//         onApply={() => setShowForm(true)}
//       />

//       {/* 🎉 register number after create */}
//       {createdRegisterNo && (
//         <div className="p-4 rounded bg-green-600 text-white text-lg font-semibold">
//           Certificate Created — Register No: {createdRegisterNo}
//         </div>
//       )}

//       {/* 🟢 Existing details after search */}
//       {maritalDetails && (
//         <ExistingDetails maritalDetails={maritalDetails} />
//       )}

//       {/* 📝 Apply Form */}
//       {showForm && (
//         <MaritalForm
//           onClose={() => setShowForm(false)}
//           onCreated={(regNo) => setCreatedRegisterNo(regNo)}
//         />
//       )}
//     </div>
//   );
// }



import React, { useState,useCallback  } from "react";
import toast from "react-hot-toast";

import {
  getMaritalCertificateByRegisterNoService,
} from "../../services/operations/CertifiedService";

import SearchSection from "./meritalSection/SearchSection";
import ExistingDetails from "./meritalSection/ExistingDetails";
import MaritalForm from "./meritalSection/MaritalForm";
import MultiSearchBar from "../../pages/ClientSearchBar"

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function MaritalCertificatePage() {
const location = useLocation();
 
  const [registerNo, setRegisterNo] = useState("");
  const [groomAadhaar, setGroomAadhaar] = useState("");

  const [maritalDetails, setMaritalDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
   useEffect(() => {
    if (location.state) {
      setRegisterNo(location.state.registerNumber || "");
      setGroomAadhaar(location.state.groomAadhaar || "");
    }
  }, [location.state]);

  // 🔍 SEARCH (ESLint safe)
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

  const handleSearch = async () => {

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
        <MaritalForm
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}
