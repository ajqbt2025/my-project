const MaritalStatus = require("../models/ClientFullDetials/MeritalStatus");

exports.createMaritalStatus = async (req, res) => {
  try {
    const {
      selected_status,
      spouse_name,
      father_name,
      married_date,
      address,
      children_boys,
      children_girls,
    } = req.body;

    if (!selected_status) {
      return res.status(400).json({
        success: false,
        message: "Selected status is required",
      });
    }

    let maritalData = {
      selected_status,
      spouse_name: null,
      father_name: null,
      married_date: null,
      address: null,
      children_boys: 0,
      children_girls: 0,
    };

    // 🔹 Married
    if (selected_status === "Married") {
      if (!spouse_name || !married_date || !address) {
        return res.status(400).json({
          success: false,
          message:
            "For Married status, spouse_name, married_date, and address are required",
        });
      }

      maritalData = {
        ...maritalData,
        spouse_name,
        married_date,
        address,
        children_boys: children_boys || 0,
        children_girls: children_girls || 0,
      };
    }

    // 🔹 Widowed
    else if (selected_status === "Widowed") {
      maritalData = {
        ...maritalData,
        spouse_name,
        children_boys: children_boys || 0,
        children_girls: children_girls || 0,
      };
    }

    // 🔹 Divorced / Separated / Remarried
    else if (
      selected_status === "Divorced" ||
      selected_status === "Separated" ||
      selected_status === "Remarried"
    ) {
      maritalData = {
        ...maritalData,
        spouse_name,
        children_boys: children_boys || 0,
        children_girls: children_girls || 0,
      };
    }

    // 🔹 Single / Unmarried
    else if (selected_status === "Single / Unmarried") {
      maritalData = {
        ...maritalData,
        father_name,
      };
    }

    // 🔹 Prefer not to say / Civil partnership etc.
    else {
      maritalData = {
        ...maritalData,
      };
    }

    const newMaritalStatus = await MaritalStatus.create(maritalData);

    return res.status(201).json({
      success: true,
      maritalStatusId: newMaritalStatus._id,
      message: `Marital status '${selected_status}' saved successfully`,
    });
  } catch (error) {
    console.error("Error creating marital status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
