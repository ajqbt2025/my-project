const Qualification = require("../Models/ClientFullDetials/Qualification");

// Create Qualification
exports.createQualification = async (req, res) => {
  try {
    const {
      qualification,
      standard_name,
      medium_language,
      school_name,
      school_address,
      year,
      grade,
    } = req.body;

    // --------- CASE 1: Qualification = None ----------
    if (qualification === "None") {
      const newQualification = await Qualification.create({
        qualification: "None",
      });

      return res.status(201).json({
        success: true,
        qualificationId: newQualification._id,
        message: "Qualification saved as None",
      });
    }

    // --------- CASE 2: Normal Qualification ----------
    if (
      !qualification ||
      !standard_name ||
      !medium_language ||
      !school_name ||
      !school_address ||
      !year ||
      !grade
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for selected qualification",
      });
    }

    // Create Qualification
    const newQualification = await Qualification.create({
      qualification,
      standard_name,
      medium_language,
      school_name,
      school_address,
      year,
      grade,
    });

    return res.status(201).json({
      success: true,
      qualificationId: newQualification._id,
      message: "Qualification created successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating qualification",
      error: error.message,
    });
  }
};
