
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  createOrUpdateShajrahService,
  getShajrahDetailsService,
} from "../../services/operations/CertifiedService";
import staticqr from "../../assests/buttonImage/createClientQR.jpeg";
import MultiSearchBar from "../../pages/ClientSearchBar";

const relationMap = [
  "Father",
  "Grand Father",
  "Great Grand Father",
  "Great Great Grand Father",
  "4th Great Grand Father",
  "5th Great Grand Father",
  "6th Great Grand Father",
  "7th Great Grand Father",
  "8th Great Grand Father",
  "9th Great Grand Father",
];

export default function ShajrahForm() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);

  const autoClient = location.state?.clientId || "";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [clientId, setClientId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [shajrahData, setShajrahData] = useState(null);

  const [generations, setGenerations] = useState([
    { relation: relationMap[0], name: "", generationLevel: 1 },
  ]);

  const [documents, setDocuments] = useState([
    { file: null, documentType: "", generationCovered: 1 },
  ]);

  // ============= AUTO LOAD WHEN COMING FROM PROFILE ============
  useEffect(() => {
    if (autoClient) {
      setClientId(autoClient);
      setValue("clientId", autoClient);
      handleSearch(autoClient);
    }
  }, [autoClient]);

  const handlePrint = () => {
    if (!shajrahData?.shajrahImage) return;

    setPrintLoading(true);

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
    <html>
      <head>
        <title>Shajrah</title>
      </head>
      <body>
        <img src="${shajrahData.shajrahImage}" style="max-width:100%;"/>
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

  const handleDownload = async () => {
    if (!shajrahData?.shajrahImage) return;

    try {
      setDownloadLoading(true);

      const response = await fetch(shajrahData.shajrahImage);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${clientId}-shajrah.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Download failed");
    } finally {
      setDownloadLoading(false);
    }
  };

  // ================= SEARCH FUNCTION ===================
  const handleSearch = async (id) => {
    const searchId = id || clientId;

    if (!searchId) {
      toast.error("Client ID required");
      return;
    }

    try {
      setSearchLoading(true);

      const res = await getShajrahDetailsService(searchId);

      if (!res?.success) return;

      setShajrahData(res.shajrah);

      setValue("familyId", res.shajrah?.familyId || "");
      setValue("fullName", res.shajrah?.fullName || "");

      toast.success("Shajrah details loaded");
    } finally {
      setSearchLoading(false);
    }
  };

  // ================= GENERATION HANDLERS =================
  const addGeneration = () => {
    if (generations.length >= 10) return;

    const level = generations.length + 1;

    setGenerations([
      ...generations,
      {
        relation: relationMap[level - 1],
        name: "",
        generationLevel: level,
      },
    ]);
  };

  const removeGeneration = (index) => {
    if (index === 0) return;

    const updated = generations.filter((_, i) => i !== index);

    setGenerations(
      updated.map((g, i) => ({
        ...g,
        relation: relationMap[i],
        generationLevel: i + 1,
      }))
    );
  };

  const handleGenerationNameChange = (index, value) => {
    const updated = [...generations];
    updated[index].name = value;
    setGenerations(updated);
  };

  // ================= DOCUMENT HANDLERS ==================
  const addDocument = () => {
    setDocuments([
      ...documents,
      { file: null, documentType: "", generationCovered: 1 },
    ]);
  };

  const removeDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleDocumentChange = (index, field, value) => {
    const updated = [...documents];
    updated[index][field] = value;
    setDocuments(updated);
  };

  // =================== SUBMIT ====================
  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (documents.length < 4) {
      toast.error("Minimum 4 legal documents required");
      return;
    }

    const fd = new FormData();

    fd.append("familyId", data.familyId);
    fd.append("fullName", data.fullName);
    fd.append("otherNotes", data.otherNotes || "");

    fd.append("generations", JSON.stringify(generations));

    documents.forEach((doc) => {
      fd.append("files", doc.file);
      fd.append("documentType", doc.documentType);
      fd.append("generationCovered", doc.generationCovered);
    });

    const res = await createOrUpdateShajrahService(data.clientId, fd);

    if (!res?.success) {
      toast.error("Failed to save Shajrah");
      return;
    }

    toast.success("Shajrah saved — proceed to payment");

    navigate("/paymentPage", {
      state: {
        serviceType: "shajrah",
        price: res?.price || 150,
        qr: staticqr,
        upiId: "myupi@okicici",
        payload: {
          draftId: res?.draftId,
          clientId: data.clientId,
        },
      },
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* SEARCH BAR */}
      <MultiSearchBar
        loading={searchLoading}
        onSearch={() => handleSearch(clientId)}
        buttonText="Fetch Shajrah"
        fields={[
          {
            label: "Client ID",
            value: clientId,
            onChange: setClientId,
            placeholder: "AJQFT-XXXX-XXXX",
          },
        ]}
      />

      {/* SEARCH RESULT BOX */}
      {/* {shajrahData && (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-4 space-y-2">
          <p className="text-yellow-50 font-semibold text-lg">
            Shajrah Found
          </p>

          <p className="text-richblack-200">Family ID: {shajrahData.familyId}</p>
          <p className="text-richblack-200">Full Name: {shajrahData.fullName}</p>
          <p className="text-richblack-200">Status: {shajrahData.status}</p>

          <p className="text-yellow-50 font-semibold mt-2">Generations:</p>
          {shajrahData.generations?.map((g) => (
            <p key={g._id} className="text-richblack-100">
              {g.generationLevel}. {g.relation} → {g.name}
            </p>
          ))}
        </div>
      )} */}

      {shajrahData && (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-4 space-y-3">
          {/* ⭐⭐ AGAR IMAGE HAI TO SIRF IMAGE DIKHAYE ⭐⭐ */}
          {shajrahData.shajrahImage ? (
            <div className="space-y-2 text-center">
              <p className="text-yellow-50 font-semibold text-lg">
                Shajrah Image
              </p>

              <img
                src={shajrahData.shajrahImage}
                alt="Shajrah"
                className="max-h-[450px] mx-auto rounded-lg border border-richblack-600 shadow"
              />

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  disabled={downloadLoading}
                  className="rounded-md px-4 py-2 font-semibold bg-caribbeangreen-200"
                >
                  {downloadLoading ? "Downloading..." : "⬇ Download"}
                </button>

                <button
                  onClick={handlePrint}
                  disabled={printLoading}
                  className="rounded-md px-4 py-2 font-semibold bg-blue-200"
                >
                  {printLoading ? "Printing..." : "🖨 Print"}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ❌ IMAGE NA HO TO DETAILS DIKHAYE */}

              <p className="text-yellow-50 font-semibold text-lg">
                Shajrah Details Found
              </p>

              <p className="text-richblack-200">
                Family ID: {shajrahData.familyId}
              </p>
              <p className="text-richblack-200">
                Full Name: {shajrahData.fullName}
              </p>
              <p className="text-richblack-200">Status: {shajrahData.status}</p>
              <p className="text-richblack-200">Price: ₹{shajrahData.price}</p>

              {/* GENERATIONS */}
              <div>
                <p className="text-yellow-50 font-semibold">Generations:</p>

                {shajrahData.generations?.map((g) => (
                  <p key={g._id} className="text-richblack-100">
                    {g.generationLevel}. {g.relation} → {g.name}
                  </p>
                ))}
              </div>

              {/* LEGAL DOCUMENT IMAGES */}
              <div>
                <p className="text-yellow-50 font-semibold mb-2">
                  Legal Documents:
                </p>

                <div className="flex flex-wrap gap-3">
                  {shajrahData.legalDocuments?.map((d) => (
                    <img
                      key={d._id}
                      src={d.fileUrl}
                      className="w-28 h-28 object-cover rounded-md border border-richblack-700"
                      alt="doc"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2 className="form-title">Shajrah (Family Tree)</h2>

        {/* CLIENT ID */}
        <div>
          <label className="form-label">Client ID *</label>
          <input
            {...register("clientId", { required: true })}
            className="form-input"
            placeholder="AJQFT-XXXX-XXXX"
          />
          {errors.clientId && (
            <p className="text-pink-200 text-xs">Client ID required</p>
          )}
        </div>

        {/* FAMILY ID */}
        <div>
          <label className="form-label">Family ID</label>
          <input
            {...register("familyId")}
            className="form-input"
            placeholder="Family ID"
          />
        </div>

        {/* FULL NAME */}
        <div>
          <label className="form-label">Full Name *</label>
          <input
            {...register("fullName", { required: true })}
            className="form-input"
            placeholder="Full Name"
          />
        </div>

        {/* GENERATIONS */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-richblack-5">
            Generations (Auto)
          </p>

          {generations.map((gen, index) => (
            <div
              key={index}
              className="rounded-lg border border-richblack-600 bg-richblack-700 p-4"
            >
              <p className="text-yellow-50 font-semibold mb-1">
                {gen.generationLevel}. {gen.relation}
              </p>

              <input
                value={gen.name}
                onChange={(e) =>
                  handleGenerationNameChange(index, e.target.value)
                }
                placeholder={`Enter ${gen.relation} Name`}
                className="form-input"
              />

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeGeneration(index)}
                  className="text-xs text-pink-200 mt-1"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {generations.length < 10 && (
            <button
              type="button"
              onClick={addGeneration}
              className="text-yellow-50 flex items-center gap-2"
            >
              <IoAddCircleOutline /> Add Generation
            </button>
          )}
        </div>

        {/* DOCUMENTS */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-richblack-5">
            Legal Documents (Min 4)
          </p>

          {documents.map((doc, index) => (
            <div
              key={index}
              className="rounded-lg border border-richblack-600 bg-richblack-700 p-4"
            >
              <input
                type="file"
                onChange={(e) =>
                  handleDocumentChange(index, "file", e.target.files[0])
                }
                className="form-input"
              />

              <div className="form-grid-2 mt-2">
                <input
                  value={doc.documentType}
                  onChange={(e) =>
                    handleDocumentChange(index, "documentType", e.target.value)
                  }
                  placeholder="Document Type"
                  className="form-input"
                />

                <select
                  value={doc.generationCovered}
                  onChange={(e) =>
                    handleDocumentChange(
                      index,
                      "generationCovered",
                      e.target.value
                    )
                  }
                  className="form-input"
                >
                  {[1, 2, 3, 4].map((g) => (
                    <option key={g} value={g}>
                      Generation {g}
                    </option>
                  ))}
                </select>
              </div>

              {documents.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-xs text-pink-200 mt-1"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addDocument}
            className="text-yellow-50 flex items-center gap-2"
          >
            <IoAddCircleOutline /> Add Document
          </button>
        </div>

        {/* NOTES */}
        <div>
          <label className="form-label">Other Notes</label>
          <textarea
            {...register("otherNotes")}
            rows={3}
            className="form-input"
          />
        </div>

        {/* SUBMIT */}
        <button type="submit" className="form-submit-btn">
          Save & Proceed To Payment
        </button>
      </form>
    </div>
  );
}
