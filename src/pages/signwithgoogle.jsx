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
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-richblack-900 px-4">
      <div className="w-full max-w-[420px] rounded-xl bg-richblack-800 p-6 sm:p-8 shadow-lg">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-richblack-5">
          Welcome to <span className="text-blue-100">AJQFT Community</span>
        </h1>

        <p className="mt-3 text-center text-sm sm:text-base text-richblack-100">
          Social Welfare Foundation And Genealogy
          <span className="font-edu-sa italic text-blue-100"> Tarkheda Amravati</span>
        </p>

        <button
          onClick={handleGoogleLogin}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-md border border-richblack-600 bg-richblack-700 py-3 text-sm sm:text-base font-medium text-richblack-5 transition-all duration-200 hover:bg-richblack-600 hover:scale-[1.02]"
        >
          <FcGoogle className="text-xl sm:text-2xl" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs sm:text-sm text-richblack-300">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  )
}
