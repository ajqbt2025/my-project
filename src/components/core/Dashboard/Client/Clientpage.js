// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// import { createFullClient } from "../../../../services/operations/ClientService";
// import { setClient } from "../../../../slices/clientSlice";

// import logo from "../../../../assests/Logo.png";
// import logo2 from "../../../../assests/head logo.png";

// export default function CreateClientPage({ loading }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [agreement, setAgreement] = useState(false);

//   const {
//     personalDetails,
//     qualification,
//     occupation,
//     physicalCondition,
//     maritalStatus,
//     fatherGuardian,
//     grandParent,
//     bankDetails,

//     personalDetailsId,
//     qualificationId,
//     occupationId,
//     physicalConditionId,
//     maritalStatusId,
//     fatherGuardianId,
//     grandParentId,
//     bankDetailsId,
//   } = useSelector((state) => state.client);
//   console.log("📌 Personal Details => ", personalDetails);
// console.log("📌 Qualification => ", qualification);
// console.log("📌 Occupation => ", occupation);
// console.log("📌 Physical Condition => ", physicalCondition);
// console.log("📌 Marital Status => ", maritalStatus);
// console.log("📌 Father/Guardian => ", fatherGuardian);
// console.log("📌 GrandParent => ", grandParent);
// console.log("📌 Bank Details => ", bankDetails);

//   // ================= CREATE CLIENT =================
//   const handleCreateClient = async () => {
//     if (!agreement) {
//       toast.error("Please accept the agreement before proceeding.");
//       return;
//     }

//     try {
//       const clientData = {
//         personalDetailsId,
//         qualificationId,
//         occupationId,
//         physicalConditionId,
//         maritalStatusId,
//         fatherGuardianId,
//         grandParentId,
//         bankDetailsId,
//       };

//       const token = localStorage.getItem("token");

//       const response = await dispatch(createFullClient(clientData, token));

//       if (response?.success) {
//         toast.success("Client created successfully");
//         dispatch(setClient(response.client));
//         navigate("/certified/profile");
//       } else {
//         toast.error(response?.message || "Client creation failed");
//       }
//     } catch (error) {
//       console.error("CREATE CLIENT ERROR:", error);
//       toast.error("Something went wrong while creating client");
//     }
//   };

//   return (
//     <div className="bg-white w-[794px] mx-auto my-10 p-10 border border-gray-300 shadow-lg box-border max-[900px]:w-[95%]">

//       {/* ================= HEADER ================= */}
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <img src={logo} className="w-[50px]" alt="logo" />
//           <img src={logo2} className="w-[200px]" alt="logo2" />
//         </div>
//         <hr />
//       </div>

//       {/* ================= PERSONAL ================= */}
//       <Section title="Personal Details">
//         <DetailsGrid
//           data={[
//             ["Full Name", personalDetails?.fullName],
//             ["Father's Name", personalDetails?.fatherName],
//             ["Mother's Name", personalDetails?.motherName],
//             ["Gender", personalDetails?.gender],
//             ["Date of Birth", personalDetails?.dateOfBirth],
//             ["Birth Place", personalDetails?.birthPlace],
//             ["Blood Group", personalDetails?.bloodGroup],
//             ["Aadhaar Number", personalDetails?.adhaarNum],
//             ["Mobile", personalDetails?.mobileNum],
//             ["Email", personalDetails?.email],
//             ["Home Town", personalDetails?.permanentAddress],
//           ]}
//         />
//       </Section>

//       {/* ================= QUALIFICATION ================= */}
//       <Section title="Qualification Details">
//         <DetailsGrid
//           data={[
//             ["Qualification", qualification?.qualification],
//             ["Medium", qualification?.medium_language],
//             ["Standard", qualification?.standard_name],
//             ["School Name", qualification?.school_name],
//             ["School Address", qualification?.school_address],
//             ["Year", qualification?.year],
//             ["Grade", qualification?.grade],
//           ]}
//         />
//       </Section>

//       {/* ================= OCCUPATION ================= */}
//       <Section title="Occupation Details">
//         <DetailsGrid
//           data={[
//             ["Occupation Type", occupation?.occupation_type],
//             ["Hobbies", occupation?.hobbies],
//             ["Art Expertise", occupation?.art_expert],
//           ]}
//         />
//       </Section>

//       {/* ================= PHYSICAL CONDITION ================= */}
//       <Section title="Physical Condition">
//         <DetailsGrid
//           data={[
//             ["Disability Status", physicalCondition?.disability_status],
//             ["Disability Type", physicalCondition?.disability_type],
//             ["Description", physicalCondition?.description],
//             ["Medical Certificate No", physicalCondition?.certificate_number],
//           ]}
//         />
//       </Section>

//       {/* ================= MARITAL STATUS ================= */}
//       <Section title="Marital Status">
//         <DetailsGrid
//           data={[
//             ["Status", maritalStatus?.selected_status],
//             ["Spouse Name", maritalStatus?.spouse_name],
//             ["Father Name", maritalStatus?.father_name],
//             ["Marriage Date", maritalStatus?.married_date],
//             ["Address", maritalStatus?.address],
//             ["Boys", maritalStatus?.children_boys],
//             ["Girls", maritalStatus?.children_girls],
//           ]}
//         />
//       </Section>

//       {/* ================= FATHER / GUARDIAN / SPOUSE ================= */}
//       <Section title="Father / Guardian / Spouse Details">
//         <DetailsGrid
//           data={[
//             ["Relation Type", fatherGuardian?.relation_type],
//             ["Full Name", fatherGuardian?.full_name],
//             ["Father Name", fatherGuardian?.father_name],
//             ["Mother Name", fatherGuardian?.mother_name],
//             ["DOB", fatherGuardian?.dob],
//             ["Birth Place", fatherGuardian?.birth_place],
//             ["Mobile", fatherGuardian?.mobile],
//             ["UIDAI", fatherGuardian?.uidai],
//             ["Qualification", fatherGuardian?.qualification],
//             ["Occupation", fatherGuardian?.occupation],
//             ["Home Town", fatherGuardian?.permanent_address],
//             ["Current Address", fatherGuardian?.current_address],
//           ]}
//         />
//       </Section>

//       {/* ================= GRANDPARENT ================= */}
//       <Section title="Grandparent Details">
//         <DetailsGrid
//           data={[
//             ["Full Name", grandParent?.full_name],
//             ["Father Name", grandParent?.father_name],
//             ["DOB", grandParent?.dob],
//             ["Birth Place", grandParent?.birth_place],
//             ["UIDAI", grandParent?.uidai],
//             ["Qualification", grandParent?.qualification],
//             ["Occupation", grandParent?.occupation],
//             ["Home Town", grandParent?.permanent_address],
//             ["Current Address", grandParent?.current_address],
//           ]}
//         />
//       </Section>

//       {/* ================= BANK DETAILS ================= */}
//       <Section title="Bank Details">
//         <DetailsGrid
//           data={[
//             ["Bank Name", bankDetails?.bank_name],
//             ["Branch Name", bankDetails?.branch_name],
//             ["Account Holder", bankDetails?.account_holder],
//             ["Account Number", bankDetails?.account_number],
//             ["IFSC Code", bankDetails?.ifsc_code],
//           ]}
//         />
//       </Section>

//       {/* ================= AGREEMENT ================= */}
//       <div className="border border-black mt-6">
//         <div className="px-3 py-2 border-b border-black font-bold text-sm">
//           Declaration / Agreement
//         </div>

//         <div className="px-4 py-3 text-sm">
//           <p>
//             I hereby declare that the information provided above is true and correct
//             to the best of my knowledge.
//           </p>

//           <div className="flex items-center gap-3 mt-4">
//             <input
//               type="checkbox"
//               checked={agreement}
//               onChange={(e) => setAgreement(e.target.checked)}
//             />
//             <span>I agree to the above declaration.</span>
//           </div>
//         </div>
//       </div>

//       {/* ================= SUBMIT BUTTON ================= */}
//       <div className="flex justify-end mt-6">
//         <button
//           onClick={handleCreateClient}
//           disabled={loading}
//           className="border border-black px-6 py-2 text-sm font-semibold hover:bg-gray-100 disabled:opacity-60"
//         >
//           {loading ? "Saving..." : "Submit Application"}
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ================= REUSABLE COMPONENTS ================= */

// const Section = ({ title, children }) => (
//   <div className="border border-black mb-6">
//     <div className="px-3 py-2 border-b border-black font-bold text-sm">
//       {title}
//     </div>
//     <div>{children}</div>
//   </div>
// );

// const DetailsGrid = ({ data }) => (
//   <div className="border border-black">
//     {data.map(([label, value], i) => (
//       <div key={i} className="grid grid-cols-[35%_65%] border-b border-black last:border-b-0">
//         <div className="px-3 py-2 font-medium border-r border-black">{label}</div>
//         <div className="px-3 py-2">{value || "-"}</div>
//       </div>
//     ))}
//   </div>
// );



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { createFullClient } from "../../../../services/operations/ClientService";
import { setClient } from "../../../../slices/clientSlice";

import logo from "../../../../assests/head logo2.png";
import logo2 from "../../../../assests/head logo.png";
import staticqr from "../../../../assests/buttonImage/createClientQR.jpeg";

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
