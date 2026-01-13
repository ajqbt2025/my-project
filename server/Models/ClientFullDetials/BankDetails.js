const mongoose = require("mongoose");

const bankDetailSchema = new mongoose.Schema(
  {
    bank_name: { type: String,  },
    branch_name: { type: String,  },         // ⭐ new field
    ifsc_code: { type: String, },
    account_number: { type: String,  },
    account_holder: { type: String, },

    // ⭐ passbook / cheque / bank doc image URL
    document_image_url: { type: String },                   // optional
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BankDetail", bankDetailSchema);
