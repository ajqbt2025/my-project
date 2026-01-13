const Client = require("../../Models/Client");
const CertificateManagement = require("../../Models/Certificate");
const { uploadImageToCloudinary } = require("../../utils/imageUploader");


exports.uploadIdCard = async (req, res) => {
  try {
    const { clientId } = req.body; 
    const adminId = req.user.id;   

    const client = await Client.findOne({ clientId });
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "ID Card image is required",
      });
    }

    const imageFile = req.files.image;

    const uploadedImage = await uploadImageToCloudinary(
      imageFile,
      "ID_CARDS",  
      500,          
      90            
    );

    let certificate = await CertificateManagement.findOne({
      client: client._id,
    });

    if (!certificate) {
      certificate = await CertificateManagement.create({
        client: client._id,
        uploadedBy: adminId,
      });
    }

    certificate.idCard = {
      image: uploadedImage.secure_url,
      issuedAt: new Date(),
    };

    await certificate.save();

    if (!client.certificate) {
      client.certificate = certificate._id;
      await client.save();
    }

    return res.status(200).json({
      success: true,
      message: "ID Card uploaded successfully",
      image: uploadedImage.secure_url,
      clientId: client.clientId,
    });
  } catch (error) {
    console.error("UPLOAD ID CARD ERROR:", error);
    return res.status(500).json({
      success: false,
      error:error,
      message: "ID Card upload failed",
    });
  }
};




exports.downloadIdCard = async (req, res) => {
  console.log("download-id-card")
  try {
    const { clientId } = req.body; 

    const client = await Client.findOne({ clientId });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const certificate = await CertificateManagement.findOne({
      client: client._id,
    });

    if (!certificate || !certificate.idCard?.image) {
      return res.status(404).json({
        success: false,
        message: "ID Card not found or not uploaded yet",
      });
    }

    return res.status(200).json({
      success: true,
      image: certificate.idCard.image,
      clientId: client.clientId,
    });

  } catch (error) {
    console.error("DOWNLOAD ID CARD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to download ID Card",
    });
  }
};
