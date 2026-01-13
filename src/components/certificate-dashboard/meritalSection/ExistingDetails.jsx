import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
export default function ExistingDetails({ maritalDetails }) {

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Register Entry",
  });

  const d = maritalDetails;

  return (
    <>
      {/* ===== Scrollable Wrapper ===== */}
      <div className="w-full overflow-auto">
        
        {/* Inner Fixed A4 Width Content */}
        <div
          ref={printRef}
          className="bg-white text-black p-4 text-sm min-w-[1000px] mx-auto border"
        >

          {/* ================= TOP HEADER TABLE ================= */}
          <div className="border w-full p-2">

            <div className="flex justify-between items-start">

              {/* LEFT LOGO + ORG NAME */}
              <div className="w-[65%] text-center">

                <h2 className="text-xl font-bold">
                  Al-Jamiyatul Quresh Fraternity
                </h2>

                <p className="text-xs">
                  Converted Marriage Certificate Of Quresh Community
                </p>

                <p className="text-xs mt-1">
                  (Tarkheda, Amravati. MS 444601)
                </p>

                <p className="text-xs">
                  Email: AJQBT2025@gmail.com | Contact: 9145115944 / 47
                </p>

              </div>

              {/* RIGHT SIDE – REG & RECEIPT */}
              <div className="border px-4 py-2 text-sm">
                Reg. & Receipt No:
                <br />
                <span className="font-bold">{d?.registerNumber}</span>
              </div>
            </div>

          </div>

          {/* ================= DATE HEADER BOXES ================= */}
          <div className="grid grid-cols-6 text-center mt-2">

            {[
              ["Date Of Hijri", d?.nikahDetails?.hijriDate],
              ["Date Of Nikah", d?.nikahDetails?.nikahDate?.substring(0, 10)],
              ["Day & Time", d?.nikahDetails?.dayTime],
              ["Nikah Category", d?.nikahDetails?.nikahCategory],
              ["Dower", d?.nikahDetails?.dower],
              ["Venue Of Nikah", d?.nikahDetails?.venue],
            ].map(([label, value], i) => (
              <div key={i} className="border p-2">
                <p className="font-semibold">{label}</p>
                <p className="mt-1 h-[18px]">{value || "—"}</p>
              </div>
            ))}

          </div>

          {/* ================= MAIN BIG TABLE ================= */}
          <table className="w-full mt-2 border text-center">

            <thead>
              <tr>
                <th className="border w-10">No.</th>
                <th className="border w-32">Type</th>
                <th className="border">Groom</th>
                <th className="border">Bride</th>
                <th className="border">Qazi</th>
                <th className="border">Wakil</th>
                <th className="border">Witness 1</th>
                <th className="border">Witness 2</th>
              </tr>
            </thead>

            <tbody>

              {[
                ["1", "Full Name",
                  d?.groom?.fullName,
                  d?.bride?.fullName,
                  d?.qazi?.fullName,
                  d?.wakil?.fullName,
                  d?.witnessOne?.fullName,
                  d?.witnessTwo?.fullName,
                ],

                ["2", "Father Name",
                  d?.groom?.fatherName,
                  d?.bride?.fatherName,
                  d?.qazi?.fatherName,
                  d?.wakil?.fatherName,
                  d?.witnessOne?.fatherName,
                  d?.witnessTwo?.fatherName,
                ],

                ["3", "Age",
                  d?.groom?.age,
                  d?.bride?.age,
                  d?.qazi?.age,
                  d?.wakil?.age,
                  d?.witnessOne?.age,
                  d?.witnessTwo?.age,
                ],

                ["4", "Occupation",
                  d?.groom?.occupation,
                  d?.bride?.occupation,
                  d?.qazi?.occupation,
                  d?.wakil?.occupation,
                  d?.witnessOne?.occupation,
                  d?.witnessTwo?.occupation,
                ],

                ["5", "Home Town",
                  d?.groom?.address,
                  d?.bride?.address,
                  d?.qazi?.address,
                  d?.wakil?.address,
                  d?.witnessOne?.address,
                  d?.witnessTwo?.address,
                ],

                ["6", "Signature",
                  <img src={d?.groom?.signatureImage} className="h-8 mx-auto" />,
                  <img src={d?.bride?.signatureImage} className="h-8 mx-auto" />,
                  <img src={d?.qazi?.signatureImage} className="h-8 mx-auto" />,
                  <img src={d?.wakil?.signatureImage} className="h-8 mx-auto" />,
                  <img src={d?.witnessOne?.signatureImage} className="h-8 mx-auto" />,
                  <img src={d?.witnessTwo?.signatureImage} className="h-8 mx-auto" />,
                ],

              ].map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, i) => (
                    <td key={i} className="border p-1 h-8">
                      {cell || ""}
                    </td>
                  ))}
                </tr>
              ))}

            </tbody>
          </table>

        </div>
      </div>

      {/* PRINT BUTTON */}
      <button
        onClick={handlePrint}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
      >
        🖨 Print Register Page
      </button>
    </>
  );
}
