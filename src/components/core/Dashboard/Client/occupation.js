import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// Services & Slices
import { occupationDetails } from "../../../../services/operations/ClientService";
import { setOccupation } from "../../../../slices/clientSlice";

const OccupationDetailsPage = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
    const { token } = useSelector((state) => state.auth);

  // get clientId for linking
  const { personalDetailsId } = useSelector((state) => state.client);

  const [occupationType, setOccupationType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // --------- SUBMIT HANDLER ---------
  const onSubmit = async (data) => {
    try {
      let payload = {
        client_id: personalDetailsId, // 🔹 link with client
        occupation_type: data.occupation_type,
        hobbies: data.hobbies,
        art_expert: data.art_expert,
      };

      if (data.occupation_type === "business") {
        payload.business_details = {
          shop_name: data.shop_name,
          category: data.category,
          business_year: data.business_year,
          pan_number: data.pan_number,
          gst_number: data.gst_number,
          business_mobile: data.business_mobile,
          business_email: data.business_email,
          business_address: data.business_address,
        };
      }

      if (data.occupation_type === "job") {
        payload.job_details = {
          org_name: data.org_name,
          designation: data.designation,
          org_id: data.org_id,
          org_mobile: data.org_mobile,
          org_address: data.org_address,
        };
      }

      // API call
      const result = await dispatch(occupationDetails(payload,token));

      console.log("✅ OCCUPATION RESULT:", result);
      const id = result?.occupationId || result?.data?._id;
      if (id) {
       const occuData = dispatch(
          setOccupation({
            data: payload,
            id: id,
          })
        );
        console.log("occu data", occuData)
        toast.success(
           "Occupation details saved successfully!"
        );
        reset();
        navigate("/dashboard/physical");
      } else {
        toast.error("Failed to save occupation details");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting occupation details");
    }
  };

  // --------- RETURN JSX ---------
 return (
    <div className="form-container">
      <h2 className="form-title">Occupation & Skills</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Occupation Type */}
        <div className="flex flex-col space-y-2">
          <label className="form-label">
            Occupation Type <sup className="text-pink-200">*</sup>
          </label>

          <select
            {...register("occupation_type", {
              required: true,
              onChange: (e) => setOccupationType(e.target.value),
            })}
            className="form-select"
          >
            <option value="">Select Occupation Type</option>
            <option value="business">Business</option>
            <option value="job">Job</option>
          </select>

          {errors.occupation_type && (
            <span className="text-xs text-pink-200">
              Occupation type is required
            </span>
          )}
        </div>

        {/* ================= BUSINESS DETAILS ================= */}
        {occupationType === "business" && (
          <div className="form-section">
            <p className="form-section-title">Business Details</p>

            <div className="form-grid-2">
              <InputField id="shop_name" label="Shop Name" register={register} errors={errors} />
              <InputField id="category" label="Business Category" register={register} errors={errors} />
              <InputField id="business_year" label="Year of Business" register={register} errors={errors} />
              <InputField id="pan_number" label="PAN Number" register={register} errors={errors} />
              <InputField id="gst_number" label="GST Number" register={register} errors={errors} />
              <InputField id="business_mobile" label="Business Mobile" register={register} errors={errors} />
              <InputField id="business_email" type="email" label="Business Email" register={register} errors={errors} />
            </div>

            <TextAreaField
              id="business_address"
              label="Business Address"
              register={register}
              errors={errors}
            />
          </div>
        )}

        {/* ================= JOB DETAILS ================= */}
        {occupationType === "job" && (
          <div className="form-section">
            <p className="form-section-title">Job Details</p>

            <div className="form-grid-2">
              <InputField id="org_name" label="Organization Name" register={register} errors={errors} />
              <InputField id="designation" label="Designation" register={register} errors={errors} />
              <InputField id="org_id" label="Organization ID" register={register} errors={errors} />
              <InputField id="org_mobile" label="Organization Mobile" register={register} errors={errors} />
            </div>

            <TextAreaField
              id="org_address"
              label="Organization Address"
              register={register}
              errors={errors}
            />
          </div>
        )}

        {/* ================= COMMON FIELDS ================= */}
        <div className="form-grid-2">
          <InputField id="hobbies" label="Hobbies" register={register} errors={errors} />
          <InputField id="art_expert" label="Art Expertise" register={register} errors={errors} />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="form-submit-btn flex items-center gap-2"
          >
            <IoAddCircleOutline size={20} />
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default OccupationDetailsPage;

/* ================= Helper Components ================= */

const InputField = ({ id, label, register, errors, type = "text", required = true }) => (
  <div className="flex flex-col space-y-2">
    <label className="form-label">
      {label} {required && <sup className="text-pink-200">*</sup>}
    </label>
    <input
      type={type}
      {...register(id, required ? { required: true } : {})}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="form-input"
    />
    {errors[id] && (
      <span className="text-xs text-pink-200">{label} is required</span>
    )}
  </div>
);


const TextAreaField = ({ id, label, register, errors, required = true }) => (
  <div className="flex flex-col space-y-2">
    <label className="form-label">
      {label} {required && <sup className="text-pink-200">*</sup>}
    </label>
    <textarea
      {...register(id, required ? { required: true } : {})}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="form-input"
    />
    {errors[id] && (
      <span className="text-xs text-pink-200">{label} is required</span>
    )}
  </div>
);
