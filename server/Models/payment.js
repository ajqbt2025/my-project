const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    // kis client ka payment
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    // readable client id AJQFT-XXXXX
    clientIdString: {
      type: String,
      required: true,
      index: true,
    },

    // kis service ka payment hai
    serviceType: {
      type: String,
      enum: ["client", "shajrah", "marital"],
      required: true,
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    // payment ka tareeqa
    mode: {
      type: String,
      enum: ["cash", "upi", "qr", "bank-transfer"],
      required: true,
    },

    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "success",
    },
    beneficiaryName:{
      type:String,
      required:true,
    },
    paymentDate:{
      type:Date,
      required:true
    },

    remark: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
