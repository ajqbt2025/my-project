


const GrandParent = require("../Models/ClientFullDetials/GrandParent");

const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ✅ Create Grandparent Details
exports.createGrandParent = async (req, res) => {
  try {
    const imageFile = req.files?.image;

    const {
      full_name,
      father_name,
      dob,
      birth_place,
      uidai,
      qualification,
      occupation,
      permanent_address,
      current_address,
    } = req.body;

    // 🧩 Step 1: Required validation
    if (!full_name || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Full name and image are required.",
      });
    }

    // 🧩 Step 2: Upload image to Cloudinary
    const uploadedImage = await uploadImageToCloudinary(
      imageFile,
      process.env.FOLDER_NAME || "grand_parents"
    );

    // 🧩 Step 3: Prepare data
    const grandParentData = {
      full_name,
      father_name,
      dob,
      birth_place,
      uidai,
      qualification,
      occupation,
      permanent_address,
      current_address,
      image_url: uploadedImage.secure_url,   // ⭐ save image url
    };

    // 🧩 Step 4: Save to DB
    const newGrandParent = await GrandParent.create(grandParentData);

    // 🧩 Step 5: Response
    return res.status(201).json({
      success: true,
      grandParentId: newGrandParent._id,
      data: newGrandParent,
      message: "Grandparent details saved successfully.",
    });

  } catch (error) {
    console.error("Error creating grandparent details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
