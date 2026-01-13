// Import the required modules
const express = require("express")
const router = express.Router()
const {
  
  createPayment,
  getPaymentSummary,
  getAllPaymentDetails
} = require("../controller/payment")
console.log("hello dosto")
const { auth, isUser, isAdmin } = require("../middleware/auth")
const {
  saveContactMessage,
  getAllContactMessages,
} = require("../controller/ContactusCon");

// ⚠️ Optional middleware (agar login required ho)
// const { auth, isAdmin } = require("../middlewares/auth");

// ⭐ POST — Save contact message (public or logged-in both allowed)
router.post("/contact",auth, saveContactMessage);

// ⭐ GET — All messages (usually admin panel)
// agar sirf admin ko chahiye ho to middleware laga do
// router.get("/contact", auth, isAdmin, getAllContactMessages);

router.get("/contact",auth,isAdmin, getAllContactMessages);
router.post("/paymentDone/create", createPayment);
router.get("/payment-details", getPaymentSummary);
router.get("/allPaymen/details", getAllPaymentDetails);


module.exports = router
