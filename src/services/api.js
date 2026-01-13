const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log(BASE_URL);
//  AUTH ENDPOINTS
export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  GOOGLE_LOGIN_API: BASE_URL + "/auth/withgoole",
  SET_PASSWORD_API: BASE_URL + "/auth/setpassword",
};

//  PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/user/getUserDetails",
  UPDATE_PROFILE_API: BASE_URL + "/user/updateProfile",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/user/updateDisplayPicture",
  DELETE_PROFILE_API: BASE_URL + "/user/deleteProfile",
  RESET_PASSWORD_TOKEN_API: BASE_URL + "/user/reset-password-token",
  RESET_PASSWORD_API: BASE_URL + "/user/reset-password",
};
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/user/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/user/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/user/deleteProfile",
};

// CLIENT CREATION ENDPOINTS
export const clientEndpoints = {
  CREATE_PERSONAL_DETAILS_API: BASE_URL + "/detailed/personal",
  CREATE_QUALIFICATION_API: BASE_URL + "/detailed/qualification",
  CREATE_OCCUPATION_API: BASE_URL + "/detailed/occupation",
  CREATE_PHYSICAL_CONDITION_API: BASE_URL + "/detailed/physical-condition",
  CREATE_MARITAL_STATUS_API: BASE_URL + "/detailed/marital-status",
  CREATE_RELATION_API: BASE_URL + "/detailed/relation",
  CREATE_GRANDPARENT_API: BASE_URL + "/detailed/grandparent",
  CREATE_BANK_DETAILS_API: BASE_URL + "/detailed/bank",
  CREATE_FULL_CLIENT_API: BASE_URL + "/detailed/client",
  SEARCH_BY_CLIENT_ID: BASE_URL + "/detailed/search/", 
};

export const CERTIFICATE_API = {
  GET_MY_DETAILS_API: BASE_URL + "/user/my-clients",
  GET_SINGLE_CLIENT_API: BASE_URL + "/user/client",
  UPLOAD_ID_CARD: BASE_URL + "/certified/upload-id-card",
  DOWNLOAD_ID_CARD: BASE_URL + "/certified/download-id-card",
  CREATE_OR_UPDATE_SHAJRAH: BASE_URL + "/certified/create-shajra",
  GET_SHAJRA_DETAILS_API: BASE_URL + "/certified/get-shajrah",
  DELETE_SHAJRAH: BASE_URL + "/certified/delete-shajrah",
  SAVE_MERITAL_CER_API: BASE_URL + "/certified/marital-certificate/save",
  GET_MERITAL_DETAILS_API: BASE_URL + "/certified/marital/search",
  UPLOAD_SHAJRA_API: BASE_URL + "/certified/upload-shajrah-image",

};

export const clienPaymenttAPI = {
  CLIENT_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  CLIENT_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  PAYMENT_CREATE_API: BASE_URL + "/payment/paymentDone/create",
   PAYMENT_SUMMARY_API: BASE_URL + "/payment/payment-details",
   CONTACT_SAVE_API: BASE_URL + "/payment/contact",        // POST
  CONTACT_GET_ALL_API: BASE_URL + "/payment/contact", 
    GET_ALL_PAYMENT: BASE_URL + "/payment/allPaymen/details", 
};



export const adminEndpoints = {

  //  Pending + Approved counts & list
  CLIENT_STATUS_LIST_API: BASE_URL + "/admin/clients/status-list",

  //  Search client
  SEARCH_CLIENT_BY_ID_API: BASE_URL + "/admin/client", // + /:clientId

  //  Approve client
  APPROVE_CLIENT_API: BASE_URL + "/admin/client/approve", // + /:clientId

  //  Reject client
  REJECT_CLIENT_API: BASE_URL + "/admin/client/reject", // + /:clientId

  //  Change status (pending/approved/rejected)
  UPDATE_CLIENT_STATUS_API: BASE_URL + "/admin/client/status", // + /:clientId

  //  Delete
  DELETE_CLIENT_API: BASE_URL + "/admin/client/delete", // + /:clientId

  //  All clients pagination
  GET_ALL_CLIENTS_API: BASE_URL + "/admin/clients/all",

  //  Shajrah approve/reject
  UPDATE_SHAJRAH_STATUS_API: BASE_URL + "/admin/shajrah/status", // + /:id

  //  Marital approve/reject
  UPDATE_MARITAL_STATUS_API: BASE_URL + "/admin/marital/status", // + /:id
  CHANGE_STATUS_CLIENT_API: BASE_URL + "/admin/client/Adstatus",
  GET_SHAJRA_API: BASE_URL + "/admin/shajrah/requests",
  CHANGE_SHAJRAH_STATUS_API: BASE_URL + "/admin/shajrah/status",
  GET_ALL_MERITAL_API: BASE_URL + "/admin/marital/all",
  FILTER_MERITAL_API: BASE_URL + "/admin/marital/filter",
   ADMIN_CLIENT_ACTIVITY_API: BASE_URL + "/admin/clientDetails/client", // + /:id

  //  Certificate management full details
  ADMIN_STATUS_REPORT_API: BASE_URL + "/admin/certified/certificate", // + /:id

  //  Marital certificate full details
  ADMIN_CREATED_BY_REPORT_API: BASE_URL + "/admin/meritalCerti/marital", // + /:id
  CREATE_NOTIFICATION_API: BASE_URL + "/admin/create/notification",
   FETCH_NOTIFICATION_API: BASE_URL + "/admin/fetch/notification",
};