function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white px-4">
      <div className="max-w-xl w-full text-center space-y-6">

        {/* 404 BIG TEXT */}
        <h1 className="text-6xl md:text-7xl font-bold text-pink-100">
          404
        </h1>

        {/* MAIN MESSAGE */}
        <h2 className="text-2xl md:text-3xl font-semibold">
          Page Not Found
        </h2>

        <p className="text-pure-greys-300">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* COMING SOON BOX */}
        <div className="mt-6 border border-richblack-600 rounded-xl p-5 bg-richblack-800">
          <h3 className="text-xl font-semibold text-yellow-100 mb-2">
            🚧 Coming Soon
          </h3>

          <p className="text-pure-greys-300 text-sm">
            This section is under development.  
            We’re working hard to bring this feature to you very soon.
          </p>
        </div>

        {/* OPTIONAL BUTTON */}
        <div className="pt-4">
          <a
            href="/"
            className="inline-block px-6 py-2 rounded-lg bg-blue-200 text-black font-semibold hover:bg-blue-100 transition"
          >
            Go Back Home
          </a>
        </div>

      </div>
    </div>
  );
}

export default Error;
