import React from "react";

export default function MultiSearchBar({
  fields = [],
  onSearch,
  loading = false,
  buttonText = "Search",
}) {
  return (
    <div
      className="
        w-full flex flex-wrap items-center gap-3
        rounded-2xl border border-richblack-700 
        bg-richblack-800/70 backdrop-blur-md
        p-4 shadow-[0_0_25px_#00000070]
      "
    >
      {fields.map((f, index) => (
        <div key={index} className="flex-1 min-w-[220px]">
          <input
            type="text"
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder={f.placeholder || f.label}
            disabled={loading}
            className="
              w-full rounded-xl border border-richblack-600
              bg-richblack-900 px-4 py-2.5 
              text-richblack-5 placeholder-richblack-300
              focus:outline-none focus:border-caribbeangreen-100
              shadow-[inset_0_0_8px_#000]
              disabled:opacity-60
            "
          />
        </div>
      ))}

      <button
        onClick={onSearch}
        disabled={loading}
        className={`
          rounded-xl px-6 py-2.5 font-semibold
          shadow-[0_0_20px_#00000060]
          transition-all duration-200
          ${
            loading
              ? "bg-yellow-25 text-richblack-900 opacity-70 cursor-not-allowed"
              : "bg-caribbeangreen-100 hover:bg-caribbeangreen-50 text-black"
          }
        `}
      >
        {loading ? "Please wait..." : buttonText}
      </button>
    </div>
  );
}
