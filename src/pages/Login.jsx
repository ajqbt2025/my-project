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





// import React, { useState } from "react"
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
// import { FcGoogle } from "react-icons/fc"
// import { useDispatch } from "react-redux"
// import { useNavigate, Link } from "react-router-dom"

// import { login, googleLogin } from "../services/operations/authAPI"
// import { signInWithGoogle } from "../utils/fireBase"

// export default function Login() {

//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })

//   const { email, password } = formData

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     dispatch(login(email, password, navigate))
//   }

//   const handleGoogle = async () => {
//     const userData = await signInWithGoogle()
//     if (!userData) return
//     dispatch(googleLogin(userData, navigate))
//   }

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-richblack-900 px-4">

//       <div className="w-full max-w-md rounded-2xl border border-richblack-700 bg-richblack-800 shadow-xl p-8">

//         <h2 className="text-3xl font-semibold text-richblack-5 text-center">
//           Welcome Back 
//         </h2>

//         <p className="text-richblack-200 text-center mt-1">
//           Login to continue your journey
//         </p>

//         {/* Google Button */}
//         <button
//           onClick={handleGoogle}
//           className="mt-6 w-full flex items-center justify-center gap-3 rounded-lg border border-richblack-600 bg-richblack-700 py-2.5 text-richblack-5 hover:bg-richblack-600 transition-all"
//         >
//           <FcGoogle className="text-2xl" />
//           Continue with Google
//         </button>

//         {/* Divider */}
//         <div className="flex items-center gap-3 my-5">
//           <div className="h-[1px] w-full bg-richblack-600" />
//           <p className="text-richblack-300 text-sm">OR</p>
//           <div className="h-[1px] w-full bg-richblack-600" />
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Email */}
//           <div>
//             <label className="text-richblack-5 text-sm">Email</label>
//             <input
//               type="email"
//               name="email"
//               required
//               value={email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="mt-1 w-full rounded-lg bg-richblack-900 border border-richblack-600 px-3 py-2 text-richblack-5 outline-none"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="text-richblack-5 text-sm">Password</label>

//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               required
//               value={password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="mt-1 w-full rounded-lg bg-richblack-900 border border-richblack-600 px-3 py-2 pr-10 text-richblack-5 outline-none"
//             />

//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-9 cursor-pointer text-richblack-200"
//             >
//               {showPassword ? <AiOutlineEyeInvisible size={22}/> : <AiOutlineEye size={22}/>}
//             </span>

            
//               <p className="mt-1 text-xs text-blue-100 text-right" onClick={handleGoogle}>
//                 Forgot Password?
//               </p>
            
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full mt-2 rounded-lg bg-yellow-50 py-2 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all"
//           >
//             Sign In
//           </button>

//         </form>

//         {/* Bottom Text */}
//         <p className="text-center mt-6 text-sm mb-20 text-richblack-200">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-100 underline">
//             Create one
//           </Link>
//         </p>

//       </div>
//     </div>
//   )
// }


import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { login, googleLogin } from "../services/operations/authAPI";
import { signInWithGoogle } from "../utils/fireBase";

import logoImage from "figma:asset/14bb8d405eaf24ab46d53d9ceb7bc516044ec74a.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  const handleGoogle = async () => {
    const userData = await signInWithGoogle();
    if (!userData) return;
    dispatch(googleLogin(userData, navigate));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logoImage} alt="Logo" className="h-24 w-auto" />
          </div>
          <h1 className="text-white mb-2">
            AL-Jamiyatul Quresh Fraternity
          </h1>
          <p className="text-gray-400">
            Tarkheda, Amravati 444601, Maharashtra
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">

          <h2 className="text-2xl text-white text-center mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Login to continue your journey
          </p>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors bg-gray-950 text-white"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">OR</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Forgot */}
            <div className="text-right">
              <span
                onClick={handleGoogle}
                className="text-sm text-blue-400 cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Bottom */}
          <p className="text-center mt-6 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 underline">
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

