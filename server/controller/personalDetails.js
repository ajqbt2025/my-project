const PersonalDetails = require("../Models/ClientFullDetials/PersonalDetails");
const Client = require("../Models/Client");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ✅ Create Personal Details
exports.createPersonalDetails = async (req, res) => {
  try {
    const profileImageFile = req.files?.profileImage;

    const {
  fullName,
  fatherName,
  motherName,
  dateOfBirth,
  dateOfDeath,
  birthPlace,
  bloodGroup,
  gender,
  mobileNum,
  email,
  adhaarNum,
  permanentAddress,
  currentAddress
} = req.body


    if (
      !fullName ||
      !fatherName ||
      !motherName ||
      !dateOfBirth ||
      !birthPlace ||
      !bloodGroup ||
      !gender ||
      !mobileNum ||
      !email ||
      !adhaarNum ||
      !permanentAddress ||
      !profileImageFile
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields and profile image are mandatory.",
      });
    }
    console.log("hello   1")
    const uploadedImage = await uploadImageToCloudinary(
      profileImageFile,
      process.env.FOLDER_NAME || "client_profiles"
    );
    console.log("hello   2")

    const personalDetails = await PersonalDetails.create({
      fullName,
      fatherName,
      motherName,
      dateOfBirth,
      dateOfDeath,
      birthPlace,
      bloodGroup,
      gender,
      mobileNum,
      email,
      adhaarNum,
      permanentAddress,
      profileImage: uploadedImage.secure_url,
    });
    console.log("hello   3")

    return res.status(201).json({
      success: true,
      personalDetailsId: personalDetails._id,
      data: personalDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating personal details",
      error: error.message,
    });
  }
};


// ✅ Get Full Details by ID Number (client + personal)
// exports.getFullDetailsByIdNumber = async (req, res) => {
//   try {
//     const { idNumber } = req.params;

//     if (!idNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "ID Number is required",
//       });
//     }

//     const personalDetails = await PersonalDetails.findOne({ id_Number: idNumber });

//     if (!personalDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "No personal details found for this ID number",
//       });
//     }

//     // 🧩 Populate related data
//     const client = await Client.findOne({ personalDetails: personalDetails._id })
//       .populate("qualification occupation physicalCondition maritalStatus fatherGuardian grandParent bankDetails");

//     return res.status(200).json({
//       success: true,
//       message: "✅ Full client details fetched successfully",
//       personalDetails,
//       client,
//     });
//   } catch (error) {
//     console.error("Error fetching full client details:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while fetching client details",
//       error: error.message,
//     });
//   }
// };
