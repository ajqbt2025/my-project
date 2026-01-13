const FatherGuardian = require("../models/ClientFullDetials/FatherGuardian");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create Father / Guardian / Spouse Details
exports.createRelationDetail = async (req, res) => {
  try {
    const imageFile = req.files?.image;

    const {
      relation_type,
      full_name,
      father_name,
      mother_name,
      dob,
      birth_place,
      mobile,
      uidai,
      qualification,
      occupation,
      permanent_address,
      current_address,
    } = req.body;

    // -------- Required validations --------
    if (!relation_type || !full_name || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Relation type, full name and image are required.",
      });
    }

    // -------- Upload image to Cloudinary --------
    const uploadedImage = await uploadImageToCloudinary(
      imageFile,
      process.env.FOLDER_NAME || "client_relations"
    );

    // -------- Save DB entry --------
    const relation = await FatherGuardian.create({
      relation_type,
      full_name,
      father_name,
      mother_name,
      dob,
      birth_place,
      mobile,
      uidai,
      qualification,
      occupation,
      permanent_address,
      current_address,
      image_url: uploadedImage.secure_url,   // ⭐ same as personal
    });

    return res.status(201).json({
      success: true,
      fatherGuardianId: relation._id,
      data: relation,
      message: `${relation_type} details saved successfully.`,
    });
  } catch (error) {
    console.error("Error creating relation details:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating relation details",
      error: error.message,
    });
  }
};
