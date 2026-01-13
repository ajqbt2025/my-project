const mongoose = require("mongoose");

const personalDeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    dateOfDeath: { type: String },
    birthPlace: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    gender: { type: String, required: true },
    mobileNum: { type: String, required: true },
    email: { type: String, required: true },
    adhaarNum: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.PersonalDetails ||
  mongoose.model("PersonalDetails", personalDeSchema);
