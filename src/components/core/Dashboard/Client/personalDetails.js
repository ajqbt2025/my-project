import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

import { personalDetails } from "../../../../services/operations/ClientService";

import { setPersonalDetails } from "../../../../slices/clientSlice";

// import { ClientLInk } from "../../../../data/dashboardLink";

const PersonalDetailsForm = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { token } = useSelector((state) => state.auth);
  console.log("personal details toekn",token)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const getNextPagePath = () => {
  //   const currentIndex = ClientLInk.findIndex(
  //     (link) => link.path === location.pathname
  //   );
  //   if (currentIndex === -1 || currentIndex === ClientLInk.length - 1)
  //     return null;
  //   return ClientLInk[currentIndex + 1].path;
  // };

  const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (key !== "profileImage") formData.append(key, data[key]);
    }
    if (data.profileImage && data.profileImage[0])
      formData.append("profileImage", data.profileImage[0]);
    console.log("token",token)
    const result = await dispatch(personalDetails(formData,token));
    console.log("result...", result);

    const id = result?.personalDetailsId || result?.data?._id;
    console.log("id", id);

    if (id) {
      // ✅ Store both ID and actual form data for preview page
     const dataPesonal =  dispatch(
        setPersonalDetails({
          data: {
            ...data,
            profileImage: data.profileImage?.[0]?.name || null, // optional
          },
          id,
        })
      );
      console.log("data personal....",dataPesonal)
      toast.success("Personal details saved successfully!");
      reset();
      // navigate to next step if needed
      navigate("/dashboard/qualification");
    } else {
      toast.error("Failed to save personal details");
    }
  } catch (error) {
    toast.error("Failed to save personal details");
    console.error(error);
  }
};


 return (
    <div className="form-container">
      <h2 className="form-title">Personal Details</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-5"
      >
        <div className="form-grid-2">
          <InputField id="fullName" label="Full Name" register={register} errors={errors} />
          <InputField id="fatherName" label="Father Name" register={register} errors={errors} />
          <InputField id="motherName" label="Mother Name" register={register} errors={errors} />
          <InputField id="birthPlace" label="Birth Place" register={register} errors={errors} />
          <InputField id="dateOfBirth" type="date" label="Date of Birth" register={register} errors={errors} />
          <InputField id="dateOfDeath" type="date" label="Date of Death" register={register} errors={errors} required={false} />
          <InputField id="bloodGroup" label="Blood Group" register={register} errors={errors} />
          <InputField id="mobileNum" label="Mobile Number" register={register} errors={errors} />
          <InputField id="email" type="email" label="Email" register={register} errors={errors} />
          <InputField id="adhaarNum" label="Aadhaar Number" register={register} errors={errors} />

          <SelectField
            id="gender"
            label="Gender"
            register={register}
            errors={errors}
            options={["Male", "Female", "Other"]}
          />
        </div>

        <TextAreaField id="currentAddress" label="Current Address" register={register} errors={errors} />
        <TextAreaField id="permanentAddress" label="Home Town" register={register} errors={errors} />
        <FileField id="profileImage" label="Photo" register={register} errors={errors} />

        <button type="submit" disabled={loading} className="form-submit-btn flex items-center justify-center gap-2">
          <IoAddCircleOutline size={20} />
          Save & Next
        </button>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;

/* ---------- Helper Components ---------- */
const InputField = ({ id, label, type = "text", register, errors, required = true }) => (
  <div>
    <label className="form-label">
      {label} {required && <sup className="text-pink-200">*</sup>}
    </label>
    <input
      type={type}
      {...register(id, required ? { required: true } : {})}
      className="form-input"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
    {errors[id] && <p className="text-xs text-pink-200 mt-1">{label} is required</p>}
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
    {errors[id] && <p className="text-xs text-pink-200 mt-1">{label} is required</p>}
  </div>
);

const FileField = ({ id, label, register, errors }) => (
  <div>
    <label className="form-label">
      {label} <sup className="text-pink-200">*</sup>
    </label>
    <input type="file" {...register(id, { required: true })} className="form-input" />
    {errors[id] && <p className="text-xs text-pink-200 mt-1">{label} is required</p>}
  </div>
);

const SelectField = ({ id, label, register, errors, options }) => (
  <div>
    <label className="form-label">
      {label} <sup className="text-pink-200">*</sup>
    </label>
    <select {...register(id, { required: true })} className="form-select">
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {errors[id] && <p className="text-xs text-pink-200 mt-1">{label} is required</p>}
  </div>
);

