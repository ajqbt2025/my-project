import { apiConnector } from "../apiConnector";
import { clientEndpoints } from "../api";
import { toast } from "react-hot-toast";
import { setPersonalDetailsId } from "../../slices/clientSlice";
const {
  CREATE_PERSONAL_DETAILS_API,
  CREATE_QUALIFICATION_API,
  CREATE_OCCUPATION_API,
  CREATE_BANK_DETAILS_API,
  CREATE_FULL_CLIENT_API,
  CREATE_PHYSICAL_CONDITION_API,
  CREATE_MARITAL_STATUS_API,
  CREATE_GRANDPARENT_API,
  CREATE_RELATION_API,
  SEARCH_BY_CLIENT_ID
} = clientEndpoints;

// 🧩 Create Personal Details
export function personalDetails(formData,token) {
  return async (dispatch) => {
    console.log("service personal token",token)
    const toastId = toast.loading("Saving personal details...");

    try {
      // 🔹 API CALL (multipart/form-data)
      const response = await apiConnector(
        "POST",
        CREATE_PERSONAL_DETAILS_API,
        formData,
       {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("CREATE_PERSONAL_DETAILS_API RESPONSE 👉", response);

      // 🔹 Validation
      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to save personal details"
        );
      }

      const data = response.data;

      // ✅ Redux me ID save
      dispatch(setPersonalDetailsId(data.personalDetailsId));

      toast.success("Personal details saved successfully ✅");

      // optional navigation
      // navigate("/dashboard/qualification");

      // 🔥 MOST IMPORTANT: RETURN DATA
      return data;

    } catch (error) {
      console.error(
        "CREATE_PERSONAL_DETAILS_API ERROR 👉",
        error?.response?.data || error.message
      );

      toast.error(
        error?.response?.data?.message || "Something went wrong!"
      );

      // 🔥 VERY IMPORTANT: return null so frontend can handle
      return null;

    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function qualificationDetails(data,token) {
  return async (dispatch) => {
    const toastId = toast.loading("Saving qualification details...");
    try {
      // Call backend API
      const response = await apiConnector("POST", CREATE_QUALIFICATION_API, data,
        {
        Authorization: `Bearer ${token}`,
      }
      );

      console.log("CREATE_QUALIFICATION_API RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to save qualification details"
        );
      }

      toast.success("Qualification details saved successfully ✅");

      // Optionally dispatch or navigate
      // dispatch(setQualificationDetails(response.data.data));
      // navigate("/next-step");

      return response.data; // return full API response for modal handling
    } catch (error) {
      console.error("CREATE_QUALIFICATION_API ERROR:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
export function occupationDetails(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Saving occupation details...");
    try {
      // Call backend API
      const response = await apiConnector("POST", CREATE_OCCUPATION_API, data,
        {
        Authorization: `Bearer ${token}`,
      }
      );

      console.log("CREATE_OCCUPATION_API RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to save occupation details"
        );
      }

      toast.success("Occupation details saved successfully ✅");

      // Optionally dispatch or navigate
      // dispatch(setOccupationDetails(response.data.data));
      // navigate("/next-step");

      return response.data; // return full API response for handling
    } catch (error) {
      console.error("CREATE_OCCUPATION_API ERROR:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      toast.dismiss(toastId);
    }
  };
}


export function bankDetails(data,token) {
  return async (dispatch) => {
    const toastId = toast.loading("Saving bank details...");
    try {
      const response = await apiConnector(
        "POST",
        CREATE_BANK_DETAILS_API,
        data,
        {
        Authorization: `Bearer ${token}`,
      }
      );

      console.log("CREATE_BANK_DETAILS_API RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      toast.success("Bank details saved successfully ✅");
      return response.data;
    } catch (error) {
      console.error("CREATE_BANK_DETAILS_API ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Something went wrong!"
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
}


/* -------------------------- FULL CLIENT DETAILS -------------------------- */
export function createFullClient(data,token) {
  console.log("data",data)
  return async (dispatch) => {
    const toastId = toast.loading("Saving full client...");
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log("token",token)
      const response = await apiConnector(
        "POST",
        CREATE_FULL_CLIENT_API,
        data,
        {
        Authorization: `Bearer ${token}`,
      }
      );
      console.log(" CREATE_FULL_CLIENT_API RESPONSE...",response)
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to save client");
      }

      toast.success("Client saved successfully ✅");
      return response.data;
    } catch (error) {
      console.error("CREATE_FULL_CLIENT_API ERROR:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
}
/* -------------------------- PHYSICAL CONDITION -------------------------- */
export function physicalConditionDetails(data,token) {
  return async (dispatch) => {
    const toastId = toast.loading("Saving physical condition...");
    try {
      const response = await apiConnector("POST", CREATE_PHYSICAL_CONDITION_API, data,
        {
        Authorization: `Bearer ${token}`,
      }
      );
      console.log("CREATE_PHYSICAL_CONDITION_API RESPONSE:", response);

      if (!response?.data?.success) throw new Error(response?.data?.message);

      toast.success("Physical condition saved successfully ✅");
      return response.data;
    } catch (error) {
      console.error("CREATE_PHYSICAL_CONDITION_API ERROR:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

/* -------------------------- MARITAL STATUS -------------------------- */
export function maritalStatusDetails(data,token) {
  return async (dispatch) => {
    const toastId = toast.loading("Saving marital status...");
    try {
      const response = await apiConnector("POST", CREATE_MARITAL_STATUS_API, data,
        {
        Authorization: `Bearer ${token}`,
      }
      );
      console.log("CREATE_MARITAL_STATUS_API RESPONSE:", response);

      if (!response?.data?.success) throw new Error(response?.data?.message);

      toast.success("Marital status saved successfully ✅");
      return response.data;
    } catch (error) {
      console.error("CREATE_MARITAL_STATUS_API ERROR:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

/* -------------------------- GRANDPARENT DETAILS -------------------------- */
export function grandparentDetails(data,token) {
  return async (dispatch) => {
    const toastId = toast.loading("Saving grandparent details...");
    try {
      const response = await apiConnector(
        "POST",
        CREATE_GRANDPARENT_API,
        data,
        {
        Authorization: `Bearer ${token}`,
      }
      );

      console.log("CREATE_GRANDPARENT_API RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      toast.success("Grandparent details saved successfully ✅");
      return response.data;
    } catch (error) {
      console.error("CREATE_GRANDPARENT_API ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Something went wrong!"
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
}


/* -------------------------- RELATION DETAILS -------------------------- */
export function relationDetails(data,token) {
  return async (dispatch) => {
    const toastId = toast.loading("Saving relation details...");
    try {
      const response = await apiConnector(
        "POST",
        CREATE_RELATION_API,
        data,
        {
        Authorization: `Bearer ${token}`,
      }
      );

      console.log("CREATE_RELATION_API RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      toast.success("Relation details saved successfully ✅");

      return response.data;
    } catch (error) {
      console.error("CREATE_RELATION_API ERROR:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      toast.dismiss(toastId);
    }
  };
}


export const searchCertificateByClientIdService = async (clientId,token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${SEARCH_BY_CLIENT_ID}${clientId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("{SEARCH_BY_CLIENT_ID}....",response)
    toast.success("Client record found");
    return response.data;
  } catch (error) {
    toast.error("Client not found");
    console.log(error);
    return null;
  }
};