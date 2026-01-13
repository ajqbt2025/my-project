const ContactMessage = require("../Models/ContactUS")
exports.saveContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // DEBUG LOG
    console.log("REQ.USER => ", req.user);

    const createdBy =
      req.user.id ||
      req.user?._id ||
      req.user?.userId ||
      null;
    console.log("req.user", req.user.id)
    const saved = await ContactMessage.create({
      name,
      email,
      message,
      createdBy
    });

    return res.status(200).json({
      success: true,
      message: "Message received successfully",
      data: saved,
    });

  } catch (error) {
    console.error("CONTACT SAVE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save message",
      error: error.message,
    });
  }
};



exports.getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email accountType");

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });

  } catch (error) {
    console.error("GET CONTACT MESSAGES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
    });
  }
};
