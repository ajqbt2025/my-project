import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import { useSelector } from "react-redux"

export default function Settings() {

  const { user } = useSelector((state) => state.profile)

  return (
    <>
      <h1 className="mb-10 text-3xl font-semibold text-richblack-5">
        Account Settings
      </h1>

      {/* ================= ACCOUNT BADGE CARD ================= */}
      <div className="mb-8 rounded-md border border-richblack-700 bg-richblack-800 p-6">

        <p className="text-lg font-semibold text-richblack-5 mb-1">
          Account Type
        </p>

        <p className="text-sm text-richblack-300">
          Your current role in the system
        </p>

        <span
          className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold
          ${
            user?.accountType === "Admin"
              ? "bg-pink-200 text-black"
              : user?.accountType === "Certified"
              ? "bg-green-200 text-black"
              : "bg-blue-200 text-black"
          }`}
        >
          {user?.accountType}
        </span>
      </div>

      {/* ================= PROFILE PICTURE ================= */}
      <div className="mb-8 rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-lg font-semibold text-richblack-5 mb-3">
          Profile Picture
        </h2>
        <ChangeProfilePicture />
      </div>

      {/* ================= PROFILE DETAILS EDIT ================= */}
      <div className="mb-8 rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-lg font-semibold text-richblack-5 mb-3">
          Edit Personal Information
        </h2>
        <EditProfile />
      </div>

      {/* ================= PASSWORD CHANGE ================= */}
      <div className="mb-8 rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-lg font-semibold text-richblack-5 mb-3">
          Change Password
        </h2>
        <UpdatePassword />
      </div>

      {/* ================= DELETE ACCOUNT ================= */}
      <div className="rounded-md border border-pink-400 bg-richblack-800 p-6">
        <h2 className="text-lg font-semibold text-pink-200 mb-3">
          Danger Zone
        </h2>
        <DeleteAccount />
      </div>
    </>
  )
}
