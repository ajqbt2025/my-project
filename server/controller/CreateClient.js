const Client = require("../Models/Client");

exports.createClient = async (req, res) => {
  try {
    const {
      personalDetailsId,
      qualificationId,
      occupationId,
      physicalConditionId,
      maritalStatusId,
      fatherGuardianId,
      grandParentId,
      bankDetailsId,
    } = req.body;

    const userId = req.user.id;

    // ⭐ REQUIRED FIELDS CHECK
    if (
      !personalDetailsId ||
      !qualificationId ||
      !occupationId ||
      !physicalConditionId ||
      !maritalStatusId ||
      !fatherGuardianId ||
      !grandParentId
    ) {
      return res.status(400).json({
        success: false,
        message: "All details are required except bank details.",
      });
    }

    // ⭐ CREATE CLIENT
    const newClient = await Client.create({
      personalDetails: personalDetailsId,
      qualifications: [qualificationId],
      occupation: occupationId,
      physicalCondition: physicalConditionId,
      maritalStatus: maritalStatusId,
      fatherGuardian: fatherGuardianId,
      grandParent: grandParentId,

      // 🟢 OPTIONAL
      bankDetails: bankDetailsId || null,

      createdBy: userId,
      status: "pending",
    });

    const populatedClient = await Client.findById(newClient._id).populate(
      "personalDetails qualifications occupation physicalCondition maritalStatus fatherGuardian grandParent bankDetails"
    );

    return res.status(201).json({
      success: true,
      message: "Client created successfully.",
      client: populatedClient,
      clientId: populatedClient.clientId,
    });

  } catch (error) {
    console.error("CREATE CLIENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

