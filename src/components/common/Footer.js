import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-richblack-800 border-t border-richblack-700 text-richblack-25 py-10 mt-10 mb-0">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-50 mb-3">MyApp</h2>
          <p className="text-sm text-richblack-200 leading-6">
            Building trust and providing the best client experience. Manage your
            details with ease and security.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-50 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-100">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-100">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-yellow-100">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-50 mb-3">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/faq" className="hover:text-yellow-100">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-yellow-100">
                Support
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-yellow-100">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-50 mb-3">
            Contact Us
          </h3>
          <ul className="text-sm space-y-2 text-richblack-200">
            <li>
              <span className="font-[400] text-yellow-50">
                Organization:
              </span>{" "}
              Al-Jamiyatul Quresh Fraternity
            </li>
            <li>
              <span className="font-[400] text-yellow-50">Compiler:</span>{" "}
              Khalid Ahmad
            </li>
            <li>
              <span className="font-[400] text-yellow-50">Contact:</span>{" "}
              9145115944 / 47
            </li>
            <li>
              <span className="font-[400] text-yellow-50">Email:</span>{" "}
              <a
                href="mailto:Ajqbt2025@gmail.com"
                className="hover:text-yellow-100"
              >
                Ajqbt2025@gmail.com
              </a>
            </li>
            <li>
              <span className="font-[400] text-yellow-50">Address:</span>{" "}
              Near Madina Masjid, Tarkheda, Amravati. 444601 MS.
            </li>
          </ul>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-richblack-700 mt-8 pt-4 text-center text-sm text-richblack-300">
        © {new Date().getFullYear()} AJQFT2000 .All rights reserved.Compiler: Khalid Ahmad. 
      </div>
    </footer>
  );
};

export default Footer;
