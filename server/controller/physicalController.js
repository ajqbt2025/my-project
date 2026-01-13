const PhysicalCondition = require("../Models/ClientFullDetials/PhysicalCondition");

// ✅ Create Physical Condition (handles both normal & abnormal)
exports.createPhysicalCondition = async (req, res) => {
  try {
    const { condition, abnormal_details } = req.body;

    // 🧩 Step 1: Basic validation
    if (!condition) {
      return res.status(400).json({
        success: false,
        message: "Condition field is required",
      });
    }

    // 🧩 Step 2: If abnormal → details required
    if (condition === "abnormal" && !abnormal_details) {
      return res.status(400).json({
        success: false,
        message: "Abnormal details are required when condition is 'abnormal'",
      });
    }

    // 🧩 Step 3: Prepare data
    const dataToSave = {
      condition: condition,
      abnormal_details: condition === "abnormal" ? abnormal_details : null,
    };

    // 🧩 Step 4: Save to DB
    const newCondition = await PhysicalCondition.create(dataToSave);

    // 🧩 Step 5: Respond with ID only
    return res.status(201).json({
      success: true,
      physicalConditionId: newCondition._id,
      message: `Physical condition '${condition}' saved successfully`,
    });

  } catch (error) {
    console.error("Error creating physical condition:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
