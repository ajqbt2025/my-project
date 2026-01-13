const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
});

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);

const padNumber = (num) => num.toString().padStart(5, "0");

const maritalCertificateSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    registerNumber: {
      type: String,
      unique: true,
      index: true,
    },

    certificateFile: {
      type: String,
      required: true,
    },

    maritalStatus: String,

    nikahDetails: {
      nikahDate: Date,
      hijriDate: String,
      dayTime: String,
      dower: String,
      nikahCategory: String,
      venue: String,
      masjidName: String,
    },

    groom: Object,
    bride: Object,
    qazi: Object,
    wakil: Object,
    witnessOne: Object,
    witnessTwo: Object,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected","payment_pending"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
      default: 38,
    },
  },
  { timestamps: true }
);

// AUTO INCREMENT REGISTER NUMBER
maritalCertificateSchema.pre("save", async function (next) {
  if (this.registerNumber) return next();

  const counter = await Counter.findOneAndUpdate(
    { name: "maritalCertificate" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  this.registerNumber = padNumber(counter.value);
  next();
});

module.exports =
  mongoose.models.MaritalCertificate ||
  mongoose.model("MaritalCertificate", maritalCertificateSchema);
