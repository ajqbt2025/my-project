import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { authEndpoints } from "../api"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  GOOGLE_LOGIN_API,
  SET_PASSWORD_API
} = authEndpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  fullName,
  email,
  contactNumber,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating your account...")
    dispatch(setLoading(true))

    try {
          console.log("email:", email);
    console.log("otp:", otp);
    console.log("fullname:", fullName);
    console.log("conatct:", contactNumber);
    console.log("pass:", password);
      // ✅ Send signup data to backend
      const response = await apiConnector("POST", SIGNUP_API, {
        fullName,
        email,
        contactNumber,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE:", response?.data)

      // ✅ If signup fails
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Signup failed")
      }

     toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const user = response.data.user;

// 🔐 safe seed (kabhi undefined nahi hoga)
const seed =
  (user.fullName && user.fullName.trim()) ||
  (user.email && user.email.trim()) ||
  "User";

const userImage =
  user.image && user.image.trim() !== ""
    ? user.image
    : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(seed)}`;

dispatch(setUser({ ...user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token))
      navigate("/")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
      if (error.response?.data?.message === "User is not Registered with Us Please SignUp to Continue") {
        toast.error("User not Logged In");
        navigate("/signup")
      }
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


export function googleLogin(userData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing in with Google...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", GOOGLE_LOGIN_API, userData);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Google login failed");
      }

      const { user, token, isNewUser } = response.data;

      // 🛑 SAFETY: token must exist
      if (!token) {
        throw new Error("Token not received from server");
      }

     const seed =
  (user?.fullName && user.fullName.trim()) ||
  (user?.email && user.email.trim()) ||
  "User";

const userImage =
  user?.image && user.image.trim() !== ""
    ? user.image
    : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(seed)}`;

dispatch(setUser({ ...user, image: userImage }));

      // ✅ SAVE TOKEN (SAFE)
      dispatch(setToken(token));
      localStorage.setItem("token", JSON.stringify(token));

      toast.success("Login Successful 🎉");

      // 🔀 NAVIGATION
      if (isNewUser) {
        navigate("/setPassword");
      } else {
        navigate("/dashboard/my-profile");
      }

    } catch (error) {
      console.log("GOOGLE LOGIN ERROR 👉", error);
      toast.error(error.message || "Google Login Failed");

      // 🔥 SAFETY CLEANUP
      localStorage.removeItem("token");
      dispatch(setToken(null));
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}






export const setPasswordAPI = async (payload) => {
  try {
    const response = await apiConnector("POST", SET_PASSWORD_API, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to set password" };
  }
};