import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { saveContactMessageService } from "../services/operations/clientpay";

export default function ContactForm({
  title = "Contact Us",
  subtitle = "Hum se rabta karein, In shaa Allah jawab zarur milega",
  buttonText = "Send Message",
}) {
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    const res = await saveContactMessageService(form, token);

    if (res?.success) {
      toast.success("Message sent successfully");

      // reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-richblack-800 border border-richblack-600 rounded-2xl p-6 text-white mt-6">

      <h2 className="text-2xl font-bold text-caribbeangreen-100 text-center">
        {title}
      </h2>

      <p className="text-center text-richblack-200 mt-1">
        {subtitle}
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">

        <div>
          <label className="text-sm">Full Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full mt-1 p-2 rounded bg-richblack-900 border border-richblack-600"
          />
        </div>

        <div>
          <label className="text-sm">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            required
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mt-1 p-2 rounded bg-richblack-900 border border-richblack-600"
          />
        </div>

        <div>
          <label className="text-sm">Message *</label>
          <textarea
            name="message"
            value={form.message}
            required
            onChange={handleChange}
            placeholder="Write message here..."
            rows={4}
            className="w-full mt-1 p-2 rounded bg-richblack-900 border border-richblack-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-caribbeangreen-200 text-black font-semibold py-2 rounded-xl"
        >
          {loading ? "Sending..." : buttonText}
        </button>

      </form>
    </div>
  );
}
