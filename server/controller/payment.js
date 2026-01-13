
const { instance } = require("../config/razorPay");
const crypto = require("crypto");
const Payment = require("../Models/payment")
const Client = require("../Models/Client");
const MaritalCertificate = require("../Models/MeritalCertificate");
const CertificateManagement = require("../Models/Certificate");

/* ======================================================
   1️⃣ CREATE ORDER (CAPTURE PAYMENT)
   ====================================================== */
exports.capturePayment = async (req, res) => {
  try {

    const { type } = req.body;   // ⭐ front end se aayega

    let amount = 0;

    if (type === "client") amount = 8;
    if (type === "marital") amount = 38;
    if (type === "shajra") amount = 50; // (agar chaho future ke liye)

    const options = {
      amount: amount * 100,   // ⭐ paise me convert
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };


    return res.status(200).json({
      success: true,
      amount,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Payment init failed",
    });
  }
};


/* ======================================================
   2️⃣ VERIFY PAYMENT + CREATE RECORD
   ====================================================== */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      type,      // client | shajra | marital
      data,      // payload
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // 🔐 Signature verify
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    let createdDoc;

    /* ====================================================
       1️⃣ CLIENT CREATE
       ==================================================== */
    if (type === "client") {
      createdDoc = await Client.create({
        personalDetails: data.personalDetailsId,
        qualifications: [data.qualificationId],
        occupation: data.occupationId,
        physicalCondition: data.physicalConditionId,
        maritalStatus: data.maritalStatusId,
        fatherGuardian: data.fatherGuardianId,
        grandParent: data.grandParentId,
        bankDetails: data.bankDetailsId,

        createdBy: req.user.id,
        status: "pending",

        price: 8,
        paymentStatus: "paid",
        paymentId: razorpay_payment_id,
      });
    }

    /* ====================================================
       2️⃣ SHAJRA CREATE
       ==================================================== */
    else if (type === "shajra") {

  const { draftId } = data;

  if (!draftId) {
    return res.status(400).json({
      success: false,
      message: "Draft ID missing for shajrah",
    });
  }

  createdDoc = await CertificateManagement.findByIdAndUpdate(
    draftId,
    {
      "shajrah.status": "pending",
      "shajrah.paymentId": razorpay_payment_id,
    },
    { new: true }
  );
}


    /* ====================================================
       3️⃣ MARITAL CERTIFICATE (DRAFT UPDATE)
       ==================================================== */
    else if (type === "marital") {
      const { draftId } = data;   // ⭐⭐ VERY IMPORTANT ⭐⭐

      if (!draftId) {
        return res.status(400).json({
          success: false,
          message: "Draft ID missing for marital certificate",
        });
      }

      createdDoc = await Marital.findByIdAndUpdate(
        draftId,
        {
          status: "approved",          
          paymentId: razorpay_payment_id,
        },
        { new: true }
      );
    }

    /* ====================================================
       ❌ INVALID TYPE
       ==================================================== */
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid type",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: createdDoc,
    });

  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: err.message,
    });
  }
};



<<<<<<< HEAD



// ===============================
// 💰 Create Payment (Attach with Client)
// ===============================


exports.createPayment = async (req, res) => {
  try {
    const {
      serviceType,
      clientId,
      draftId,
      transactionId,
      amount,
      mode,
      remark,

      // ⭐ NEW FIELDS
      beneficiaryName,
      paymentDate,
    } = req.body;

    // 🔐 VALIDATION
    if (!beneficiaryName || !paymentDate) {
      return res.status(400).json({
        success: false,
        message: "Beneficiary name and payment date are required",
      });
    }

    // 1️⃣ CLIENT CHECK
    const client = await Client.findOne({ clientId });
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

  

    // 3️⃣ SAVE PAYMENT
    const payment = await Payment.create({
      client: client._id,
      clientIdString: client.clientId,
      transactionId,
      amount,
      mode,
      remark,
      serviceType,
      status: "success",

      // ⭐ REQUIRED FIELDS SAVE
      beneficiaryName,
      paymentDate,
    });

    /* ===============================
        SERVICE WISE LOGIC
    =============================== */

    if (serviceType === "client") {
      await Client.findByIdAndUpdate(client._id, {
        status: "pending",
      });
    }

    if (serviceType === "shajrah") {
      await CertificateManagement.findByIdAndUpdate(draftId, {
        "shajrah.status": "pending",
        status: "pending",
        paymentId: payment._id,
      });
    }

    if (serviceType === "marital") {
      await MaritalCertificate.findByIdAndUpdate(draftId, {
        status: "pending",
        paymentId: payment._id,
      });

      const maritalRecord = await MaritalCertificate.findById(draftId);

      return res.status(201).json({
        success: true,
        message: "Payment done successfully",
        payment,
        registerNumber: maritalRecord?.registerNumber || null,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Payment done successfully",
      payment,
    });

  } catch (error) {
    console.log("PAYMENT ERROR => ", error);
    return res.status(500).json({
      success: false,
      message: "Payment failed",
    });
  }
};



exports.getPaymentSummary = async (req, res) => {
  try {
    // 🔹 SUCCESS + PENDING aggregations
    const summary = await Payment.aggregate([
      {
        $match: {
          status: { $in: ["success", "pending"] },
        },
      },
      {
        $group: {
          _id: { service: "$serviceType", status: "$status" },
          totalAmount: { $sum: "$amount" },
          totalPayments: { $sum: 1 },
        },
      },
    ]);

    // -------- DEFAULT RESULT STRUCTURE --------
    const result = {
      success: {
        client: 0,
        shajrah: 0,
        marital: 0,
        total: 0,
      },
      pending: {
        client: 0,
        shajrah: 0,
        marital: 0,
        total: 0,
      },
      grandTotal: 0,
    };

    // -------- FILL VALUES FROM AGGREGATE --------
    summary.forEach((x) => {
      const service = x._id.service;   // client/shajrah/marital
      const status = x._id.status;     // success/pending

      if (status === "success") {
        result.success[service] = x.totalAmount;
        result.success.total += x.totalAmount;
      }

      if (status === "pending") {
        result.pending[service] = x.totalAmount;
        result.pending.total += x.totalAmount;
      }

      // total of all regardless status
      result.grandTotal += x.totalAmount;
    });

    return res.status(200).json({
      success: true,
      message: "Payment summary fetched",
      data: result,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to get payment summary",
    });
  }
};

exports.getAllPaymentDetails = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("client", "personalDetails.fullName clientId")
      .select(
        "client clientIdString serviceType mode amount transactionId beneficiaryName paymentDate status remark"
      )
      .sort({ paymentDate: -1 });

    if (!payments.length) {
      return res.status(200).json({
        success: true,
        message: "No payment records found",
        data: {
          summary: {},
          payments: [],
        },
      });
    }

    // 🔹 MODE-WISE SUMMARY
    const summary = {};

    payments.forEach((p) => {
      if (!summary[p.mode]) {
        summary[p.mode] = {
          totalAmount: 0,
          count: 0,
        };
      }

      summary[p.mode].totalAmount += p.amount;
      summary[p.mode].count += 1;
    });

    return res.status(200).json({
      success: true,
      data: {
        summary,   // 👈 cash / upi / qr / bank-transfer
        payments,  // 👈 full detailed list
      },
    });
  } catch (error) {
    console.error("GET ALL PAYMENT DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all payment details",
    });
  }
};
