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
    <div className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-richblack-900 overflow-hidden font-inter">
      
      {/* --- Dynamic Background Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/10 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-50/5 blur-[120px]"></div>

      <div className="relative z-10 w-11/12 max-w-[480px] p-1">
        {/* Border Gradient Wrap */}
        <div className="rounded-3xl bg-gradient-to-b from-richblack-700 to-richblack-900 p-[1px] shadow-2xl">
          
          <div className="rounded-3xl bg-richblack-800/90 backdrop-blur-xl p-8 md:p-10">
            
            {/* Header */}
            <header className="text-center mb-10">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-richblack-5 via-richblack-100 to-richblack-500 bg-clip-text text-transparent inline-block">
                Welcome Back AJQFT
              </h1>
              <p className="mt-3 text-richblack-300 text-sm tracking-wide">
                Experience the next generation of learning.
              </p>
            </header>

            {/* Google Action */}
            <button
              onClick={handleGoogle}
              className="group relative flex w-full items-center justify-center gap-x-3 rounded-xl border border-richblack-600 bg-richblack-900 py-3 px-4 text-richblack-100 transition-all duration-300 hover:border-blue-100 hover:bg-richblack-800"
            >
              <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
              <span className="font-medium">Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="my-8 flex items-center gap-x-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-richblack-600"></div>
              <p className="text-[10px] font-bold text-richblack-500 tracking-[0.2em] uppercase">Secure Login</p>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-richblack-600"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
              
              <div className="group flex flex-col gap-y-1">
                <label className="text-xs font-semibold text-richblack-400 ml-1 uppercase tracking-tighter">
                  Professional Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="w-full rounded-xl bg-richblack-900/50 p-3.5 text-richblack-5 border border-richblack-700 focus:border-blue-100 focus:ring-1 focus:ring-blue-100 outline-none transition-all duration-300"
                />
              </div>

              <div className="group flex flex-col gap-y-1 relative">
                <label className="text-xs font-semibold text-richblack-400 ml-1 uppercase tracking-tighter">
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
                    className="w-full rounded-xl bg-richblack-900/50 p-3.5 pr-12 text-richblack-5 border border-richblack-700 focus:border-blue-100 focus:ring-1 focus:ring-blue-100 outline-none transition-all duration-300"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-richblack-400 hover:text-blue-100 transition-colors"
                  >
                    {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                  </span>
                </div>
                <Link to="/forgot-password">
                  <p className="mt-2 text-right text-xs text-blue-100 hover:text-blue-200 transition-colors font-medium">
                    Reset Password?
                  </p>
                </Link>
              </div>

              <button
                type="submit"
                className="relative mt-4 overflow-hidden rounded-xl bg-yellow-50 py-3.5 font-bold text-richblack-900 transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,214,10,0.3)] active:scale-[0.98]"
              >
                <span className="relative z-10">Sign In to Dashboard</span>
              </button>
            </form>

            <footer className="mt-8 text-center">
              <p className="text-sm text-richblack-400">
                New to our platform?{" "}
                <Link to="/signup" className="font-bold text-blue-100 hover:text-blue-200 underline decoration-blue-100/30 underline-offset-4 transition-all">
                  Create Account
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
