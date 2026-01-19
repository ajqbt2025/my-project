import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
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

  const printRef = useRef(null);

  // =============================
  // 🖨 PRINT (NO NEW PAGE, NO DATE)
  // =============================
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "",
    pageStyle: `
      @page {
        size: auto;
        margin: 0;
      }

      @media print {
        html, body {
          margin: 0;
          padding: 0;
        }

        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        button {
          display: none !important;
        }
      }
    `,
  });

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
              placeholder: "AJQFT-XXXX-XXXX",
            },
          ]}
          onSearch={handleSearch}
          loading={searchLoading}
          buttonText="Search ID Card"
        />

        {/* 🆔 PREVIEW */}
        {idCardImage && (
          <>
            <div
              ref={printRef}
              className="rounded-lg border border-richblack-700 bg-white p-4"
            >
              <img
                src={idCardImage}
                alt="ID Card"
                className="mx-auto max-w-sm"
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
