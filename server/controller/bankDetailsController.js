const BankDetail = require("../Models/ClientFullDetials/BankDetails");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ✅ Create Bank Detail
exports.createBankDetail = async (req, res) => {
  try {
    const documentFile = req.files?.documentImage;   

    const {
      bank_name,
      branch_name,
      ifsc_code,
      account_number,
      account_holder,
    } = req.body;

    if (!bank_name || !branch_name || !ifsc_code || !account_number || !account_holder) {
      return res.status(400).json({
        success: false,
        message:
          "bank_name, branch_name, ifsc_code, account_number, account_holder are required.",
      });
    }

    if (!documentFile) {
      return res.status(400).json({
        success: false,
        message: "Bank document image is required",
      });
    }

    const uploadedImage = await uploadImageToCloudinary(
      documentFile,
      process.env.FOLDER_NAME || "bank_documents"
    );

    const bankDetail = await BankDetail.create({
      bank_name,
      branch_name,
      ifsc_code,
      account_number,
      account_holder,
      document_image_url: uploadedImage.secure_url,  
    });

    return res.status(201).json({
      success: true,
      bankId: bankDetail._id,
      data: bankDetail,
      message: "Bank detail saved successfully.",
    });
  } catch (error) {
    console.error("Error creating bank detail:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
