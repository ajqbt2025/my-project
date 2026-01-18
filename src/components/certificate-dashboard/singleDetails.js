import React, { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSingleClientDetails } from "../../services/operations/CertifiedService"
import { useReactToPrint } from "react-to-print"

import logo2 from "../../assests/buttonImage/from logo.png"
import logo from "../../assests/head logo2.png"

const ClientDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [client, setClient] = useState(null)

  const printRef = useRef(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Client Details",
  })

  useEffect(() => {
    const load = async () => {
      const res = await dispatch(fetchSingleClientDetails(id))
      if (res?.success) setClient(res.data)
    }
    load()
  }, [dispatch, id])

  if (!client) return <p className="text-white p-6">Loading…</p>

  const {
    personalDetails = {},
    qualifications = [],
    occupation = {},
    physicalCondition = {},
    maritalStatus = {},
    fatherGuardian = {},
    grandParent = {},
    bankDetails = {},
    status,
    clientId,
  } = client

  const qualification = qualifications[0] || {}

  return (
    <div className="bg-richblack-900 py-8">
      <div
        ref={printRef}
        className="w-full max-w-[794px] min-h-[1123px] bg-white p-4 sm:p-8 md:p-10 text-black font-inter mx-auto"
      >
        <h1 className="text-center text-xl font-bold mb-6 uppercase">
          Client Details
        </h1>

        <div className="flex justify-between mr-10 ml-10 items-center mb-4">
  <img src={logo} className="w-[60px]" alt="Organization Logo" />
  <img src={logo2} className="w-[220px]" alt="Header Logo" />
</div>


        <Section title="Personal Details">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              {status?.toLowerCase() !== "pending" && (
                <Row label="Client ID" value={clientId} />
              )}
              <Row label="Full Name" value={personalDetails.fullName} />
              <Row label="Father Name" value={personalDetails.fatherName} />
              <Row label="Mother Name" value={personalDetails.motherName} />
              <Row label="Gender" value={personalDetails.gender} />
              <Row label="Blood Group" value={personalDetails.bloodGroup} />
              <Row label="Birth Place" value={personalDetails.birthPlace} />
              <Row label="Date of Birth" value={personalDetails.dateOfBirth} />
              <Row label="Mobile" value={personalDetails.mobileNum} />
              <Row label="Email" value={personalDetails.email} />
              <Row label="Home Town" value={personalDetails.permanentAddress} />
            </div>

            <div className="w-[120px] h-[160px] sm:w-[140px] sm:h-[180px] border border-black flex items-center justify-center self-start">
              {personalDetails?.profileImage ? (
                <img
                  src={personalDetails.profileImage}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500">No photo</span>
              )}
            </div>
          </div>
        </Section>

        <Section title="Qualification Details">
          <Row label="Qualification" value={qualification.qualification} />
          <Row label="Medium" value={qualification.medium_language} />
          <Row label="Standard" value={qualification.standard_name} />
          <Row label="School Name" value={qualification.school_name} />
          <Row label="School Address" value={qualification.school_address} />
          <Row label="Year" value={qualification.year} />
          <Row label="Grade" value={qualification.grade} />
        </Section>

        <Section title="Occupation Details">
          <Row label="Occupation Type" value={occupation.occupation_type} />
          <Row label="Hobbies" value={occupation.hobbies} />
          <Row label="Art Expert" value={occupation.art_expert} />

          {occupation?.occupation_type === "job" && (
            <>
              <Row label="Organisation" value={occupation.job_details?.org_name} />
              <Row label="Designation" value={occupation.job_details?.designation} />
              <Row label="Org ID" value={occupation.job_details?.org_id} />
              <Row label="Org Mobile" value={occupation.job_details?.org_mobile} />
              <Row label="Org Address" value={occupation.job_details?.org_address} />
            </>
          )}

          {occupation?.occupation_type === "business" && (
            <>
              <Row label="Shop Name" value={occupation.business_details?.shop_name} />
              <Row label="Category" value={occupation.business_details?.category} />
              <Row label="Business Year" value={occupation.business_details?.business_year} />
              <Row label="GST No" value={occupation.business_details?.gst_number} />
              <Row label="PAN No" value={occupation.business_details?.pan_number} />
            </>
          )}

          {occupation?.occupation_type === "none" && (
            <Row label="Occupation Status" value="Unemployed" />
          )}
        </Section>

        <Section title="Physical Condition">
          <Row label="Condition" value={physicalCondition.condition} />

          {physicalCondition?.condition === "normal" && (
            <Row label="Remark" value="Normal (No Disability)" />
          )}

          {physicalCondition?.condition === "abnormal" && (
            <>
              <Row label="Full Name" value={physicalCondition.abnormal_details?.full_name} />
              <Row label="UDID" value={physicalCondition.abnormal_details?.udid} />
              <Row label="Disability Type" value={physicalCondition.abnormal_details?.disability_type} />
              <Row label="DOB" value={physicalCondition.abnormal_details?.dob?.substring(0, 10)} />
              <Row label="Disability Percent" value={`${physicalCondition.abnormal_details?.disability_percent}%`} />
              <Row label="State ID" value={physicalCondition.abnormal_details?.state_id} />
              <Row label="UIDAI" value={physicalCondition.abnormal_details?.uidai} />
              <Row label="Issue Date" value={physicalCondition.abnormal_details?.issue_date?.substring(0, 10)} />
              <Row label="Valid Upto" value={physicalCondition.abnormal_details?.valid_upto?.substring(0, 10)} />
              <Row label="Address" value={physicalCondition.abnormal_details?.address} />
            </>
          )}
        </Section>

        <Section title="Marital Status">
          <Row label="Status" value={maritalStatus.selected_status} />
          <Row label="Spouse Name" value={maritalStatus.spouse_name} />
          <Row label="Father Name" value={maritalStatus.father_name} />
          <Row label="Address" value={maritalStatus.address} />
          <Row label="Marriage Date" value={maritalStatus.married_date?.substring(0, 10)} />
          <Row label="Boys" value={maritalStatus.children_boys} />
          <Row label="Girls" value={maritalStatus.children_girls} />
        </Section>

        <Section title="Father / Guardian / Spouse Details">
          <Row label="Relation Type" value={fatherGuardian.relation_type} />
          <Row label="Full Name" value={fatherGuardian.full_name} />
          <Row label="Father Name" value={fatherGuardian.father_name} />
          <Row label="Mother Name" value={fatherGuardian.mother_name} />
          <Row label="Birth Place" value={fatherGuardian.birth_place} />
          <Row label="DOB" value={fatherGuardian.dob?.substring(0, 10)} />
          <Row label="UIDAI" value={fatherGuardian.uidai} />
          <Row label="Qualification" value={fatherGuardian.qualification} />
          <Row label="Occupation" value={fatherGuardian.occupation} />
          <Row label="Home Town" value={fatherGuardian.permanent_address} />
          <Row label="Current Address" value={fatherGuardian.current_address} />
        </Section>

        <Section title="Grand Parent Details">
          <Row label="Full Name" value={grandParent.full_name} />
          <Row label="Father Name" value={grandParent.father_name} />
          <Row label="Birth Place" value={grandParent.birth_place} />
          <Row label="DOB" value={grandParent.dob?.substring(0, 10)} />
          <Row label="UIDAI" value={grandParent.uidai} />
          <Row label="Qualification" value={grandParent.qualification} />
          <Row label="Occupation" value={grandParent.occupation} />
          <Row label="Home Town" value={grandParent.permanent_address} />
          <Row label="Current Address" value={grandParent.current_address} />
        </Section>

        <Section title="Bank Details">
          {bankDetails?.bank_name ? (
            <>
              <Row label="Bank Name" value={bankDetails.bank_name} />
              <Row label="Branch Name" value={bankDetails.branch_name} />
              <Row label="Account Holder" value={bankDetails.account_holder} />
              <Row label="Account Number" value={bankDetails.account_number} />
              <Row label="IFSC Code" value={bankDetails.ifsc_code} />
            </>
          ) : (
            <Row label="Info" value="No Data Available" />
          )}
        </Section>

        <div className="mt-4 text-right font-semibold">
          Status: {status?.toUpperCase()}
        </div>
      </div>

      <div className="mt-6 print:hidden flex justify-center">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          🖨 Print
        </button>
      </div>
    </div>
  )
}

export default ClientDetail

const Section = ({ title, children }) => (
  <div className="mb-4 border border-black">
    <div className="border-b border-black px-3 py-1 font-bold uppercase text-sm">
      {title}
    </div>
    <div className="p-3 space-y-1">{children}</div>
  </div>
)

const Row = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center text-sm border-b border-dashed border-gray-400 py-1 gap-1">
    <span className="font-semibold sm:w-[35%] w-full">{label}</span>
    <span className="sm:w-[65%] w-full border-b border-gray-400">
      {value === "" || value === null || value === undefined ? "-" : value}
    </span>
  </div>
)
