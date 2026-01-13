const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["info", "warning", "success", "danger"],
      default: "info",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin user
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    visibleTo: {
      type: String,
      enum: ["all", "user", "admin"],
      default: "all",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
