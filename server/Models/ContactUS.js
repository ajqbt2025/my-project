const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
    },

    // ⭐ NEW FIELD — which user created message
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
             // guest user bhi message bhej sake
    },

    status: {
      type: String,
      enum: ["new", "seen", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", contactMessageSchema);
