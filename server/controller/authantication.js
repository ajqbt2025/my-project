const bcrypt = require("bcrypt");

const User = require("../Models/User");


const OTP = require("../Models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../Models/Profile");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    let {
      fullName,
      email,
      contactNumber,
      password,
      confirmPassword,
      address,
      otp,
      accountType,
    } = req.body;

    if (!accountType) {
      accountType = "User";
    }

    accountType =
      accountType.charAt(0).toUpperCase() + accountType.slice(1).toLowerCase();


    const validTypes = ["Admin", "User"];

    if (!validTypes.includes(accountType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account type",
      });
    }

    if (!fullName || !email || !contactNumber || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const otpResponse = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (otpResponse.length === 0 || otp !== otpResponse[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber,
    });

    const user = await User.create({
      fullName,
      email,
      contactNumber,
      password: hashedPassword,
      additionalDetails: profileDetails._id,
      image: "",
      address,
      accountType,
    });

    return res.status(201).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);

    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { firstName, lastName, email, googleId } = req.body

    if (!email || !googleId) {
      return res.status(400).json({
        success: false,
        message: "Google login failed",
      })
    }

    let user = await User.findOne({ email }).populate("additionalDetails")
    const isNewUser = !user

    if (isNewUser) {
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      })

      const fullName = `${firstName || ""} ${lastName || ""}`.trim()

      user = await User.create({
        fullName,
        email,
        contactNumber: 9999999999,
        password: null,
        isPasswordSet: false,
        additionalDetails: profileDetails._id,
        accountType: "User",
        image: "",
      })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    })

    return res.status(200).json({
      success: true,
      token,
      user,
      isNewUser,
      message: "Logged in successfully with Google",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error:error
    })
  }
}


exports.setPassword = async (req, res) => {
  try {
    let { password, confirmPassword, accountType, email } = req.body

    if (!password || !confirmPassword || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      })
    }

    accountType =
      accountType.charAt(0).toUpperCase() +
      accountType.slice(1).toLowerCase()

    if (!["Admin", "User"].includes(accountType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account type",
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    user.accountType = accountType
    user.isPasswordSet = true

    await user.save()

    return res.status(200).json({
      success: true,
      message: "Password & account type updated successfully",
      user,
    })
  } catch (error) {
    console.error("Error in setPassword:", error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
}
