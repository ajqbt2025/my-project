const Client = require("../../Models/Client");

exports.getMyClients = async (req, res) => {
  try {
    const userId = req.user.id;

    const clients = await Client.find({ createdBy: userId })
      .populate("personalDetails")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
    });
  }
};

exports.getSingleClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const userId = req.user?.id;
    const userRole = req.user?.accountType;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const query = { _id: clientId };

    if (userRole !== "Admin") {
      query.createdBy = userId;
    }

    const client = await Client.findOne(query).populate(
      "personalDetails qualifications occupation physicalCondition maritalStatus fatherGuardian grandParent bankDetails"
    );

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    console.error("GET SINGLE CLIENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
