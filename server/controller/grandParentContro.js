


const GrandParent = require("../Models/ClientFullDetials/GrandParent");

const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ✅ Create Grandparent Details
exports.createGrandParent = async (req, res) => {
  try {
    const imageFile = req.files?.image;

    const {
      full_name,
      father_name,
      mother_name,
      grand_mother_name,
      dob,
      birth_place,
      uidai,
      qualification,
      occupation,
      permanent_address,
      current_address,
    } = req.body;

    if (!full_name || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Full name and image are required.",
      });
    }

    const uploadedImage = await uploadImageToCloudinary(
      imageFile,
      process.env.FOLDER_NAME || "grand_parents"
    );

    const grandParentData = {
      full_name,
      father_name,
      mother_name,
      grand_mother_name,
      dob,
      birth_place,
      uidai,
      qualification,
      occupation,
      permanent_address,
      current_address,
      image_url: uploadedImage.secure_url,
    };

    const newGrandParent = await GrandParent.create(grandParentData);

    return res.status(201).json({
      success: true,
      grandParentId: newGrandParent._id,
      data: newGrandParent,
      message: "Grandparent details saved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
