const mongoose = require("mongoose");

const abnormalConditionSchema = new mongoose.Schema({
  full_name: { type: String },
  udid: { type: String },
  disability_type: { type: String },
  dob: { type: Date },
  disability_percent: { type: Number },
  issue_date: { type: Date },
  valid_upto: { type: Date },
  state_id: { type: String },
  uidai: { type: String },
  address: { type: String }
});

const physicalConditionSchema = new mongoose.Schema({
  condition: {
    type: String,
    enum: ["normal", "abnormal"],
    required: true
  },
  abnormal_details: {
    type: abnormalConditionSchema,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("PhysicalCondition", physicalConditionSchema);
