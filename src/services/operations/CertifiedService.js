import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { CERTIFICATE_API } from "../api";
const {
  GET_MY_DETAILS_API,
  GET_SINGLE_CLIENT_API,
  UPLOAD_ID_CARD,
  DOWNLOAD_ID_CARD,
  CREATE_OR_UPDATE_SHAJRAH,
  GET_SHAJRA_DETAILS_API,
  DELETE_SHAJRAH,
  SAVE_MERITAL_CER_API,
  GET_MERITAL_DETAILS_API,
  UPLOAD_SHAJRA_API,
} = CERTIFICATE_API;


export function fetchMyClients() {
  return async (dispatch) => {
    try {
      // ✅ token nikaalo
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await apiConnector(
        "GET",
        GET_MY_DETAILS_API,
        null, // GET me body nahi hoti
        {
          Authorization: `Bearer ${token}`, // ✅ token header
        }
      );

      return res.data;
    } catch (error) {
      console.log("FETCH MY CLIENTS ERROR:", error);
      throw error;
    }
  };
}

export function fetchSingleClientDetails(clientId) {
  return async (dispatch) => {
    try {
      // ✅ token nikaalo
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        return {
          success: false,
          message: "Token missing, please login again",
        };
      }

      const res = await apiConnector(
        "GET",
        `${GET_SINGLE_CLIENT_API}/${clientId}`, // 👈 dynamic id
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      return res.data;
    } catch (error) {
      console.error(
        "❌ FETCH SINGLE CLIENT DETAILS ERROR:",
        error?.response?.data || error.message
      );

      return {
        success: false,
        message:
          error?.response?.data?.message || "Unable to fetch client details",
      };
    }
  };
}

export const uploadIdCard = async (clientId, imageFile, token) => {
  try {
    console.log("hello dekho ");
    console.log("toke n", token);
    const formData = new FormData();
    formData.append("clientId", clientId);
    formData.append("image", imageFile);
    console.log("hello dekho ", clientId);
    console.log("hello dekho ", imageFile);

    const response = await apiConnector("POST", UPLOAD_ID_CARD, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("response ....", response);
    toast.success("ID Card uploaded successfully");
    return response.data;
  } catch (error) {
    toast.error("ID Card upload failed");
    console.error(error);
  }
};



export const downloadIdCard = async (clientId, token) => {
  console.log("download me token", token);
  console.log("download me token", clientId);
  try {
    const response = await apiConnector(
      "POST",
      DOWNLOAD_ID_CARD,
      { clientId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("response download", response);

    return response.data;
  } catch (error) {
    console.error("Download failed", error);
  }
};




/* ======================================================
   CREATE / UPDATE SHAJRAH
   ====================================================== */
export const createOrUpdateShajrahService = async (clientId, formData) => {
  const toastId = toast.loading("Saving Shajrah...");

  try {
    const response = await apiConnector(
      "POST",
      `${CREATE_OR_UPDATE_SHAJRAH}/${clientId}`,
      formData,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    console.log("SHAJRAH SERVICE RESPOSNSE...",response)
    toast.success("Shajrah saved successfully");
    return response.data;

  } catch (error) {
    console.error("SHAJRAH SERVICE ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Failed to save shajrah"
    );
    return { success: false };
  } finally {
    toast.dismiss(toastId);
  }
};



/* ======================================================
   DELETE SHAJRAH
   ====================================================== */
export const deleteShajrahService = async (clientId) => {
  const toastId = toast.loading("Deleting Shajrah...");
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_SHAJRAH}/${clientId}`
    );

    toast.success("Shajrah deleted successfully");
    return response.data;

  } catch (error) {
    console.error("DELETE SHAJRAH ERROR:", error);
    toast.error("Failed to delete shajrah");
  } finally {
    toast.dismiss(toastId);
  }
};


export const saveMaritalCertificateService = async ( formData) => {
  const toastId = toast.loading("Saving Marital Certificate...");

  try {
    const token = JSON.parse(localStorage.getItem("token"));

    // very important -> add clientId in formData
    

    const response = await apiConnector(
      "POST",
      SAVE_MERITAL_CER_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
        // ❌ DO NOT manually set Content-Type here
        // browser automatically sets multipart boundary
      }
    );

    toast.success("Marital Certificate Saved Successfully");
    return response.data;

  } catch (error) {
    console.error("SAVE MARITAL CERT ERROR:", error);
    toast.error(
      error?.response?.data?.message ||
      "Failed to save marital certificate"
    );
  } finally {
    toast.dismiss(toastId);
  }
};


export const getMaritalCertificateByRegisterNoService = async (data) => {
  try {
    const response = await apiConnector(
      "POST",
      `${GET_MERITAL_DETAILS_API}`,
      data
    );
    console.log("GET MARITAL DETAILS RESPONSE....",response)
    return response.data;
  } catch (error) {
    console.log("GET MARITAL DETAILS ERROR:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "Unable to fetch marital certificate",
    };
  }
};

export const getShajrahDetailsService = async (clientId) => {
  const toastId = toast.loading("Fetching Shajrah...");

  try {
    const response = await apiConnector(
      "GET",
      `${GET_SHAJRA_DETAILS_API}/${clientId}`
    );
    console.log("GET_SHAJRA_DETAILS_API....",response)
    toast.success("Shajrah fetched successfully");

    return response.data;

  } catch (error) {
    console.error("GET SHAJRA ERROR:", error);

    toast.error(
      error?.response?.data?.message || "Failed to fetch Shajrah"
    );

    return { success: false };
  } finally {
    toast.dismiss(toastId);
  }
};

export const uploadShajrahImageService = async (clientId, file, token) => {
  const toastId = toast.loading("Uploading Shajrah image...");

  try {
    const formData = new FormData();
    formData.append("clientId", clientId);
    formData.append("shajrahImage", file);   // ⭐ name must match backend

    const response = await apiConnector(
      "POST",
      UPLOAD_SHAJRA_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success("Shajrah image uploaded successfully");

    return response?.data;
  } catch (error) {
    console.log(error);
    toast.error("Upload failed");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};