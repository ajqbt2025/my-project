import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { downloadIdCard } from "../../services/operations/CertifiedService";
import MultiSearchBar from "../../pages/ClientSearchBar";

const IdCardPage = () => {

  const location = useLocation();
  const passedClientId = location?.state?.clientId || "";

  const [clientId, setClientId] = useState(passedClientId);
  const [idCardImage, setIdCardImage] = useState(null);

  const [searchLoading, setSearchLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);

  const token = localStorage.getItem("token");

  // =============================
  // 🔍 SEARCH FUNCTION
  // =============================
  const handleSearch = async () => {
    if (!clientId) {
      alert("Please enter Client ID (AJQFT-XXXX)");
      return;
    }

    try {
      setSearchLoading(true);

      const res = await downloadIdCard(clientId, token);

      if (res?.success && res?.image) {
        setIdCardImage(res.image);
      } else {
        setIdCardImage(null);
        alert("ID Card not found");
      }

    } catch (error) {
      alert("Failed to fetch ID Card");
    } finally {
      setSearchLoading(false);
    }
  };

  // =============================
  // 🚀 AUTO SEARCH ON MOUNT
  // =============================
  useEffect(() => {
    if (passedClientId) {
      handleSearch();
    }
  }, [passedClientId]);

  // =============================
  // ⬇ DOWNLOAD
  // =============================
  const handleDownload = async () => {
    if (!idCardImage) return;

    try {
      setDownloadLoading(true);

      const response = await fetch(idCardImage);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${clientId}-id-card.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      alert("Download failed");
    } finally {
      setDownloadLoading(false);
    }
  };

  // =============================
  // 🖨 PRINT
  // =============================
  const handlePrint = () => {
    if (!idCardImage) return;

    setPrintLoading(true);

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>ID Card</title>
        </head>
        <body>
          <img src="${idCardImage}" />
          <script>
            window.print();
            window.onafterprint = () => window.close();
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => setPrintLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-richblack-900 flex items-center justify-center font-inter">
      <div className="mx-auto w-full max-w-3xl space-y-6 rounded-xl border border-richblack-700 bg-richblack-800 p-6">

        <h2 className="text-xl font-semibold text-richblack-5">
          ID Card Download
        </h2>

        {/* 🔍 SEARCH BAR */}
        <MultiSearchBar
          fields={[
            {
              label: "Client ID",
              value: clientId,
              onChange: setClientId,
              placeholder: "AJQFT-XXXX-XXXX"
            }
          ]}
          onSearch={handleSearch}
          loading={searchLoading}
          buttonText="Search ID Card"
        />

        {/* 🆔 PREVIEW */}
        {idCardImage && (
          <>
            <div className="rounded-lg border border-richblack-700 bg-richblack-900 p-4">
              <img
                src={idCardImage}
                alt="ID Card"
                className="mx-auto max-w-sm rounded-md"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                disabled={downloadLoading}
                className="flex-1 rounded-md py-2 font-semibold bg-caribbeangreen-100"
              >
                {downloadLoading ? "Downloading..." : "⬇ Download"}
              </button>

              <button
                onClick={handlePrint}
                disabled={printLoading}
                className="flex-1 rounded-md py-2 font-semibold bg-blue-200"
              >
                {printLoading ? "Printing..." : "🖨 Print"}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default IdCardPage;
