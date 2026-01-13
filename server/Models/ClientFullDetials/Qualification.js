const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    qualification: {
      type: String,
      enum: [
        "None",
        "Primary School",
        "Middle School",
        "High School",
        "Secondary High School",
        "Junior College",
        "Graduation",
        "Post Graduation",
      ],
      default: "None",
      required: true,
    },

    standard_name: String,
    medium_language: String,
    school_name: String,
    school_address: String,
    year: String,
    grade: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Qualification", qualificationSchema);
