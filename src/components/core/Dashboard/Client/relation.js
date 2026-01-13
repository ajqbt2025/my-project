import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

import { relationDetails } from "../../../../services/operations/ClientService";
import { setFatherGuardian } from "../../../../slices/clientSlice";
import { useNavigate } from "react-router-dom";

const RelationDetailsPage = ({ loading }) => {
  const dispatch = useDispatch();
  const [relationType, setRelationType] = useState("");
    const { token } = useSelector((state) => state.auth);

const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // --------- FormData for image upload ----------
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "image") formData.append(key, data[key]);
      });

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const result = await dispatch(relationDetails(formData,token));
      console.log(" realation 1")
      const id =
       result?.fatherGuardianId ||   
      result?.relationId ||
      result?.data?._id ||
      result?.payload?.data?._id;
      console.log(" realation 2")
      console.log(id)
      if (id) {
        dispatch(
          setFatherGuardian({
            id,
            data: {
              relation_type: data.relation_type,
              full_name: data.full_name,
              father_name: data.father_name,
              mother_name: data.mother_name,
              dob: data.dob,
              birth_place: data.birth_place,
              mobile: data.mobile,
              uidai: data.uidai,
              qualification: data.qualification,
              occupation: data.occupation,
              permanent_address: data.permanent_address,
              current_address: data.current_address,
              // image redux me bhi save
            },
          })
        );
        console.log(" realation 3")
        
        toast.success("Relation details saved successfully!");
        reset();
        navigate("/dashboard/grandparent")
        console.log(" realation 4")
      } else {
        toast.error("Failed to save relation details");
      }
    } catch (error) {
      console.error("Error submitting relation details:", error);
      toast.error("Error submitting relation details");
    }
  };

return (
    <div className="form-container">
      <h2 className="form-title">Relation Details</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-5"
      >
        {/* Relation Type */}
        <div>
          <label className="form-label">
            Relation Type <sup className="text-pink-200">*</sup>
          </label>
          <select
            {...register("relation_type", { required: true })}
            value={relationType}
            onChange={(e) => setRelationType(e.target.value)}
            className="form-select"
          >
            <option value="">Select relation type</option>
            <option value="father">Father</option>
            <option value="guardian">Guardian</option>
            <option value="spouse">Spouse</option>
          </select>
          {errors.relation_type && (
            <p className="text-xs text-pink-200 mt-1">
              Relation type is required
            </p>
          )}
        </div>

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
          <InputField id="mother_name" label="Mother Name" register={register} errors={errors} />
          <InputField id="dob" type="date" label="Date of Birth" register={register} errors={errors} />
          <InputField id="birth_place" label="Birth Place" register={register} errors={errors} />
          <InputField id="mobile" label="Mobile Number" register={register} errors={errors} />
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

export default RelationDetailsPage;

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

