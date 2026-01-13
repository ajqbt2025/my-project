import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { uploadIdCard, uploadShajrahImageService } from "../../../services/operations/CertifiedService";

const UploadIdCardPage = () => {

  const location = useLocation();

  // ⭐ default value route se ayegi but user change kar sakta hai
  const defaultType = location?.state?.type || "idCard";
  const passedClientId = location?.state?.clientId || "";

  const [uploadType, setUploadType] = useState(defaultType);
  const [clientId, setClientId] = useState(passedClientId);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientId || !image) {
      alert("Client ID aur image dono required hain");
      return;
    }

    try {
      setLoading(true);

      if (uploadType === "shajra") {
        await uploadShajrahImageService(clientId, image, token);
        alert("Shajrah image uploaded successfully");
      } else {
        await uploadIdCard(clientId, image, token);
        alert("ID Card uploaded successfully");
      }

      setImage(null);
      setPreview(null);

    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[400px] bg-richblack-900 flex items-center justify-center font-inter">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl space-y-6 rounded-xl border border-richblack-700 bg-richblack-800 p-6"
      >

        {/* ⭐ HEADING DYNAMIC */}
        <h2 className="text-xl font-semibold text-richblack-5">
          {uploadType === "shajra" ? "Upload Shajrah Image" : "Upload ID Card"}
        </h2>

        {/* ⭐ TYPE SELECT DROPDOWN */}
        <div>
          <label className="mb-1 block text-sm text-richblack-5">
            Select Upload Type <span className="text-pink-200">*</span>
          </label>

          <select
            value={uploadType}
            onChange={(e) => {
              setUploadType(e.target.value);
              setImage(null);
              setPreview(null);
            }}
            className="w-full rounded-md border border-richblack-600 bg-richblack-900 px-3 py-2 text-richblack-5"
          >
            <option value="idCard">ID Card</option>
            <option value="shajra">Shajrah Image</option>
          </select>
        </div>

        {/* ⭐ CLIENT ID */}
        <div>
          <label className="mb-1 block text-sm text-richblack-5">
            Client ID <span className="text-pink-200">*</span>
          </label>

          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            disabled={loading}
            className="w-full rounded-md border border-richblack-600 bg-richblack-900 px-3 py-2 text-richblack-5"
          />
        </div>

        {/* ⭐ IMAGE INPUT */}
        <div>
          <label className="mb-1 block text-sm text-richblack-5">
            {uploadType === "shajra" ? "Shajrah Image" : "ID Card Image"}
            <span className="text-pink-200">*</span>
          </label>

          <input
            type="file"
            accept="image/*"
            disabled={loading}
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            className="w-full cursor-pointer rounded-md border border-dashed border-richblack-500 bg-richblack-900 px-3 py-2"
          />
        </div>

        {/* ⭐ PREVIEW */}
        {preview && (
          <div className="rounded-lg border border-richblack-600 bg-richblack-900 p-4">
            <p className="text-sm text-richblack-200 mb-2">Preview:</p>

            <img src={preview} className="mx-auto max-h-72 rounded-md" alt="Preview" />

            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setImage(null);
              }}
              className="mt-3 text-sm text-pink-200 underline"
            >
              Remove Image
            </button>
          </div>
        )}

        {/* ⭐ SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md py-2 font-semibold bg-caribbeangreen-100 hover:bg-caribbeangreen-50 text-black"
        >
          {loading
            ? "Uploading..."
            : uploadType === "shajra"
            ? "Upload Shajrah"
            : "Upload ID Card"}
        </button>
      </form>
    </div>
  );
};

export default UploadIdCardPage;
