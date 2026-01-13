import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { getAllContactMessagesService } from "../../../services/operations/clientpay";

export default function ContactMessagesPage() {
  const { token } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const loadMessages = async () => {
    setLoading(true);

    const res = await getAllContactMessagesService(token);
    if (res?.success) {
      setMessages(res.messages);
    } else {
      toast.error("Failed to load messages");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="form-container max-w-6xl">
      <div className="flex items-center justify-between">
        <h2 className="form-title">📩 Contact Messages</h2>

        <button
          onClick={loadMessages}
          className="px-4 py-2 rounded-md bg-caribbeangreen-200 text-black font-semibold"
        >
          Refresh
        </button>
      </div>

      <p className="text-richblack-300 text-sm">
        Sab messages yahan show honge — latest sabse upar
      </p>

      {loading ? (
        <div className="mt-6">⏳ Loading messages…</div>
      ) : messages.length === 0 ? (
        <div className="mt-6 text-yellow-100">❌ No messages found</div>
      ) : (
        <div className="mt-5 overflow-auto">
          <table className="w-full text-sm border border-richblack-700 rounded-md overflow-hidden">
            <thead className="bg-richblack-900">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Created By</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((m) => (
                <tr
                  key={m._id}
                  className="border-b border-richblack-700 hover:bg-richblack-900/40 transition"
                >
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.email}</td>

                  {/* MESSAGE WITH SEE MORE */}
                  <td className="p-3 max-w-xs">
                    <p className={expandedId === m._id ? "" : "truncate"}>
                      {m.message}
                    </p>

                    {m.message?.length > 80 && (
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === m._id ? null : m._id
                          )
                        }
                        className="text-caribbeangreen-200 text-xs mt-1 underline"
                      >
                        {expandedId === m._id ? "See less" : "See more"}
                      </button>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-xl text-xs font-semibold ${
                        m.status === "new"
                          ? "bg-yellow-300 text-black"
                          : m.status === "seen"
                          ? "bg-blue-300 text-black"
                          : "bg-green-300 text-black"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>

                  {/* CREATED BY */}
                  <td className="p-3">
                    {m.createdBy ? m.createdBy.email : "Guest User"}
                  </td>

                  {/* DATE */}
                  <td className="p-3">
                    {new Date(m.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
