import React, { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"

import { login, googleLogin } from "../services/operations/authAPI"
import { signInWithGoogle } from "../utils/fireBase"

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  const handleGoogle = async () => {
    const userData = await signInWithGoogle()
    if (!userData) return
    dispatch(googleLogin(userData, navigate))
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-richblack-900 font-inter">
      <div className="w-11/12 max-w-[450px] p-4 md:p-8">
        
        {/* Heading Section */}
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          Welcome Back
        </h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
          <span className="text-richblack-100">Build skills for today, tomorrow, and beyond.</span>{" "}
          <span className="font-edu-sa font-bold italic text-blue-100">
            Education to future-proof your career.
          </span>
        </p>

        {/* Google Login Button */}
        <button
          onClick={handleGoogle}
          className="mt-6 flex w-full items-center justify-center gap-x-2 rounded-[8px] border border-richblack-700 bg-richblack-800 py-[8px] px-[12px] font-medium text-richblack-100 transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-5"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-x-4">
          <div className="h-[1px] w-full bg-richblack-700"></div>
          <p className="font-medium leading-[1.375rem] text-richblack-700 uppercase">OR</p>
          <div className="h-[1px] w-full bg-richblack-700"></div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-b-[1px] border-richblack-600 focus:outline-none focus:border-yellow-50 transition-all duration-200"
            />
          </label>

          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 border-b-[1px] border-richblack-600 focus:outline-none focus:border-yellow-50 transition-all duration-200"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <Link to="/forgot-password">
              <p className="mt-1 ml-auto max-w-fit text-xs text-blue-100 hover:text-blue-200 transition-all">
                Forgot Password?
              </p>
            </Link>
          </label>

          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-100"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-richblack-300">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="font-medium text-blue-100 hover:text-blue-200 transition-all">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
