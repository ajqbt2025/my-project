import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../api"
import { logout } from "./authAPI"

const {
  GET_USER_DETAILS_API,
} = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "GET",
        GET_USER_DETAILS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const user = response.data.data;

      // ✅ FULL NAME BASED IMAGE (SAFE)
      const seed =
        (user.fullName && user.fullName.trim()) ||
        (user.email && user.email.trim()) ||
        "User";

      const userImage =
        user.image && user.image.trim() !== ""
          ? user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(seed)}`;

      dispatch(setUser({ ...user, image: userImage }));

    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function getonlyDetails(token) {
    const toastId = toast.loading("Loading...")
    
    try {
      console.log("first4")
    const response =  apiConnector(
      "GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("first4")
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }
     return response.data;
    } catch (error) {
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
  
}