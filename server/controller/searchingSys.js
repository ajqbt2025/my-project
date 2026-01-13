const Client = require("../Models/Client");
const CertificateManagement = require("../Models/Certificate");
const MaritalCertificate = require("../Models/MeritalCertificate");
const PersonalDetails = require("../Models/ClientFullDetials/PersonalDetails");

exports.searchClientStatus = async (req, res) => {
  try {
    let { clientId } = req.params;

    console.log("RAW :", clientId);

    clientId = clientId.trim();

    const client = await Client.findOne({
      clientId: { $regex: `^${clientId}$`, $options: "i" }
    })
      .populate("personalDetails")
      .populate("certificate");

    console.log("FOUND CLIENT:", client);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    let fullName = "Not provided";

    if (client.personalDetails) {
      console.log("PERSONAL DETAILS DATA =>", client.personalDetails);

      fullName =
        client.personalDetails.fullName ||
        client.personalDetails.name ||
        client.personalDetails.applicantName ||
        `${client.personalDetails.firstName || ""} ${
          client.personalDetails.lastName || ""
        }`.trim() ||
        "Not provided";
    }

    const cert = await CertificateManagement.findOne({
  client: client._id,
});

    console.log("shajra", cert?.shajrah);

    // MULTIPLE MARITAL CERTIFICATES
    const maritalRecords = await MaritalCertificate.find({
      client: client._id,
    });

    console.log("FOUND MARITAL RECORDS =>", maritalRecords);

    return res.status(200).json({
      success: true,

      clientId: client.clientId,
      name: fullName || "Not provided",
      overallStatus: client.status,

      idCard: {
        status: cert?.idCard?.image ? "issued" : "not issued",
        image: cert?.idCard?.image || null,
      },

      shajra: {
  status: cert?.shajrah?.status || "not applied",
  price: cert?.shajrah?.price || 0,
  familyId: cert?.shajrah?.familyId || null,
  image: cert?.shajrah?.shajrahImage || null,   // ⭐⭐ IMPORTANT
},


      // ==========================
      // MULTIPLE MARITAL RESPONSE
      // ==========================
      marital: maritalRecords.length
        ? maritalRecords.map(m => ({
            status: m.status || "not applied",
            certificateId: m._id || null,
            registerNumber: m.registerNumber || null,

            // dulhe ka aadhaar number
            groomAadhaar:
              m.groom?.aadhaarNumber ||
              m.groom?.aadharNumber ||
              m.groom?.aadhar ||
              m.groom?.aadhaar ||
              null,
          }))
        : [],
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while searching client",
      error: error.message,
    });
  }
};
