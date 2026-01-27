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
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-black p-4 font-inter selection:bg-blue-200">
      
      {/* Background Decorative Aura (Reflecting Image Theme) */}
      <div className="absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-richblue-500/10 blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-pink-500/10 blur-[120px]"></div>

      {/* --- Main Glossy Card --- */}
      <div className="relative w-full max-w-[450px] overflow-hidden rounded-[3.5rem] border border-white/10 bg-gradient-to-br from-richblack-800 via-richblack-900 to-black p-10 shadow-[0_0_60px_rgba(0,0,0,0.9)] md:p-14">
        
        {/* Gloss Reflection Layer (From Image 2 style) */}
        <div className="absolute -top-[40%] -left-[10%] h-[150%] w-[130%] rotate-[25deg] bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* User Icon Placeholder (Image 2 style) */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-inner">
             <div className="h-10 w-10 rounded-full bg-richblack-600/50"></div>
          </div>

          <h1 className="text-4xl font-black text-white tracking-tighter">
            EduNova
          </h1>
          
          <div className="mt-4 space-y-2">
            <p className="text-richblack-50 text-lg font-medium">Create your account</p>
            <p className="font-edu-sa text-sm italic text-blue-100/80">
              Smart education for a better tomorrow
            </p>
          </div>

          {/* Action Area */}
          <div className="mt-12 w-full">
            <button
              onClick={handleGoogleLogin}
              className="group relative flex w-full items-center justify-center gap-x-4 rounded-full bg-white/5 border border-white/10 py-4 px-6 text-white backdrop-blur-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95 shadow-2xl"
            >
              <div className="rounded-full bg-white p-2 group-hover:rotate-[360deg] transition-transform duration-700 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <FcGoogle className="text-2xl" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Continue with Google
              </span>
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-14 space-y-6">
            <div className="flex items-center gap-3">
               <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
               <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Cloud Identity</span>
               <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
            </div>
            
            <p className="text-[11px] leading-relaxed text-richblack-400">
              By joining, you agree to our <br />
              <span className="text-blue-100 hover:text-white underline cursor-pointer transition-colors">Terms of Service</span> & <span className="text-blue-100 hover:text-white underline cursor-pointer transition-colors">Privacy Policy</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
