const mongoose = require("mongoose");

const PREFIX = "AJQFT";

const generateClientId = async function () {
  const lastClient = await mongoose
    .model("Client")
    .findOne({ clientId: new RegExp(`^${PREFIX}`) })
    .sort({ createdAt: -1 })
    .lean();

  let nextNumber = 1;

  if (lastClient && lastClient.clientId) {
    // only digits from end
    const match = lastClient.clientId.match(/(\d+)$/);

    const lastNumber = match ? parseInt(match[1], 10) : 0;

    nextNumber = lastNumber + 1;
  }

  const padded = String(nextNumber).padStart(5, "0");

  return `${PREFIX}${padded}`;
};


/* ================================
   CLIENT SCHEMA
================================ */
const ClientSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      unique: true,
      index: true,
    },

    personalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalDetails",
      required: true,
    },

    qualifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Qualification",
      },
    ],

    occupation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Occupation",
    },

    physicalCondition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhysicalCondition",
    },

    maritalStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaritalStatus",
    },

    fatherGuardian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FatherGuardian",
    },

    grandParent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrandParent",
    },

    bankDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankDetail",
    },

    certificate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CertificateManagement",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    price: {
      type: Number,
      default: 8,
    },
  },
  { timestamps: true }
);

/* ================================
   PRE-SAVE HOOK
================================ */
ClientSchema.pre("save", async function (next) {
  if (this.clientId) return next(); // already exists

  this.clientId = await generateClientId();
  next();
});

/* ================================
   EXPORT MODEL
================================ */
module.exports =
  mongoose.models.Client || mongoose.model("Client", ClientSchema);
