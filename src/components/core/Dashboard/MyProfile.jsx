import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {

  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* ================= TOP CARD ================= */}
      <div className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">

        <div className="flex items-center gap-x-4">

          <img
            src={user?.image}
            alt="profile"
            className="aspect-square w-[78px] rounded-full object-cover"
          />

          <div className="space-y-1">

            <p className="text-xl font-bold text-richblack-5">
              {user?.fullName}
            </p>

            <p className="text-sm text-richblack-300">
              {user?.email}
            </p>

            <p
              className="px-3 py-1 mt-1 rounded-full text-xs font-bold w-fit bg-caribbeangreen-200 text-black"
            >
              {user?.accountType}
            </p>

          </div>
        </div>

        <IconBtn
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* ================= ABOUT ================= */}
      <div className="my-10 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>

          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p className="text-sm mt-2 text-richblack-200">
          {user?.additionalDetails?.about || "No about info added"}
        </p>

      </div>

      {/* ================= FULL DETAILS SECTION ================= */}
      <div className="my-10 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">

        <p className="text-lg font-semibold text-richblack-5 mb-6">
          All Profile Details
        </p>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-richblack-400 text-sm">Full Name</p>
            <p className="text-richblack-5 font-semibold">{user?.fullName}</p>
          </div>

          <div>
            <p className="text-richblack-400 text-sm">Email</p>
            <p className="text-richblack-5 font-semibold">{user?.email}</p>
          </div>

          <div>
            <p className="text-richblack-400 text-sm">Contact Number</p>
            <p className="text-richblack-5 font-semibold">
              {user?.contactNumber}
            </p>
          </div>

          <div>
            <p className="text-richblack-400 text-sm">Gender</p>
            <p className="text-richblack-5 font-semibold">
              {user?.additionalDetails?.gender || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-richblack-400 text-sm">Date of Birth</p>
            <p className="text-richblack-5 font-semibold">
              {formattedDate(user?.additionalDetails?.dateOfBirth) || "Not added"}
            </p>
          </div>

          

          <div>
            <p className="text-richblack-400 text-sm">User ID</p>
            <p className="text-yellow-100 font-semibold break-all">
              {user?._id}
            </p>
          </div>

          <div>
            <p className="text-richblack-400 text-sm">Account Created</p>
            <p className="text-richblack-5 font-semibold">
              {formattedDate(user?.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-richblack-400 text-sm">Last Updated</p>
            <p className="text-richblack-5 font-semibold">
              {formattedDate(user?.updatedAt)}
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
