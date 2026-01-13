const CertificateManagement = require("../../Models/Certificate");
const Client = require("../../Models/Client");
const { uploadImageToCloudinary } = require("../../utils/imageUploader");

/* ======================================================
   CREATE / UPDATE SHAJRAH
====================================================== */
exports.createOrUpdateShajrah = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findOne({ clientId });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    let certificate = await CertificateManagement.findOne({
      client: client._id,
    });

    if (!certificate) {
      certificate = await CertificateManagement.create({
        client: client._id,
        status: "pending",
      });
    }

    let generations = [];
    if (req.body.generations) {
      try {
        generations = JSON.parse(req.body.generations);
      } catch (e) {
        generations = [];
      }
    }

    const uploadedDocs = [];

    if (req.files && req.files.files) {
      const files = Array.isArray(req.files.files)
        ? req.files.files
        : [req.files.files];

      const documentTypes = Array.isArray(req.body.documentType)
        ? req.body.documentType
        : [req.body.documentType];

      const generationCovered = Array.isArray(req.body.generationCovered)
        ? req.body.generationCovered
        : [req.body.generationCovered];

      for (let i = 0; i < files.length; i++) {
        const upload = await uploadImageToCloudinary(
          files[i],
          "shajrah-documents"
        );

        uploadedDocs.push({
          documentType: documentTypes[i] || "Other",
          fileType: files[i].mimetype?.includes("pdf") ? "pdf" : "image",
          fileUrl: upload.secure_url,
          generationCovered: Number(generationCovered[i]) || 1,
        });
      }
    }

    certificate.shajrah.familyId =
      req.body.familyId || certificate.shajrah?.familyId || null;

    certificate.shajrah.fullName =
      req.body.fullName || certificate.shajrah?.fullName || null;

    certificate.shajrah.generations =
      generations.length > 0 ? generations : certificate.shajrah?.generations;

    certificate.shajrah.otherNotes =
      req.body.otherNotes || certificate.shajrah?.otherNotes;

    certificate.shajrah.legalDocuments = [
      ...(certificate.shajrah?.legalDocuments || []),
      ...uploadedDocs,
    ];

    certificate.shajrah.price = 28;
    certificate.shajrah.status = "payment_pending";

    await certificate.save();

    return res.status(200).json({
      success: true,
      message: "Shajrah saved successfully — payment pending",
      draftId: certificate._id,
      price: certificate.shajrah.price || 150,
      shajrah: certificate.shajrah,
    });
  } catch (error) {
    console.error("SHAJRAH SAVE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/* ======================================================
   GET SHAJRAH BY CLIENT ID
====================================================== */
exports.getShajrahByClient = async (req, res) => {
  try {
    let { clientId } = req.params;

    console.log("RAW PARAMS => ", req.params);

    if (typeof clientId === "object") {
      clientId = clientId.clientId;
    }

    if (!clientId || clientId === "undefined" || clientId === "null") {
      return res.status(400).json({
        success: false,
        message: "Client ID missing",
      });
    }

    clientId = clientId.trim();
    console.log("FINAL CLIENT ID => ", clientId);

    const client = await Client.findOne({
      clientId: { $regex: `^${clientId}$`, $options: "i" },
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: `Client not found for Client ID: ${clientId}`,
      });
    }

    const certificate = await CertificateManagement.findOne({
      client: client._id,
    }).sort({ createdAt: -1 });

    console.log("CERTIFICATE FOUND => ", certificate?.shajrah);

    if (!certificate || !certificate.shajrah) {
      return res.status(404).json({
        success: false,
        message: "Shajrah not found",
      });
    }

    const shajrah = certificate.shajrah;

    return res.status(200).json({
      success: true,

      shajrah: shajrah,

      shajrahImage: shajrah?.shajrahImage || null,

      clientId: client.clientId,
      certificateId: certificate._id,
    });
  } catch (error) {
    console.error("GET SHAJRAH ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch shajrah",
      error: error.message,
    });
  }
};

/* ======================================================
   DELETE SHAJRAH
====================================================== */
exports.deleteShajrah = async (req, res) => {
  try {
    const { clientId } = req.params;

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

    if (!certificate || !certificate.shajrah) {
      return res.status(404).json({
        success: false,
        message: "Shajrah not found",
      });
    }

    certificate.shajrah = undefined;
    await certificate.save();

    return res.status(200).json({
      success: true,
      message: "Shajrah deleted successfully",
    });
  } catch (error) {
    console.error("DELETE SHAJRAH ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete shajrah",
      error: error.message,
    });
  }
};

exports.uploadShajrahImage = async (req, res) => {
  try {
    const shajrahImageFile = req.files?.shajrahImage;
    const { clientId } = req.body;

    if (!clientId || !shajrahImageFile) {
      return res.status(400).json({
        success: false,
        message: "Client ID aur Shajrah image dono required hain.",
      });
    }

    const client = await Client.findOne({ clientId });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found with this Client ID",
      });
    }

    const uploadedImage = await uploadImageToCloudinary(
      shajrahImageFile,
      process.env.FOLDER_NAME || "shajrah_images"
    );

    const record = await CertificateManagement.findOneAndUpdate(
      { client: client._id },
      {
        $set: {
          "shajrah.shajrahImage": uploadedImage.secure_url,
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Shajrah image uploaded successfully",
      imageUrl: uploadedImage.secure_url,
      data: record,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while uploading Shajrah image",
      error: error.message,
    });
  }
};
