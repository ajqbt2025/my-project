import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { physicalConditionDetails } from "../../../../services/operations/ClientService";
import { setPhysicalCondition } from "../../../../slices/clientSlice";

const PhysicalConditionDetailsPage = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
    const { token } = useSelector((state) => state.auth);

  const [conditionType, setConditionType] = useState("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // 🧠 Clean abnormal_details if normal
      if (data.condition === "normal") {
        data.abnormal_details = null;
      }

      // Send to backend
      const result = await dispatch(physicalConditionDetails(data,token));
      console.log("result physical", result);

      // Extract ID safely
      const id =
        result?.physicalConditionId ||
        result?.data?._id ||
        result?.payload?.data?._id;

      if (id) {
        // ✅ Store in Redux: ID + full data for preview page
       const physData =  dispatch(
          setPhysicalCondition({
            id,
            data: {
              condition: data.condition,
              abnormal_details: data.abnormal_details || null,
            },
          })
        );

        console.log("physical data ", physData)

        toast.success("Physical condition saved successfully!");
        reset();
        navigate("/dashboard/marital");
      } else {
        toast.error("Failed to save physical condition");
      }
    } catch (error) {
      console.error("Error saving physical condition:", error);
      toast.error("Error submitting physical condition");
    }
  };
 return (
    <div className="form-container">
      <h2 className="form-title">Physical Condition Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Condition */}
        <div className="flex flex-col space-y-2">
          <label className="form-label">
            Condition <sup className="text-pink-200">*</sup>
          </label>

          <select
            {...register("condition", {
              required: true,
              onChange: (e) => setConditionType(e.target.value),
            })}
            className="form-select"
          >
            <option value="">Select Condition</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
          </select>

          {errors.condition && (
            <span className="text-xs text-pink-200">Condition is required</span>
          )}
        </div>

        {/* Abnormal Details */}
        {conditionType === "abnormal" && (
          <div className="form-section">
            <p className="form-section-title">
              Abnormal Condition Details
            </p>

            <div className="form-grid-2">
              <InputField id="full_name" label="Full Name" register={register} errors={errors} />
              <InputField id="udid" label="UDID" register={register} errors={errors} />
              <InputField id="disability_type" label="Disability Type" register={register} errors={errors} />
              <InputField id="dob" label="Date of Birth" type="date" register={register} errors={errors} />
              <InputField id="disability_percent" label="Disability Percent" type="number" register={register} errors={errors} />
              <InputField id="issue_date" label="Issue Date" type="date" register={register} errors={errors} />
              <InputField id="valid_upto" label="Valid Upto" type="date" register={register} errors={errors} />
              <InputField id="state_id" label="State ID" register={register} errors={errors} />
              <InputField id="uidai" label="UIDAI" register={register} errors={errors} />
            </div>

            <TextAreaField id="address" label="Address" register={register} errors={errors} />
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="form-submit-btn flex items-center justify-center gap-2"
          >
            <IoAddCircleOutline size={20} />
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhysicalConditionDetailsPage;

/* ================= Helper Components ================= */

const InputField = ({ id, label, register, errors, type = "text" }) => (
  <div className="flex flex-col space-y-2">
    <label className="form-label">
      {label} <sup className="text-pink-200">*</sup>
    </label>
    <input
      type={type}
      {...register(`abnormal_details.${id}`, { required: true })}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="form-input"
    />
    {errors?.abnormal_details?.[id] && (
      <span className="text-xs text-pink-200">{label} is required</span>
    )}
  </div>
);

const TextAreaField = ({ id, label, register, errors }) => (
  <div className="flex flex-col space-y-2">
    <label className="form-label">
      {label} <sup className="text-pink-200">*</sup>
    </label>
    <textarea
      {...register(`abnormal_details.${id}`, { required: true })}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="form-input"
    />
    {errors?.abnormal_details?.[id] && (
      <span className="text-xs text-pink-200">{label} is required</span>
    )}
  </div>
);