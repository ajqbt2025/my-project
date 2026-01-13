const Client = require("../../Models/Client");
const MeritalCertificate = require("../../Models/MeritalCertificate");
const CertificateManagement = require("../../Models/Certificate");
exports.getPendingAndApprovedClients = async (req, res) => {
  try {
    const pendingClients = await Client.find(
      { status: "pending" },
      { _id: 0, clientId: 1, status: 1 }
    ).sort({ createdAt: -1 });

    const approvedClients = await Client.find(
      { status: "approved" },
      { _id: 0, clientId: 1, status: 1 }
    ).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Pending aur Approved clients fetched successfully",
      counts: {
        pending: pendingClients.length,
        approved: approvedClients.length,
      },
      pending: pendingClients,
      approved: approvedClients,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching clients",
    });
  }
};

exports.searchClientById = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findOne({ clientId })
      .populate("personalDetails")
      .populate("qualifications")
      .populate("occupation")
      .populate("physicalCondition")
      .populate("maritalStatus")
      .populate("fatherGuardian")
      .populate("grandParent")
      .populate("bankDetails")
      .populate("certificate")
      .populate("createdBy");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client details fetched successfully",
      data: client,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching client",
    });
  }
};

exports.approveClientStatus = async (req, res) => {
  try {
    const { clientId } = req.params;

    const updatedClient = await Client.findOneAndUpdate(
      { clientId },
      { status: "approved" },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client approved successfully",
      data: updatedClient,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error approving client",
    });
  }
};

exports.rejectClientStatus = async (req, res) => {
  try {
    const { clientId } = req.params;

    const updatedClient = await Client.findOneAndUpdate(
      { clientId },
      { status: "rejected" },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client rejected successfully",
      data: updatedClient,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error rejecting client",
    });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const deleted = await Client.findOneAndDelete({ clientId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error deleting client",
    });
  }
};
exports.getAllClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    console.log("je]sdfsd", page);

    const clients = await Client.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Client.countDocuments();

    return res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      clients,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching clients",
    });
  }
};

exports.updateShajrahStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const cert = await CertificateManagement.findByIdAndUpdate(
      id,
      { "shajrah.status": status },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Shajrah status updated",
      data: cert,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating shajrah status",
    });
  }
};

exports.updateMaritalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const cert = await MeritalCertificate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Marital certificate status updated",
      data: cert,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating marital status",
    });
  }
};

exports.updateClientStatusAdmin = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updated = await Client.findOneAndUpdate(
      { clientId },
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Client marked as ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error("UPDATE CLIENT STATUS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating client status",
    });
  }
};

exports.getAllShajrahRequests = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 20;

    const status = req.query.status;
    const search = req.query.search;

    let query = {};

    if (status) {
      query.$or = [{ "shajrah.status": status }, { status: status }];
    }

    if (search) {
      const clients = await Client.find({
        $or: [
          { clientId: { $regex: search, $options: "i" } },
          { fullName: { $regex: search, $options: "i" } },
        ],
      }).select("_id");

      query.client = { $in: clients.map((c) => c._id) };
    }

    console.log("FINAL SHAJRAH QUERY => ", query);

    const shajrahs = await CertificateManagement.find(query)
      .populate("client", "clientId fullName")
      .select("shajrah client createdAt updatedAt uploadedBy")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await CertificateManagement.countDocuments(query);

    return res.status(200).json({
      success: true,
      message: "Shajrah requests fetched successfully",
      total,
      page,
      pages: Math.ceil(total / limit),
      data: shajrahs,
    });
  } catch (err) {
    console.error("GET ALL SHAJRAH REQUEST ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching shajrah requests",
    });
  }
};
