const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middleware/auth");

const {
  getPendingAndApprovedClients,
  searchClientById,
  approveClientStatus,
  rejectClientStatus,
  deleteClient,
  getAllClients,
  updateShajrahStatus,
  updateMaritalStatus,
  updateClientStatusAdmin,
  getAllShajrahRequests,
  
} = require("../controller/adminController/FetchClients");
const {
  getAllMaritalCertificates,
  getFilteredMaritalCertificates,
} = require("../controller/certifiedController/meritalCer");
// 🟡 Pending aur Approved list
const {
  getAdminClientActivity                   ,
  getClientStatusReport,
  getClientCreatedByAdmins,
  createNotification,
  getPublicNotifications,
} = require("../controller/adminController/systemlogContro")


router.get("/clientDetails/client", getAdminClientActivity                   );
router.get("/certified/certificate", getClientStatusReport);
router.get("/meritalCerti/marital", getClientCreatedByAdmins);
router.get("/clients/status-list", auth,isAdmin, getPendingAndApprovedClients);

// 🔎 Search by Client ID
router.get("/client/:clientId", auth,isAdmin, searchClientById);

// 🟢 Approve Client
router.put("/client/approve/:clientId", auth,isAdmin, approveClientStatus);

// 🔴 Reject Client
router.put("/client/reject/:clientId", auth,isAdmin, rejectClientStatus);

// 🔄 Universal Status Update

// 🗑 Delete Client
router.delete("/client/delete/:clientId", auth,isAdmin, deleteClient);

// 📃 Get All Clients Paginated
router.get(
  "/clients/all",
  auth,
  isAdmin,
  getAllClients
);

// 🟢 Approve / Reject Shajrah
router.put("/shajrah/status/:id", auth,isAdmin, updateShajrahStatus);

// 🟢 Approve / Reject Marital Certificate
router.put("/marital/status/:id", auth,isAdmin, updateMaritalStatus);

router.put("/client/Adstatus/:clientId", auth,isAdmin, updateClientStatusAdmin);
router.get("/shajrah/requests", auth,isAdmin, getAllShajrahRequests);
router.get("/marital/all", getAllMaritalCertificates);

// 📌 Get certificates with filters
router.get("/marital/filter", getFilteredMaritalCertificates);
router.post("/create/notification",auth,isAdmin, createNotification);
router.get("/fetch/notification", getPublicNotifications);
// delete
module.exports = router;
