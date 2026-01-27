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
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-black p-4 font-inter selection:bg-blue-200">
      
      {/* Background Decorative Circles (Image Style) */}
      <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-richblue-400/20 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-pink-400/10 blur-[100px]"></div>

      {/* --- Main Glossy Card --- */}
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-richblack-800 via-richblack-900 to-black p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] md:p-12">
        
        {/* Top Gloss Shine (Reflective effect from image 2) */}
        <div className="absolute -top-[50%] -left-[10%] h-[150%] w-[120%] rotate-12 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white tracking-tight">Login</h1>
            <div className="h-1 w-12 bg-blue-100 mx-auto mt-2 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-richblack-200 ml-4">
                Username / Email
              </label>
              <div className="group relative">
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full rounded-full bg-richblack-700/50 border border-white/10 p-4 pl-6 text-white placeholder-richblack-400 backdrop-blur-xl focus:bg-richblack-700 focus:border-blue-100 focus:outline-none transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-richblack-200 ml-4">
                Password
              </label>
              <div className="relative group">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-full bg-richblack-700/50 border border-white/10 p-4 pl-6 pr-12 text-white placeholder-richblack-400 backdrop-blur-xl focus:bg-richblack-700 focus:border-blue-100 focus:outline-none transition-all duration-300 shadow-inner"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-richblack-300 hover:text-white transition-colors"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </span>
              </div>
            </div>

            {/* Actions: Remember Me & Forgot (Media Query Friendly) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-richblack-600 bg-richblack-800 accent-blue-100" />
                <span className="text-xs text-richblack-300 group-hover:text-richblack-5">Remember me</span>
              </label>
              <Link to="/forgot-password">
                <p className="text-xs text-blue-100 hover:text-blue-50 transition-all">Forgot Password?</p>
              </Link>
            </div>

            {/* Login Button (Image 1 Color Style) */}
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-blue-200 to-blue-400 py-4 font-black text-richblack-900 shadow-[0_10px_20px_rgba(71,165,197,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-blue-200/40"
            >
              LOGIN
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogle}
              className="flex w-full items-center justify-center gap-x-3 rounded-full border border-white/10 bg-white/5 py-3 text-white transition-all hover:bg-white/10 hover:border-white/20"
            >
              <FcGoogle className="text-xl" />
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-richblack-400">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-white hover:text-blue-100 underline underline-offset-4">
              Join EduNova
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
