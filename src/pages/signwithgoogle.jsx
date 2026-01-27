import React from "react"
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signInWithGoogle } from "../utils/fireBase"
import { googleLogin } from "../services/operations/authAPI"

export default function GoogleSignup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    const userData = await signInWithGoogle()
    if (!userData) return
    dispatch(googleLogin(userData, navigate))
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-richblack-900 p-4 font-inter">
      
      {/* --- Main Image-Style Card --- */}
      <div className="relative w-full max-w-[450px] overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-caribbeangreen-300 via-blue-100 to-pink-300 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:p-14">
        
        {/* Glass Effect Overlay */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Brand/Heading */}
          <h1 className="text-4xl font-bold text-white tracking-tight">
            EduNova
          </h1>
          
          <div className="mt-6 space-y-2">
            <p className="text-lg font-medium text-white/90">
              Create your account
            </p>
            <p className="text-sm leading-relaxed text-white/70 italic font-edu-sa">
              "Smart education for a better tomorrow"
            </p>
          </div>

          {/* Action Area (Visual representation of your image) */}
          <div className="mt-10 w-full">
            <button
              onClick={handleGoogleLogin}
              className="group relative flex w-full items-center justify-center gap-x-4 rounded-full bg-white/20 border border-white/40 py-4 px-6 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/30 hover:scale-[1.03] active:scale-95 shadow-xl"
            >
              <div className="rounded-full bg-white p-1.5 group-hover:rotate-[360deg] transition-transform duration-500">
                <FcGoogle className="text-2xl" />
              </div>
              <span className="text-lg font-semibold tracking-wide">
                Continue with Google
              </span>
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-12 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold">
              Secure Cloud Auth
            </p>
            <p className="text-xs text-white/60 leading-tight">
              By continuing, you agree to our <br />
              <span className="text-white underline cursor-pointer">Terms</span> & <span className="text-white underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>

        </div>

        {/* Decorative Light Spots (Image feel) */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-100/20 blur-3xl"></div>
      </div>
    </div>
  )
}
