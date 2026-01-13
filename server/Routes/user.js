const express = require("express")
const router = express.Router()

const {resetPassword,resetPasswordToken} = require("../controller/resetPassword")
const {
    updateProfile,updateDisplayPicture,
    deleteAccount,getAllUserDetails,
} = require("../controller/profile")
const {auth,isAdmin,isUser} = require("../middleware/auth")
const {getMyClients,getSingleClient} = require("../controller/certifiedController/fetchingDetails")


router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


// profile route 

router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/my-clients", auth, getMyClients);

router.get("/client/:id", auth, getSingleClient);
module.exports = router