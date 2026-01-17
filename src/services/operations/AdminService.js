import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../api";

const {

  DELETE_CLIENT_API,
  GET_ALL_CLIENTS_API,
  
  UPDATE_MARITAL_STATUS_API,
  CHANGE_STATUS_CLIENT_API,
  GET_SHAJRA_API,
  CHANGE_SHAJRAH_STATUS_API,
  GET_ALL_MERITAL_API,
  FILTER_MERITAL_API,
  ADMIN_CLIENT_ACTIVITY_API,
  ADMIN_STATUS_REPORT_API,
  ADMIN_CREATED_BY_REPORT_API,
  CREATE_NOTIFICATION_API,
  FETCH_NOTIFICATION_API
} = adminEndpoints;

export const getAdminClientActivityService = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      ADMIN_CLIENT_ACTIVITY_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getClientStatusReportService = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      ADMIN_STATUS_REPORT_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getClientCreatedByAdminsService = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      ADMIN_CREATED_BY_REPORT_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const changeShajrahStatusService = async (id, status, token) => {
  const toastId = toast.loading("Updating status...");

  try {
    const res = await apiConnector(
      "PUT",
      `${CHANGE_SHAJRAH_STATUS_API}/${id}`,
      { status },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("erewrerewrew", res);

    toast.success("Status updated successfully");
    return res.data;
  } catch (error) {
    console.error("CHANGE SHAJRAH STATUS ERROR:", error);
    toast.error(error?.response?.data?.message || "Failed to update status");
    return { success: false };
  } finally {
    toast.dismiss(toastId);
  }
};

export const changeClientStatusService = async (clientId, status, token) => {
  const toastId = toast.loading("Updating status...");

  try {
    const res = await apiConnector(
      "PUT",
      `${CHANGE_STATUS_CLIENT_API}/${clientId}`,
      { status },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success("Status updated successfully");
    return res.data;
  } catch (error) {
    console.error("CHANGE STATUS ERROR:", error);
    toast.error(error?.response?.data?.message || "Failed to update status");
    return { success: false };
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteClientService = async (clientId, token) => {
  const toastId = toast.loading("Deleting client...");
  try {
    const res = await apiConnector(
      "DELETE",
      `${DELETE_CLIENT_API}/${clientId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success("Client deleted");
    return res.data;
  } catch (err) {
    toast.error("Delete failed");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

export const getAllClientsService = async (page = 1, token) => {
  const toastId = toast.loading("Loading all clients...");
  try {
    const res = await apiConnector(
      "GET",
      `${GET_ALL_CLIENTS_API}?page=${page}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("response dikhao", res);
    toast.success("Loaded clients");
    return res.data;
  } catch (err) {
    toast.error("Failed loading clients");
    console.log(err);
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateMaritalStatusService = async (id, status, token) => {
  const toastId = toast.loading("Updating marital certificate...");
  try {
    const res = await apiConnector(
      "PUT",
      `${UPDATE_MARITAL_STATUS_API}/${id}`,
      { status },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success("Marital status updated");
    return res.data;
  } catch (err) {
    toast.error("Failed to update marital status");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
export const getAllShajrahRequestsService = async ({
  page = 1,
  status = "",
  search = "",
  token,
}) => {
  const toastId = toast.loading("Loading Shajrah requests...");

  try {
    let url = `${GET_SHAJRA_API}?page=${page}`;

    if (status) url += `&status=${status}`;
    if (search) url += `&search=${search}`;

    const res = await apiConnector("GET", url, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET SHAJRA REQUEST  ===>", res);
    toast.success("Shajrah requests loaded");
    return res.data;
  } catch (error) {
    console.log("GET SHAJRA REQUEST ERROR ===>", error);
    toast.error("Unable to load Shajrah requests");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
export const getAllMeritalAdminService = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_MERITAL_API);

    return response.data;
  } catch (error) {
    console.log("GET_ALL_MERITAL_API ERROR", error);
    return {
      success: false,
      message: "Unable to fetch marital certificates",
    };
  }
};

export const getFilteredMeritalAdminService = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();

    const url = `${FILTER_MERITAL_API}?${query}`;

    const response = await apiConnector("GET", url);

    return response.data;
  } catch (error) {
    console.log("FILTER_MERITAL_API ERROR", error);
    return {
      success: false,
      message: "Unable to fetch filtered marital certificates",
    };
  }
};

export const createNotificationService = async (data, token) => {
  const toastId = toast.loading("Creating notification...");
  try {
    console.log("CREATE_NOTIFICATION_API",data)
    const response = await apiConnector(
      "POST",
      CREATE_NOTIFICATION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Notification created successfully");
    return response.data;

  } catch (error) {
    console.log("CREATE_NOTIFICATION_API ERROR =>", error);
    toast.error(error.response?.data?.message || "Failed to create notification");
  } finally {
    toast.dismiss(toastId);
  }
};



export const fetchPublicNotifications = async () => {
  try {
    const response = await apiConnector(
      "GET",
      FETCH_NOTIFICATION_API
    );

    return response.data;
  } catch (error) {
    console.log("FETCH NOTIFICATION ERROR =>", error);
  }
};

