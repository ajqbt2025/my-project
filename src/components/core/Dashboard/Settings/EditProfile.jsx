import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      gender: user?.additionalDetails?.gender || "",
      contactNumber: user?.contactNumber || "",
      about: user?.additionalDetails?.about || "",
    }
  })
  console.log("dateOfBirth",user?.additionalDetails?.dateOfBirth)

  const onSubmit = async (data) => {
    dispatch(updateProfile(token, data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">

        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>

        {/* FULL NAME ONLY */}
        <div className="flex flex-col gap-2">
          <label className="lable-style">Full Name</label>
          <input
            className="form-style"
            {...register("fullName", { required: true })}
            placeholder="Enter your full name"
          />
        </div>

        {/* DOB & GENDER */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label className="lable-style">Date of Birth</label>
            <input type="date" className="form-style" {...register("dateOfBirth")} />
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label className="lable-style">Gender</label>
            <select className="form-style" {...register("gender")}>
              <option value="">Select gender</option>
              {genders.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* CONTACT & ABOUT */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label className="lable-style">Contact Number</label>
            <input className="form-style" {...register("contactNumber")} />
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label className="lable-style">About</label>
            <input className="form-style" {...register("about")} />
          </div>
        </div>

      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-richblack-700 py-2 px-5 text-richblack-50"
        >
          Cancel
        </button>

        <IconBtn type="submit" text="Save" />
      </div>

    </form>
  )
}
