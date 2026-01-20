import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo2 from "../../../assests/buttonImage/from logo.png";
import logo from "../../../assests/head logo2.png";

export default function ExistingDetails({ maritalDetails }) {
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
  contentRef: printRef,
  documentTitle: "",
  pageStyle: `
    @page {
      size: A4 landscape;
      margin: 25mm 10mm 12mm 10mm;
    }

    @media print {
      body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .print-root {
        padding-top: 10mm !important;
        box-sizing: border-box;
      }

      button {
        display: none !important;
      }
    }
  `,
});



  const d = maritalDetails;

  const fixImageUrl = (url) =>
    url ? url.replace("/raw/upload/", "/image/upload/") : null;

  const Sig = ({ src, alt }) =>
    src ? (
      <img
        src={fixImageUrl(src)}
        alt={alt}
        className="h-6 mx-auto object-contain"
      />
    ) : null;

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div
          ref={printRef}
          className="print-root bg-white text-black p-3 pt-6 text-xs sm:text-sm mx-auto border"
        >
          {/* HEADER */}
          <div className="border w-full p-2">
            <div className="flex items-center justify-between">
              <img src={logo} alt="Society Logo" className="h-10 sm:h-16 object-contain" />

              <div className="text-center flex-1 px-2">
                <h2 className="text-sm sm:text-xl font-bold">
                  Al-Jamiyatul Quresh Fraternity
                </h2>
                <p className="text-[10px] sm:text-xs">
                  Converted Marriage Certificate Of Quresh Community
                </p>
                <p className="text-[10px] sm:text-xs mt-1">
                  (Tarkheda, Amravati. MS 444601)
                </p>
                <p className="text-[10px] sm:text-xs">
                  Email: AJQBT2025@gmail.com | Contact: 9145115944 / 47
                </p>
              </div>

              <img src={logo2} alt="Masjid Logo" className="h-10 sm:h-16 object-contain" />
            </div>

            <div className="flex justify-end gap-2 mt-2 text-[10px] sm:text-sm">
              <div className="border px-2 py-1 text-center">
                Masjid Reg. No
                <br />
                <span className="font-bold">
                  {d?.masjidRegisterNumber || "—"}
                </span>
              </div>

              <div className="border px-2 py-1 text-center">
                Society Reg. No
                <br />
                <span className="font-bold">{d?.registerNumber}</span>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-6 text-center mt-2 text-[10px] sm:text-sm">
            {[
              ["Date Of Hijri", d?.nikahDetails?.hijriDate],
              ["Date Of Nikah", d?.nikahDetails?.nikahDate?.substring(0, 10)],
              ["Day & Time", d?.nikahDetails?.dayTime],
              ["Nikah Category", d?.nikahDetails?.nikahCategory],
              ["Dower", d?.nikahDetails?.dower],
              ["Venue Of Nikah", d?.nikahDetails?.venue],
            ].map(([label, value], i) => (
              <div key={i} className="border p-1">
                <p className="font-semibold">{label}</p>
                <p>{value || "—"}</p>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <table className="w-full mt-2 border text-center text-[10px] sm:text-sm">
            <thead>
              <tr>
                <th>No.</th>
                <th>Type</th>
                <th>Groom</th>
                <th>Bride</th>
                <th>Qazi</th>
                <th>Wakil</th>
                <th>Witness 1</th>
                <th>Witness 2</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["1","Full Name",d?.groom?.fullName,d?.bride?.fullName,d?.qazi?.fullName,d?.wakil?.fullName,d?.witnessOne?.fullName,d?.witnessTwo?.fullName],
                ["2","Father Name",d?.groom?.fatherName,d?.bride?.fatherName,d?.qazi?.fatherName,d?.wakil?.fatherName,d?.witnessOne?.fatherName,d?.witnessTwo?.fatherName],
                ["3","Age",d?.groom?.age,d?.bride?.age,d?.qazi?.age,d?.wakil?.age,d?.witnessOne?.age,d?.witnessTwo?.age],
                ["4","Occupation",d?.groom?.occupation,d?.bride?.occupation,d?.qazi?.occupation,d?.wakil?.occupation,d?.witnessOne?.occupation,d?.witnessTwo?.occupation],
                ["5","Address",d?.groom?.address,d?.bride?.address,d?.qazi?.address,d?.wakil?.address,d?.witnessOne?.address,d?.witnessTwo?.address],
                ["6","Signature",
                  <Sig src={d?.groom?.signatureImage} alt="Groom Signature" />,
                  <Sig src={d?.bride?.signatureImage} alt="Bride Signature" />,
                  <Sig src={d?.qazi?.signatureImage} alt="Qazi Signature" />,
                  <Sig src={d?.wakil?.signatureImage} alt="Wakil Signature" />,
                  <Sig src={d?.witnessOne?.signatureImage} alt="Witness One Signature" />,
                  <Sig src={d?.witnessTwo?.signatureImage} alt="Witness Two Signature" />,
                ],
              ].map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, i) => (
                    <td key={i} className="border p-1">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINT BUTTON */}
      <div className="flex justify-center mt-3">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white py-2 px-6 rounded"
        >
          🖨 Print Register Page
        </button>
      </div>
    </>
  );
}
