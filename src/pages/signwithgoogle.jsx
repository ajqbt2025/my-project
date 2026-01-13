import React from "react"
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signInWithGoogle } from "../utils/fireBase"
import { googleLogin } from "../services/operations/authAPI"

import frameImg from "../assests/frame.png"
import signupImg from "../assests/signup.webp"

export default function GoogleSignup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    const userData = await signInWithGoogle()
    if (!userData) return
    dispatch(googleLogin(userData, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900 mb-16">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-x-12">
        
        {/* LEFT SECTION */}
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Join the millions learning to code with{" "}
            <span className="text-blue-100">EduNova</span> for free
          </h1>

          <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Build skills for today, tomorrow, and beyond.{" "}
            <span className="font-edu-sa font-bold italic text-blue-100">
              Education to future-proof your career.
            </span>
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-richblack-700 bg-richblack-800 py-3 font-medium text-richblack-5 shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-all duration-200 hover:scale-[1.02] hover:bg-richblack-700"
            >
              <FcGoogle className="text-2xl" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        {/* RIGHT SECTION (IMAGE) */}
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          <img
            src={frameImg}
            alt="Frame"
            width={558}
            height={504}
            loading="lazy"
          />
          <img
            src={signupImg}
            alt="Students"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-4 right-4 z-10"
          />
        </div>
      </div>
    </div>
  )
}