const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middleware/auth");
const {
  uploadIdCard,
  downloadIdCard,
} = require("../controller/certifiedController/IdCardControll");
const {
  createOrUpdateShajrah,
  getShajrahByClient,
  deleteShajrah,
  uploadShajrahImage,
} = require("../controller/certifiedController/shajraController");

const {
  saveMaritalCertificate,
  getMaritalCertificateByRegisterNo,
} = require("../controller/certifiedController/meritalCer");

router.post("/create-shajra/:clientId", createOrUpdateShajrah);
router.get("/get-shajrah/:clientId", getShajrahByClient);
router.delete("/delete-shajrah/:clientId", deleteShajrah);
// Admin upload
router.post("/upload-id-card", auth, uploadIdCard);

// Client download
router.post("/download-id-card", downloadIdCard);

router.post("/marital-certificate/save", saveMaritalCertificate);
router.post("/marital/search", getMaritalCertificateByRegisterNo);
router.post(
  "/upload-shajrah-image",
  auth,
  uploadShajrahImage,
);
module.exports = router;
