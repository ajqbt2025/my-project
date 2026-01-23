import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XOctagon,
  Bell,
  ArrowRight,
} from "lucide-react";
import { fetchPublicNotifications } from "../../services/operations/AdminService";

export default function PublicNotification() {
  const [notifications, setNotifications] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchPublicNotifications();
      if (res?.success) {
        setNotifications(res.data);
      }
    };
    load();
  }, []);

  if (!notifications.length) return null;

  const styles = {
    success: {
      accent: "text-caribbeangreen-200",
      border: "border-caribbeangreen-200/40",
      bg: "bg-caribbeangreen-900/10",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    warning: {
      accent: "text-yellow-200",
      border: "border-yellow-200/40",
      bg: "bg-yellow-900/10",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    danger: {
      accent: "text-pink-200",
      border: "border-pink-200/40",
      bg: "bg-pink-900/10",
      icon: <XOctagon className="w-5 h-5" />,
    },
    info: {
      accent: "text-blue-200",
      border: "border-blue-200/40",
      bg: "bg-blue-900/10",
      icon: <Bell className="w-5 h-5" />,
    },
  };

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto mt-10 px-4">
      <div className="mb-5 flex items-center gap-2">
        <Bell className="w-5 h-5 text-yellow-200" />
        <h2 className="text-lg font-bold tracking-wide text-richblack-25 uppercase">
          Latest Updates & Notices
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {notifications.map((note) => {
          const style = styles[note.type] || styles.info;
          const expanded = expandedId === note._id;

          return (
            <div
              key={note._id}
              className={`relative overflow-hidden rounded-2xl border ${style.border} ${style.bg}
              transition-all duration-300 hover:shadow-xl`}
            >
              <div
                className={`absolute left-0 top-0 h-full w-1 ${style.accent.replace(
                  "text",
                  "bg"
                )}`}
              />

              <div className="flex gap-3 p-4 sm:p-5">
                <div
                  className={`flex-shrink-0 mt-0.5 p-3 rounded-xl h-10 bg-richblack-800/60 shadow-inner ${style.accent}`}
                >
                  {style.icon}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3
                      className={`text-sm font-extrabold tracking-wider uppercase ${style.accent}`}
                    >
                      {note.title}
                    </h3>

                    <span className="text-[11px] font-medium text-richblack-300 uppercase">
                      {note.createdBy?.email?.split("@")[0] || "System Update"}
                    </span>
                  </div>

                  {/* 🔥 FIXED MESSAGE HEIGHT */}
                  <p
  dir="auto"
  className={`mt-2 text-sm text-richblack-50 leading-relaxed overflow-hidden transition-all
    ${expanded ? "max-h-none" : "max-h-[3.2rem] sm:max-h-[4.8rem]"}
  `}
>
  {note.message}
</p>


                  <button
                    onClick={() => toggle(note._id)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-richblack-200 hover:text-white transition"
                  >
                    {expanded ? "See Less" : "See More"}
                    <ArrowRight
                      className={`w-3 h-3 transition-transform ${
                        expanded ? "-rotate-90" : "rotate-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
