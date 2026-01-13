const mongoose = require("mongoose");

const maritalStatusSchema = new mongoose.Schema({
  selected_status: {
    type: String,
    enum: [
      "Single / Unmarried",
      "Married",
      "Widowed",
      "Divorced",
      "Separated",
      "Engaged / Betrothed",
      "Remarried",
      "Prefer not to say"
    ],
    required: true
  },

  spouse_name: { type: String },
  father_name: { type: String },
  married_date: { type: Date },
  address: { type: String },

  // ❌ qazi_name removed
  // ❌ mobile removed

  children_boys: { type: Number, min: 0 },
  children_girls: { type: Number, min: 0 }

}, {
  timestamps: true
});

module.exports =
  mongoose.models.MaritalStatus ||
  mongoose.model("MaritalStatus", maritalStatusSchema);
