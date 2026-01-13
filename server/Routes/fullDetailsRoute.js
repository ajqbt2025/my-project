
const express = require("express");
const router = express.Router();

// 🔹 Import all controllers
const { createPersonalDetails } = require("../controller/personalDetails");
const { createQualification } = require("../controller/qualificationcon");
const { createOccupation } = require("../controller/occupationController");
const { createPhysicalCondition } = require("../controller/physicalController");
const { createMaritalStatus } = require("../controller/meritalController");
const { createRelationDetail } = require("../controller/fatherGuaController");
const { createGrandParent } = require("../controller/grandParentContro");
const { createBankDetail } = require("../controller/bankDetailsController");
const { createClient } = require("../controller/CreateClient"); // 🧩 final step
const {auth} = require("../middleware/auth")
const {searchClientStatus} = require("../controller/searchingSys")
// 🔹 Routes for each section
router.post("/personal",auth, createPersonalDetails);
router.post("/qualification",auth, createQualification);
router.post("/occupation",auth, createOccupation);
router.post("/physical-condition",auth, createPhysicalCondition);
router.post("/marital-status",auth, createMaritalStatus);
router.post("/relation",auth, createRelationDetail);
router.post("/grandparent",auth, createGrandParent);
router.post("/bank",auth, createBankDetail);

// 🔹 Final route: create full client with all IDs
router.post("/client",auth, createClient);
router.get("/search/:clientId",auth, searchClientStatus);

module.exports = router;
