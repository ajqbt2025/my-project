const MaritalCertificate = require("../../Models/MeritalCertificate");
const Client = require("../../Models/Client");
const { uploadImageToCloudinary } = require("../../utils/imageUploader");
exports.saveMaritalCertificate = async (req, res) => {
  try {
    const client = await Client.findOne({ clientId: req.body.clientId });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const groom = req.body.groom ? JSON.parse(req.body.groom) : {};
    const bride = req.body.bride ? JSON.parse(req.body.bride) : {};
    const qazi = req.body.qazi ? JSON.parse(req.body.qazi) : {};
    const witnessOne = req.body.witnessOne
      ? JSON.parse(req.body.witnessOne)
      : {};
    const witnessTwo = req.body.witnessTwo
      ? JSON.parse(req.body.witnessTwo)
      : {};
    const wakil = req.body.wakil ? JSON.parse(req.body.wakil) : {};

    const uploadSign = async (file) =>
      file
        ? (await uploadImageToCloudinary(file, "signatures")).secure_url
        : null;

    if (!req.files?.certificateFile) {
      return res.status(400).json({
        success: false,
        message: "Certificate file required",
      });
    }

    const certUpload = await uploadImageToCloudinary(
      req.files.certificateFile,
      "marital_certificates"
    );

    const maritalData = {
      client: client._id,

      maritalStatus: req.body.maritalStatus,
    masjidRegisterNumber: req.body.masjidRegisterNumber,
      nikahDetails: {
        nikahDate: req.body["nikahDetails[nikahDate]"],
        hijriDate: req.body["nikahDetails[hijriDate]"],
        dayTime: req.body["nikahDetails[dayTime]"],
        dower: req.body["nikahDetails[dower]"],
        nikahCategory: req.body["nikahDetails[nikahCategory]"],
        venue: req.body["nikahDetails[venue]"],
        masjidName: req.body["nikahDetails[masjidName]"],
      },

      certificateFile: certUpload.secure_url,

      groom: {
        ...groom,
        signatureImage: await uploadSign(req.files?.groomSignature),
      },
      bride: {
        ...bride,
        signatureImage: await uploadSign(req.files?.brideSignature),
      },
      qazi: {
        ...qazi,
        signatureImage: await uploadSign(req.files?.qaziSignature),
      },
      witnessOne: {
        ...witnessOne,
        signatureImage: await uploadSign(req.files?.witnessOneSignature),
      },
      witnessTwo: {
        ...witnessTwo,
        signatureImage: await uploadSign(req.files?.witnessTwoSignature),
      },
      wakil: {
        ...wakil,
        signatureImage: await uploadSign(req.files?.wakilSignature),
      },

      price: 38,
      status: "payment_pending",
    };

    const record = await MaritalCertificate.create(maritalData);

    return res.status(200).json({
      success: true,
      message: "Draft saved — proceed to payment",
      draftId: record._id,
      data: record,
      amount: 38,
    });
  } catch (error) {
    console.error("SAVE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save certificate",
      error: error.message,
    });
  }
};

/* 🔎 GET BY REGISTER NUMBER (00001,00002...) */
exports.getMaritalCertificateByRegisterNo = async (req, res) => {
  try {
    const { registerNumber, groomAadhaar } = req.body;

    if (!registerNumber || !groomAadhaar) {
      return res.status(400).json({
        success: false,
        message: "Register number aur groom Aadhaar dono required",
      });
    }

    const padded = registerNumber.toString().padStart(5, "0");

    const certificate = await MaritalCertificate.findOne({
      registerNumber: padded,
      "groom.aadhaarNumber": groomAadhaar,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Marital certificate fetched successfully",
      maritalCertificate: certificate,
    });
  } catch (error) {
    console.error("GET MARITAL CERTIFICATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch marital certificate",
      error: error.message,
    });
  }
};

exports.getAllMaritalCertificates = async (req, res) => {
  try {
    const certificates = await MaritalCertificate.find()
      .populate("client", "fullName clientId mobile")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.log("GET ALL MARITAL ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificates",
    });
  }
};

exports.getFilteredMaritalCertificates = async (req, res) => {
  try {
    const { status, registerNo, clientId } = req.query;

    const query = {};

    if (status) query.status = status;

    if (registerNo) query.registerNumber = registerNo;

    if (clientId) query.clientIdString = clientId;

    const list = await MaritalCertificate.find(query)
      .populate("client", "fullName clientId mobile")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (error) {
    console.log("FILTER MARITAL ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: "Cannot fetch filtered marital certificates",
    });
  }
};
