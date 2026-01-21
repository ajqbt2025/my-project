const mongoose = require("mongoose");

const grandfatherDetailSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    father_name: { type: String },
    mother_name: { type: String },
    grand_mother_name: { type: String },
    dob: { type: Date },
    birth_place: { type: String },

    // ❌ mobile removed
    // ❌ email removed

    uidai: { type: String },
    qualification: { type: String },
    occupation: { type: String },
    permanent_address: { type: String },
    current_address: { type: String },

    // ✅ image url (from Cloudinary, S3, etc.)
    image_url: { type: String }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GrandParent", grandfatherDetailSchema);
