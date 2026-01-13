import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

import { grandparentDetails } from "../../../../services/operations/ClientService";
import { setGrandParent } from "../../../../slices/clientSlice";
import { useNavigate } from "react-router-dom";

const GrandparentDetailsPage = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { token } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      // ---------- FormData (for image upload) ----------
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "image") formData.append(key, data[key]);
      });

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      // ---------- API Call ----------
      const result = await dispatch(grandparentDetails(formData,token));

      if (result?.grandParentId) {
        dispatch(
          setGrandParent({
            id: result.grandParentId,
            data: data,
          })
        );

        toast.success("Grandparent details saved successfully!");
        reset();
        navigate("/dashboard/create-client");

      } else {
        toast.error("Failed to save grandparent details");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting grandparent details");
    }
  };

return (
    <div className="form-container">
      <h2 className="form-title">Grandparent Details</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-5"
      >
        {/* Image Upload */}
        <FileField
          id="image"
          label="Upload Image"
          register={register}
          errors={errors}
        />

        <div className="form-grid-2">
          <InputField id="full_name" label="Full Name" register={register} errors={errors} />
          <InputField id="father_name" label="Father Name" register={register} errors={errors} />
          <InputField id="dob" label="Date of Birth" type="date" register={register} errors={errors} />
          <InputField id="birth_place" label="Birth Place" register={register} errors={errors} />
          <InputField id="uidai" label="UIDAI Number" register={register} errors={errors} />
          <InputField id="qualification" label="Qualification" register={register} errors={errors} />
          <InputField id="occupation" label="Occupation" register={register} errors={errors} />
        </div>

        <TextAreaField
          id="permanent_address"
          label="Home Town"
          register={register}
          errors={errors}
        />

        <TextAreaField
          id="current_address"
          label="Current Address"
          register={register}
          errors={errors}
        />

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

export default GrandparentDetailsPage;

/* ---------- Helper Components ---------- */
const InputField = ({ id, label, register, errors, type = "text" }) => (
  <div>
    <label className="form-label">
      {label} <sup className="text-pink-200">*</sup>
    </label>
    <input
      type={type}
      {...register(id, { required: true })}
      className="form-input"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
    {errors[id] && (
      <p className="text-xs text-pink-200 mt-1">{label} is required</p>
    )}
  </div>
);

const TextAreaField = ({ id, label, register, errors }) => (
  <div>
    <label className="form-label">
      {label} <sup className="text-pink-200">*</sup>
    </label>
    <textarea
      {...register(id, { required: true })}
      className="form-input"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
    {errors[id] && (
      <p className="text-xs text-pink-200 mt-1">{label} is required</p>
    )}
  </div>
);

const FileField = ({ id, label, register, errors }) => (
  <div>
    <label className="form-label">
      {label} <sup className="text-pink-200">*</sup>
    </label>
    <input
      type="file"
      accept="image/*"
      {...register(id, { required: true })}
      className="form-input"
    />
    {errors[id] && (
      <p className="text-xs text-pink-200 mt-1">Image is required</p>
    )}
  </div>
);
