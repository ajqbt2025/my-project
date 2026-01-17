import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ACCOUNT_TYPE } from "../utils/constants";
import { setPasswordAPI } from "../services/operations/authAPI";
import { setUser } from "../slices/profileSlice";


function SetPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const [accountType, setAccountType] = useState(user?.accountType || ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


const handleOnSubmit = async (e) => {
  e.preventDefault();

  if (!password || !confirmPassword) {
    toast.error("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  const toastId = toast.loading("Setting password...");

  try {
    const payload = {
      email: user?.email,
      password,
      confirmPassword,
      accountType,
    };

    const response = await setPasswordAPI(payload);

    console.log("SET PASSWORD FULL RESPONSE 👉", response.data);
    if (!response.success) {
      toast.error(response.message || "Something went wrong");
      return;
    }

    // ✅ MOST IMPORTANT PART
    dispatch(setUser(response.user));

    toast.success("Password set successfully 🎉");
    navigate("/dashboard/my-profile");
  } catch (error) {
    console.log("SetPasswordForm error:", error);
    toast.error("Failed to set password");
  } finally {
    toast.dismiss(toastId);
  }
};


 

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 md:px-8 mt-10 mb-16">
      <div className="w-full max-w-md bg-richblack-800 p-6 sm:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-richblack-5 text-center">
          Set Your Password & Account Type
        </h2>

        

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          {/* Password */}
          <label className="relative">
            <p className="mb-1 text-sm sm:text-base text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full !pr-10 text-sm sm:text-base py-2 sm:py-3"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer text-richblack-200"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={22} />
              ) : (
                <AiOutlineEye fontSize={22} />
              )}
            </span>
          </label>

          {/* Confirm Password */}
          <label className="relative">
            <p className="mb-1 text-sm sm:text-base text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full !pr-10 text-sm sm:text-base py-2 sm:py-3"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer text-richblack-200"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={22} />
              ) : (
                <AiOutlineEye fontSize={22} />
              )}
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 rounded-lg bg-yellow-50 py-2 sm:py-3 font-medium text-richblack-900 hover:bg-yellow-100 transition-all"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetPasswordForm;
