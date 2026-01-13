export default function SearchSection({
  registerNo,
  setRegisterNo,
  groomAadhaar,
  setGroomAadhaar,
  onSearch,
  onApply,
  onClear,
}) {
  return (
    <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-4 text-white space-y-3">

      <h2 className="text-xl font-semibold">Search Marital Certificate</h2>

      <div className="grid md:grid-cols-2 gap-3">
        {/* Register Number */}
        <input
          value={registerNo}
          onChange={(e) => setRegisterNo(e.target.value)}
          placeholder="Enter Register Number (00001)"
          className="rounded bg-richblack-900 px-3 py-2"
        />

        {/* Groom Aadhaar */}
        <input
          value={groomAadhaar}
          onChange={(e) => setGroomAadhaar(e.target.value)}
          placeholder="Enter Dulhe ka Aadhaar Number"
          className="rounded bg-richblack-900 px-3 py-2"
        />
      </div>

      <div className="flex flex-wrap gap-3">

        {/* Search */}
        <button
          onClick={onSearch}
          className="rounded bg-yellow-50 text-black px-4 py-2 font-semibold"
        >
          Search
        </button>

        {/* Apply */}
        <button
          onClick={onApply}
          className="rounded bg-caribbeangreen-200 text-black px-4 py-2 font-semibold"
        >
          Apply
        </button>

        {/* Clear / Cut Search Data */}
        <button
          onClick={onClear}
          className="rounded bg-pink-200 text-black px-4 py-2 font-semibold"
        >
          Clear Search
        </button>
      </div>
    </div>
  );
}
