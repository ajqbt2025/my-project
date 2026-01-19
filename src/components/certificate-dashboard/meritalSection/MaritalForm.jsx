
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import staticqr from "../../../assests/buttonImage/createClientQR.jpeg";

import { saveMaritalCertificateService } from "../../../services/operations/CertifiedService";

export default function MaritalCertificateForm({ onClose }) {

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const formData = new FormData();

      // BASIC
      formData.append("clientId", data.clientId);
      formData.append("maritalStatus", data.maritalStatus);

      // NIKAH DETAILS
      formData.append("nikahDetails[nikahDate]", data.nikahDate);
      formData.append("nikahDetails[hijriDate]", data.hijriDate);
      formData.append("nikahDetails[dayTime]", data.dayTime);
      formData.append("nikahDetails[dower]", data.dower);
      formData.append("nikahDetails[nikahCategory]", data.nikahCategory);
      formData.append("nikahDetails[venue]", data.venue);
      formData.append("nikahDetails[masjidName]", data.masjidName);
      formData.append("masjidRegisterNumber", data.masjidRegisterNumber);


      // REQUIRED MAIN CERTIFICATE FILE
      if (data.certificateFile?.[0]) {
        formData.append("certificateFile", data.certificateFile[0]);
      }

      // PEOPLE COMMON OBJECT BUILDER
      const addPerson = (prefix, key) => {
        const obj = {
          aadhaarNumber: data[`${prefix}Aadhaar`] || "",
          fullName: data[`${prefix}Name`] || "",
          fatherName: data[`${prefix}Father`] || "",
          age: data[`${prefix}Age`] || "",
          occupation: data[`${prefix}Job`] || "",
          address: data[`${prefix}Address`] || "",
        };
        formData.append(key, JSON.stringify(obj));
      };

      addPerson("groom", "groom");
      addPerson("bride", "bride");
      addPerson("qazi", "qazi");
      addPerson("wakil", "wakil");
      addPerson("w1", "witnessOne");
      addPerson("w2", "witnessTwo");

      // SIGNATURE UPLOADS
      if (data.groomSign?.[0]) formData.append("groomSignature", data.groomSign[0]);
      if (data.brideSign?.[0]) formData.append("brideSignature", data.brideSign[0]);
      if (data.qaziSign?.[0]) formData.append("qaziSignature", data.qaziSign[0]);
      if (data.wakilSign?.[0]) formData.append("wakilSignature", data.wakilSign[0]);
      if (data.w1Sign?.[0]) formData.append("witnessOneSignature", data.w1Sign[0]);
      if (data.w2Sign?.[0]) formData.append("witnessTwoSignature", data.w2Sign[0]);

      // API CALL — SAVE AS DRAFT
      const res = await saveMaritalCertificateService(formData);

      if (!res?.success) {
        toast.error("Saving failed");
        return;
      }

      toast.success("Draft saved — proceed to payment");

      navigate("/paymentPage", {
        state: {
          serviceType: "marital",
          price: res?.amount || 38,
          qr: staticqr,
          upiId: "raja9145@sbi",
          payload: {
            draftId: res?.draftId,
            clientId: data.clientId,
          },
        },
      });

      reset();
      if (onClose) onClose();

    } catch (err) {
      console.log(err);
      toast.error("Failed — try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-4xl space-y-6 rounded-xl border border-richblack-700 bg-richblack-800 p-6 text-white"
    >
      <h2 className="text-2xl font-semibold">Nikah / Marital Certificate</h2>

      {/* CLIENT ID */}
      <div>
        <label>Client ID *</label>
        <input
          {...register("clientId", { required: true })}
          placeholder="AJQFT-XXXXX-XXXX-X"
          className="w-full rounded bg-richblack-900 p-2"
        />
        {errors.clientId && (
          <p className="text-red-400 text-sm">Client ID required</p>
        )}
      </div>

      <div>
  <label>Masjid Register Number *</label>
  <input
    {...register("masjidRegisterNumber", { required: true })}
    placeholder="Masjid Register No."
    className="w-full rounded bg-richblack-900 p-2"
  />
  {errors.masjidRegisterNumber && (
    <p className="text-red-400 text-sm">Masjid register number required</p>
  )}
</div>


      {/* MAIN CERTIFICATE FILE */}
      <div>
        <label>Certificate File (PDF / Image) *</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          {...register("certificateFile", { required: true })}
          className="w-full rounded bg-richblack-900 p-2"
        />
      </div>

      {/* MARITAL STATUS */}
      <div>
        <label>Marital Status</label>
        <select {...register("maritalStatus")} className="w-full rounded bg-richblack-900 p-2">
          <option>Married</option>
          <option>Divorced</option>
          <option>Widowed</option>
        </select>
      </div>

      {/* NIKAH DETAILS */}
      <div className="grid md:grid-cols-2 gap-3">
        <input type="date" {...register("nikahDate")} className="p-2 rounded bg-richblack-900" />
        <input {...register("hijriDate")} className="p-2 rounded bg-richblack-900" placeholder="Hijri Date" />
        <input {...register("dayTime")} className="p-2 rounded bg-richblack-900" placeholder="Day / Time" />
        <input {...register("dower")} className="p-2 rounded bg-richblack-900" placeholder="Dower (Haq Mehr)" />
        <input {...register("nikahCategory")} className="p-2 rounded bg-richblack-900" placeholder="Nikah Category" />
        <input {...register("venue")} className="p-2 rounded bg-richblack-900" placeholder="Venue" />
        <input {...register("masjidName")} className="p-2 rounded bg-richblack-900" placeholder="Masjid / Place of Nikah" />
      </div>

      {/* PEOPLE INPUT GROUPS */}
      {[
        { title: "Groom", prefix: "groom" },
        { title: "Bride", prefix: "bride" },
        { title: "Qazi", prefix: "qazi" },
        { title: "Wakil", prefix: "wakil" },
        { title: "Witness One", prefix: "w1" },
        { title: "Witness Two", prefix: "w2" },
      ].map((p) => (
        <div key={p.prefix}>
          <h3 className="text-lg font-semibold mt-4">{p.title}</h3>

          <div className="grid md:grid-cols-2 gap-3 mt-2">

            <input {...register(`${p.prefix}Aadhaar`)} className="p-2 rounded bg-richblack-900" placeholder="Aadhaar Number" />
            <input {...register(`${p.prefix}Name`)} className="p-2 rounded bg-richblack-900" placeholder="Full Name" />
            <input {...register(`${p.prefix}Father`)} className="p-2 rounded bg-richblack-900" placeholder="Father Name" />
            <input {...register(`${p.prefix}Age`)} className="p-2 rounded bg-richblack-900" placeholder="Age" />
            <input {...register(`${p.prefix}Job`)} className="p-2 rounded bg-richblack-900" placeholder="Occupation" />
            <input {...register(`${p.prefix}Address`)} className="p-2 rounded bg-richblack-900" placeholder="Address" />

            <input
              type="file"
              accept="image/*"
              {...register(`${p.prefix}Sign`)}
              className="p-2 rounded bg-richblack-900"
            />
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-2 font-semibold hover:bg-blue-400"
      >
        Proceed To Payment (₹38)
      </button>
    </form>
  );
}
