import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

import { maritalStatusDetails } from "../../../../services/operations/ClientService";
import { setMaritalStatus } from "../../../../slices/clientSlice";
import { useNavigate } from "react-router-dom";

const MaritalStatusDetailsPage = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { token } = useSelector((state) => state.auth);

  // 👇 watch RHF value (no conflict)
  const status = watch("selected_status");

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(maritalStatusDetails(data,token));

      if (result?.maritalStatusId) {
        dispatch(
          setMaritalStatus({
            id: result.maritalStatusId,
            data,
          })
        );

        toast.success("Marital status saved successfully");
        reset();
        navigate("/dashboard/bank");
      } else {
        toast.error("Failed to save marital status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting marital status");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Marital Status Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Marital Status */}
        <div>
          <label className="form-label">
            Marital Status <sup className="text-pink-200">*</sup>
          </label>
          <select
            {...register("selected_status", { required: true })}
            className="form-select"
          >
            <option value="">Select marital status</option>
            <option value="Single / Unmarried">Single / Unmarried</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
            <option value="Divorced">Divorced</option>
            <option value="Separated">Separated</option>
            <option value="Engaged / Betrothed">Engaged / Betrothed</option>
            <option value="Remarried">Remarried</option>
            
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.selected_status && (
            <p className="text-xs text-pink-200 mt-1">
              Marital status is required
            </p>
          )}
        </div>

        {/* ---------- CONDITIONAL FIELDS ---------- */}

        {/* Married / Remarried */}
        {(status === "Married" || status === "Remarried") && (
          <div className="border border-richblack-700 rounded-lg p-4 space-y-4">
            <div className="form-grid-2">
              <InputField id="spouse_name" label="Spouse Name" register={register} />
              <InputField
                id="married_date"
                type="date"
                label="Marriage Date"
                register={register}
              />
              <InputField
                id="children_boys"
                type="number"
                label="Children (Boys)"
                register={register}
              />
              <InputField
                id="children_girls"
                type="number"
                label="Children (Girls)"
                register={register}
              />
            </div>

            <TextAreaField id="address" label="Address" register={register} />
          </div>
        )}

        {/* Widowed / Divorced / Separated */}
        {(status === "Widowed" ||
          status === "Divorced" ||
          status === "Separated") && (
          <div className="border border-richblack-700 rounded-lg p-4 space-y-4">
            <div className="form-grid-2">
              <InputField id="spouse_name" label="Spouse Name" register={register} />
              <InputField
                id="children_boys"
                type="number"
                label="Children (Boys)"
                register={register}
              />
              <InputField
                id="children_girls"
                type="number"
                label="Children (Girls)"
                register={register}
              />
            </div>
          </div>
        )}

        {/* Single */}
        {status === "Single / Unmarried" && (
          <InputField id="father_name" label="Father Name" register={register} />
        )}

        <button
          type="submit"
          disabled={loading}
          className="form-submit-btn flex items-center justify-center gap-2"
        >
          <IoAddCircleOutline size={20} />
          Save & Next
        </button>
      </form>
    </div>
  );
};

export default MaritalStatusDetailsPage;

/* helpers */
const InputField = ({ id, label, register, type = "text" }) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type={type}
      {...register(id)}
      className="form-input"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const TextAreaField = ({ id, label, register }) => (
  <div>
    <label className="form-label">{label}</label>
    <textarea
      {...register(id)}
      className="form-input"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

