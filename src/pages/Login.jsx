// import loginImg from "../assests/login.webp"
// import Template from "../components/core/Auth/Template"

// function Login() {
//   return (
//     <Template
//       title="Welcome Back"
//       description1="Build skills for today, tomorrow, and beyond."
//       description2="Education to future-proof your career."
//       image={loginImg}
//       formType="login"
//     />
//   )
// }

// export default Login





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
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
    <div className="min-h-screen w-full flex items-center justify-center bg-richblack-900 px-4">

      <div className="w-full max-w-md rounded-2xl border border-richblack-700 bg-richblack-800 shadow-xl p-8">

        <h2 className="text-3xl font-semibold text-richblack-5 text-center">
          Welcome Back 
        </h2>

        <p className="text-richblack-200 text-center mt-1">
          Login to continue your journey
        </p>

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          className="mt-6 w-full flex items-center justify-center gap-3 rounded-lg border border-richblack-600 bg-richblack-700 py-2.5 text-richblack-5 hover:bg-richblack-600 transition-all"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-[1px] w-full bg-richblack-600" />
          <p className="text-richblack-300 text-sm">OR</p>
          <div className="h-[1px] w-full bg-richblack-600" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-richblack-5 text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-lg bg-richblack-900 border border-richblack-600 px-3 py-2 text-richblack-5 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-richblack-5 text-sm">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 w-full rounded-lg bg-richblack-900 border border-richblack-600 px-3 py-2 pr-10 text-richblack-5 outline-none"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-richblack-200"
            >
              {showPassword ? <AiOutlineEyeInvisible size={22}/> : <AiOutlineEye size={22}/>}
            </span>

            
              <p className="mt-1 text-xs text-blue-100 text-right" onClick={handleGoogle}>
                Forgot Password?
              </p>
            
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 rounded-lg bg-yellow-50 py-2 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all"
          >
            Sign In
          </button>

        </form>

        {/* Bottom Text */}
        <p className="text-center mt-6 text-sm mb-20 text-richblack-200">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-100 underline">
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}

