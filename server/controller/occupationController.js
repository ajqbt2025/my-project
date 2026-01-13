const Occupation = require("../Models/ClientFullDetials/Occupation");

// ✅ Create Occupation & Skill (handles both business & job)
exports.createOccupation = async (req, res) => {
  try {
    const {
      occupation_type,
      business_details,
      job_details,
      hobbies,
      art_expert,
    } = req.body;

    // 🧩 Step 1: Required field check
    if (!occupation_type ) {
      return res.status(400).json({
        success: false,
        message: "Occupation type, hobbies, and art_expert are required.",
      });
    }

    // 🧩 Step 2: Conditional validation
    if (occupation_type === "business" && !business_details) {
      return res.status(400).json({
        success: false,
        message: "Business details are required when occupation type is 'business'.",
      });
    }

    if (occupation_type === "job" && !job_details) {
      return res.status(400).json({
        success: false,
        message: "Job details are required when occupation type is 'job'.",
      });
    }

    // 🧩 Step 3: Prepare data
    const occupationData = {
      occupation_type,
      business_details: occupation_type === "business" ? business_details : null,
      job_details: occupation_type === "job" ? job_details : null,
      hobbies,
      art_expert,
    };

    // 🧩 Step 4: Save to database
    const occupation = await Occupation.create(occupationData);

    // 🧩 Step 5: Return only the ID (for client linkage)
    return res.status(201).json({
      success: true,
      occupationId: occupation._id,
      message: `Occupation (${occupation_type}) created successfully`,
    });

  } catch (error) {
    console.error("Error creating occupation:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
