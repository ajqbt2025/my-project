import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XOctagon,
  Bell,
  ArrowRight,
} from "lucide-react";
import { fetchPublicNotifications } from "../../services/operations/AdminService";
import { Link } from "react-router-dom";

export default function PublicNotification() {
  const [notifications, setNotifications] = useState([]);

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

  return (
    <section className="w-full max-w-[1280px] mx-auto mt-10 px-4">
      {/* SECTION HEADER */}
      <div className="mb-5 flex items-center gap-2">
        <Bell className="w-5 h-5 text-yellow-200" />
        <h2 className="text-lg font-bold tracking-wide text-richblack-25 uppercase">
          Latest Updates & Notices
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {notifications.map((note) => {
          const style = styles[note.type] || styles.info;

          return (
            <div
              key={note._id}
              className={`group relative overflow-hidden rounded-2xl border ${style.border} ${style.bg}
                transition-all duration-300 hover:shadow-xl hover:scale-[1.01]`}
            >
              {/* LEFT ACCENT BAR */}
              <div
                className={`absolute left-0 top-0 h-full w-1 ${style.accent.replace(
                  "text",
                  "bg"
                )}`}
              />

              <div className="flex gap-4 p-5">
                {/* ICON */}
                <div
                  className={`flex-shrink-0 mt-0.5 p-3 rounded-xl h-10 bg-richblack-800/60 shadow-inner ${style.accent}`}
                >
                  {style.icon}
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3
                      className={`text-sm font-extrabold tracking-wider uppercase ${style.accent}`}
                    >
                      {note.title}
                    </h3>

                    <span className="text-[11px] font-medium text-richblack-300 uppercase tracking-tight">
                      {note.createdBy?.email?.split("@")[0] || "System Update"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-richblack-50 leading-relaxed opacity-90">
                    {note.message}
                  </p>

                  {/* CTA */}
                  <Link to={"/notice/client"} >

                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-richblack-200 group-hover:text-white transition cursor-pointer">
                    View Details
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
