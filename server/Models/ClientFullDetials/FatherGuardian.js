const mongoose = require("mongoose");

const relationDetailSchema = new mongoose.Schema({
  relation_type: {
    type: String,
    enum: ["father", "guardian", "spouse"],
    required: true
  },

  full_name: { type: String },
  father_name: { type: String },
  mother_name: { type: String },
  dob: { type: Date },
  birth_place: { type: String },

  // ❌ blood_group removed
  // ❌ email removed

  mobile: { type: String },
  uidai: { type: String },
  qualification: { type: String },
  occupation: { type: String },
  permanent_address: { type: String },
  current_address: { type: String },

  // ✅ image upload URL
  image_url: { type: String }
  
}, {
  timestamps: true
});

module.exports = mongoose.model("FatherGuardian", relationDetailSchema);
