const SingleQualificationForm = ({
  index,
  register,
  errors,
  watch,
  remove,
}) => {
  const selectedQualification = watch(`qualifications.${index}.qualification`);
  const isNone = selectedQualification === "None";

  return (
    <div className="form-section">
      <div className="flex justify-between items-center">
        <p className="form-section-title">
          Qualification {index + 1}
        </p>

        {index > 0 && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-400 text-sm"
          >
            Remove
          </button>
        )}
      </div>

      {/* Qualification */}
      <div className="flex flex-col space-y-2">
        <label className="form-label">
          Qualification <sup className="text-pink-200">*</sup>
        </label>

        <select
          {...register(`qualifications.${index}.qualification`, {
            required: true,
          })}
          className="form-select"
        >
          <option value="">Select Qualification</option>
          <option value="None">None</option>
          <option value="Primary School">Primary School</option>
          <option value="Middle School">Middle School</option>
          <option value="High School">High School</option>
          <option value="Secondary High School">
            Secondary High School
          </option>
          <option value="Junior College">Junior College</option>
          <option value="Graduation">Graduation</option>
          <option value="Post Graduation">Post Graduation</option>
        </select>

        {errors?.qualifications?.[index]?.qualification && (
          <span className="text-xs text-pink-200">Required</span>
        )}
      </div>

      {!isNone && (
        <div className="form-grid-2">
          <InputField
            id={`qualifications.${index}.standard_name`}
            label="Standard Name"
            register={register}
            errors={errors}
          />
          <InputField
            id={`qualifications.${index}.medium_language`}
            label="Medium Language"
            register={register}
            errors={errors}
          />
          <InputField
            id={`qualifications.${index}.school_name`}
            label="School Name"
            register={register}
            errors={errors}
          />
          <InputField
            id={`qualifications.${index}.school_address`}
            label="School Address"
            register={register}
            errors={errors}
          />
          <InputField
            id={`qualifications.${index}.year`}
            label="Year"
            register={register}
            errors={errors}
          />
          <InputField
            id={`qualifications.${index}.grade`}
            label="Grade"
            register={register}
            errors={errors}
          />
        </div>
      )}
    </div>
  );
};

export default SingleQualificationForm;


const InputField = ({ id, label, register, errors, type = "text" }) => (
  <div className="flex flex-col space-y-2">
    <label className="form-label">
      {label} <sup className="text-pink-200">*</sup>
    </label>

    <input
      type={type}
      {...register(id, { required: true })}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="form-input"
    />

    {errors && <span className="text-xs text-pink-200">{label} is required</span>}
  </div>
);
