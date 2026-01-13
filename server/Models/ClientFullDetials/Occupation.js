const mongoose = require("mongoose");

// Schema for Occupation & Skill
const occupationSkillSchema = new mongoose.Schema({
  occupation_type: {
    type: String,
    enum: ["business", "job"],
    required: true
  },
  business_details: {
    shop_name: { type: String },
    category: { type: String },
    business_year: { type: String },
    pan_number: { type: String },
    gst_number: { type: String },
    business_mobile: { type: String },
    business_email: { type: String },
    business_address: { type: String }
  },
  job_details: {
    org_name: { type: String },
    designation: { type: String },
    org_id: { type: String },
    org_mobile: { type: String },
    org_address: { type: String }
  },
  hobbies: {
    type: String,
    
  },
  art_expert: {
    type: String,
    
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Occupation", occupationSkillSchema);
