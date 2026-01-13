import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { bankDetails } from "../../../../services/operations/ClientService";
import { setBankDetails } from "../../../../slices/clientSlice";

const BankDetailsPage = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { token } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      // -------- FormData (for image + text) --------
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "documentImage") formData.append(key, data[key]);
      });

      if (data.documentImage && data.documentImage[0]) {
        formData.append("documentImage", data.documentImage[0]);
      }

      const result = await dispatch(bankDetails(formData,token));
      console.log("bank result:", result);

      const id =
        result?.bankId ||
        result?.data?._id ||
        result?.payload?.data?._id ||
        result?._id;

      if (id) {
        // 🔒 remove File from redux (only serializable values)
        const { documentImage, ...safeData } = data;

        dispatch(
          setBankDetails({
            id,
            data: safeData,
            document_image_url: result?.data?.document_image_url || null,
          })
        );

        toast.success("Bank details saved successfully!");
        reset();
               navigate("/dashboard/relation")

      } else {
        toast.error("Failed to save bank details");
      }
    } catch (error) {
      console.error("Error submitting bank details:", error);
      toast.error("Error submitting bank details");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Bank Details</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-5"
      >
        <div className="form-grid-2">
          <InputField id="bank_name" label="Bank Name" register={register} errors={errors} />
          <InputField id="branch_name" label="Branch Name" register={register} errors={errors} />
          <InputField id="ifsc_code" label="IFSC Code" register={register} errors={errors} />
          <InputField id="account_number" label="Account Number" register={register} errors={errors} />
          <InputField id="account_holder" label="Account Holder Name" register={register} errors={errors} />
        </div>

        {/* Document Upload */}
        <FileField
          id="documentImage"
          label="Upload Bank Document (Cheque / Passbook)"
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

export default BankDetailsPage;

/* ---------- Helper Component ---------- */
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
      <p className="text-xs text-pink-200 mt-1">Document image is required</p>
    )}
  </div>
);
