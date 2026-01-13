const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("DB connected successfully ✅");
  } catch (error) {
    console.error("DB connection failed ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
