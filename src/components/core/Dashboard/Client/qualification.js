import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { qualificationDetails } from "../../../../services/operations/ClientService";
import { setQualification } from "../../../../slices/clientSlice";
import SingleQualificationForm from "./singleQualification";

const QualificationDetailsPage = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=> state.auth)
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      qualifications: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "qualifications",
  });

  const onSubmit = async (formData) => {
    try {
      
      for (let i = 0; i < formData.qualifications.length; i++) {
        let q = formData.qualifications[i];

        // NONE case
        if (q.qualification === "None") {
          q = { qualification: "None" };
        }

        const result = await dispatch(qualificationDetails(q,token));

        const id =
          result?.qualificationId ||
          result?.data?._id ||
          result?.payload?.data?._id;

        if (!id) {
          toast.error(`Qualification ${i + 1} failed`);
          return;
        }

        dispatch(
          setQualification({
            id,
            data: q,
          })
        );
      }

      toast.success("All qualifications saved successfully!");
      navigate("/dashboard/occupation");
    } catch (error) {
      console.error(error);
      toast.error("Error submitting qualifications");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Qualification Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <SingleQualificationForm
            key={field.id}
            index={index}
            register={register}
            errors={errors}
            watch={watch}
            remove={remove}
          />
        ))}

        <button
          type="button"
          onClick={() => append({})}
          className="flex items-center gap-2 rounded-md bg-green-400 py-[8px] px-[20px] font-semibold text-richblack-200 form-submit-btn"
        >
          <IoAddCircleOutline size={20} />
          Add More Qualification
        </button>

        <button
          type="submit"
          disabled={loading}
          className="form-submit-btn mt-4"
        >
          Save All Qualifications
        </button>
      </form>
    </div>
  );
};

export default QualificationDetailsPage;
