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
  const [formData, setFormData] = useState({ email: "", password: "" })

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-richblack-900 p-4 font-inter">
      
      {/* --- Main Card Container --- */}
      <div className="relative w-full max-w-[450px] overflow-hidden rounded-[3rem] bg-gradient-to-br from-caribbeangreen-400 via-blue-200 to-pink-400 p-8 shadow-2xl md:p-12">
        
        {/* Subtle Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="mb-8 text-4xl font-bold text-white tracking-tight">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-6">

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogle}
              className="flex w-full items-center justify-center gap-x-3 rounded-full border border-white/30 bg-white/10 py-3 text-white transition-all hover:bg-white/20"
            >
              <FcGoogle className="text-2xl" />
              <span className="text-sm font-semibold">Google Login</span>
            </button>
            <div className="flex items-center gap-x-4 px-2 py-2">
              <div className="h-[1px] flex-1 bg-white/20"></div>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">OR</p>
              <div className="h-[1px] flex-1 bg-white/20"></div>
            </div>
            {/* Email Field */}
            <div className="space-y-1">
              <label className="ml-1 text-sm font-medium text-richblack-5/80">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-full bg-white/20 border border-white/30 p-4 text-white placeholder-white/60 backdrop-blur-md focus:bg-white/30 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1 relative">
              <label className="ml-1 text-sm font-medium text-richblack-5/80">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-full bg-white/20 border border-white/30 p-4 text-white placeholder-white/60 backdrop-blur-md focus:bg-white/30 focus:outline-none transition-all duration-300"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/70 hover:text-white"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </span>
              </div>
              <Link to="/forgot-password">
                <p className="mt-2 mr-2 text-right text-xs text-white/80 hover:text-white transition-all underline decoration-white/30">
                  Forgot Password?
                </p>
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-full bg-blue-100 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-blue-200"
            >
              <span className="relative z-10 uppercase tracking-widest">Login</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {/* Divider */}
            
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-sm text-white/70">
            Need an account?{" "}
            <Link to="/signup" className="font-bold text-white hover:underline underline-offset-4">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
