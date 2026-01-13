const mongoose = require("mongoose");

const certificateManagementSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    idCard: {
      image: {
        type: String,
      },
      issuedAt: {
        type: Date,
        default: Date.now,
      },
    },
    

    shajrah: {
      shajrahImage: {
      type: String,
    },
      price: {
        type: Number,
        required: true,
        default: 50,
      },

      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "payment_pending"],
        default: "pending",
      },

      familyId: String,
      fullName: String,

      generations: [
        {
          relation: String,
          name: {
            type: String,
            required: true,
          },
          generationLevel: {
            type: Number,
            min: 1,
            max: 10,
            required: true,
          },
        },
      ],

      otherNotes: String,

      legalDocuments: [
        {
          documentType: String,
          fileType: String,
          fileUrl: String,
          generationCovered: Number,
          uploadedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },

    characterCertificate: {
      details: {
        fullName: String,
        fatherName: String,
        nationality: String,
        characterRemarks: String,
      },
      document: String,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// 👇 yahi line sab problem solve karti hai
module.exports =
  mongoose.models.CertificateManagement ||
  mongoose.model("CertificateManagement", certificateManagementSchema);
