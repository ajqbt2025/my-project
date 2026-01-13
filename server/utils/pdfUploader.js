const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure Cloudinary using environment variables for security.
// Make sure to set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET
// in your project's .env file.
const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    return null;
  }

  try {
    // Upload the file to Cloudinary. The 'resource_type: "auto"' option
    // automatically detects the file type.
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
      folder: "Free_content",
    });

    // Successfully uploaded, return the response object with the URL and public ID.
    return {
      url: response.secure_url,
      publicId: response.public_id,
    };
  } catch (error) {
    // If an upload fails, log the error and return null.
    console.error("Cloudinary upload failed:", error);
    return null;
  } finally {
    // This block will always execute, ensuring the local file is deleted.
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }
};

module.exports = { uploadOnCloudinary };
