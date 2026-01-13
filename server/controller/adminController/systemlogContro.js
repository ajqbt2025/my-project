const Client = require("../../Models/Client");
const CertificateManagement = require("../../models/Certificate");
const MaritalCertificate = require("../../models/MeritalCertificate");
const Notification = require("../../Models/Notification")
exports.getAdminClientActivity = async (req, res) => {
  try {
    const clients = await Client.find({})
      .populate("createdBy", "fullName email")
      .populate("personalDetails", "fullName")
      .sort({ createdAt: -1 })
      .limit(20);

    const shajrah = await CertificateManagement.find({
      "shajrah.shajrahImage": { $exists: true },
    })
      .populate("client", "clientId")
      .populate("uploadedBy", "fullName email")
      .sort({ createdAt: -1 })
      .limit(20);

    const marital = await MaritalCertificate.find({})
      .populate("client", "clientId")
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({
      success: true,
      message: "Recent activity fetched",
      data: {
        clients,
        shajrah,
        marital,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch activity",
    });
  }
};

exports.getClientStatusReport = async (req, res) => {
  try {
    const clientStatus = await Client.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const maritalStatus = await MaritalCertificate.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const shajrahStatus = await CertificateManagement.aggregate([
      { $group: { _id: "$shajrah.status", count: { $sum: 1 } } },
    ]);

    return res.json({
      success: true,
      message: "Status report loaded",
      data: {
        clients: clientStatus,
        marital: maritalStatus,
        shajrah: shajrahStatus,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to load status report",
    });
  }
};

exports.getClientCreatedByAdmins = async (req, res) => {
  try {
    const clientCreated = await Client.aggregate([
      {
        $group: {
          _id: "$createdBy",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "admin",
        },
      },
      { $unwind: "$admin" },
      {
        $project: {
          adminId: "$admin._id",
          name: "$admin.fullName",
          email: "$admin.email",
          count: 1,
        },
      },
    ]);

    const shajrahCreated = await CertificateManagement.aggregate([
      {
        $match: { "shajrah.shajrahImage": { $exists: true } },
      },
      {
        $group: {
          _id: "$uploadedBy",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "admin",
        },
      },
      { $unwind: "$admin" },
      {
        $project: {
          adminId: "$admin._id",
          name: "$admin.fullName",
          email: "$admin.email",
          count: 1,
        },
      },
    ]);

    // MARITAL CREATED BY
    const maritalCreated = await MaritalCertificate.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "client",
          foreignField: "_id",
          as: "client",
        },
      },
      { $unwind: "$client" },
      {
        $group: {
          _id: "$client.createdBy",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "admin",
        },
      },
      { $unwind: "$admin" },
      {
        $project: {
          adminId: "$admin._id",
          name: "$admin.fullName",
          email: "$admin.email",
          count: 1,
        },
      },
    ]);

    return res.json({
      success: true,
      message: "Admin created count loaded",
      data: {
        clients: clientCreated,
        shajrah: shajrahCreated,
        marital: maritalCreated,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to load admin client report",
    });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { title, message, type, visibleTo } = req.body;
    console.log("1")
    const createdBy =
      req.user?.id ||
      req.user?._id ||
      req.user?.userId ||
      null;
    console.log("2")

    const notification = await Notification.findOneAndUpdate(
      {},
      {
        title,
        message,
        type,
        visibleTo,
        createdBy,
        isActive: true,
      },
      {
        new: true,
        upsert: true,
      }
    );
    console.log("3")


    return res.status(200).json({
      success: true,
      message: "Notification saved successfully",
      data: notification,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "Failed to create notification",
    });
  }
};



// 🔔 Get active notifications for users
// controllers/notificationController.js

exports.getPublicNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      isActive: true,
      visibleTo: "all",
    })
      .populate("createdBy", "email") // ✅ sirf email
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: notifications,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};
