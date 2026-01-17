import { useState } from "react";
import {
  AiOutlineMenu,
  
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineLogin,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { SiGnuprivacyguard } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assests/head logo2.png";
import logo2 from "../../assests/head logo.png";
import { NavbarLinks } from "../../data/navbar-links";

import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { details_links } from "../../data/detailsLink";

function Navbar() {
  const { token } = useSelector((state) => state.auth);

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const matchRoute = (route) => {
    if (!route || typeof route !== "string") return false;
    if (!location?.pathname) return false;
    const match = matchPath({ path: route, end: true }, location.pathname);
    return !!match;
  };

  // ✅ Hide bottom navbar on dashboard pages
  const shouldHideBottomNav = location.pathname.includes("/dashboard");

  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex gap-3 items-center">
            <img src={logo} alt="Logo" width={50} height={20} loading="lazy" />
            <img
              src={logo2}
              alt="Logo"
              width={160}
              height={20}
              loading="lazy"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "More" ? (
                  <div className="group relative flex cursor-pointer items-center gap-1">
                    <p
                      className={`${
                        matchRoute("/more")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                    <BsChevronDown size={14} className="mt-[2px]" />

                    {/* Dropdown */}
                    <div className="invisible absolute left-[50%] top-[120%] z-50 flex w-[200px] -translate-x-[50%] flex-col rounded-lg bg-richblack-5 p-3 text-richblack-900 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:top-[100%] group-hover:opacity-100">
                      <div className="absolute left-[50%] top-0 -z-10 h-4 w-4 translate-x-[80%] translate-y-[-40%] rotate-45 bg-richblack-5"></div>
                      {details_links.map((item) => (
                        <Link
                          to={item.path}
                          key={item.id}
                          className="rounded-md px-3 py-2 hover:bg-richblack-50"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-x-4">
          {token === null ? (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
              
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="mr-2 text-richblack-100 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <AiOutlineClose fontSize={24} />
          ) : (
            <AiOutlineMenu fontSize={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-richblack-900 text-richblack-5 z-50 flex flex-col items-center md:hidden pb-4 border-b border-richblack-700">
          <ul className="flex flex-col gap-y-4 mt-4 w-full text-center">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link?.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 ${
                    matchRoute(link?.path)
                      ? "text-yellow-25"
                      : "text-richblack-25"
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col items-center gap-3">
            {token === null ? (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-28 rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100">
                    Log in
                  </button>
                </Link>
                
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>
        </div>
      )}

      {/* ✅ Bottom Mobile Navbar (No Catalog) */}
      {!shouldHideBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-richblack-800 border-t border-richblack-700 px-4 py-2 flex justify-around items-center rounded-t-xl shadow-lg md:hidden">
          {/* Home */}
          <Link
            to="/"
            className="flex flex-col items-center text-richblack-25 hover:text-yellow-100"
          >
            <AiOutlineHome size={22} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          {/* Search */}
          <Link
            to="/search"
            className="flex flex-col items-center text-richblack-25 hover:text-yellow-100"
          >
            <AiOutlineSearch size={22} />
            <span className="text-xs mt-1">Search</span>
          </Link>

          {/* ✅ More Button */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((prev) => !prev)}
              className="flex flex-col items-center text-richblack-25 hover:text-yellow-100"
            >
              <BsChevronDown size={22} />
              <span className="text-xs mt-1">More</span>
            </button>

            {/* Dropdown Menu */}
            {moreOpen && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 bg-richblack-900 border border-richblack-700 rounded-lg shadow-lg flex flex-col items-center py-2">
                {details_links.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    className="w-full text-center text-richblack-25 hover:text-yellow-100 px-3 py-2 text-sm"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Profile / Login / Signup */}
          {token ? (
            <Link
              to="/dashboard/my-profile"
              className="flex flex-col items-center text-richblack-25 hover:text-yellow-100"
            >
              <AiOutlineUser size={22} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="flex flex-col items-center text-richblack-25 hover:text-yellow-100"
              >
                <AiOutlineLogin size={22} />
                <span className="text-xs mt-1">Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex flex-col items-center text-richblack-25 hover:text-yellow-100"
              >
                <SiGnuprivacyguard size={22} />
                <span className="text-xs mt-1">Sign Up</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;


// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { BsChevronDown } from "react-icons/bs";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

// import logoRound from "../../assests/Logo.png";
// import logoText from "../../assests/head logo.png";
// import { NavbarLinks } from "../../data/navbar-links";
// import { details_links } from "../../data/detailsLink";
// import ProfileDropdown from "../core/Auth/ProfileDropdown";

// export default function Navbar() {
//   const { token } = useSelector((state) => state.auth);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <>
//       {/* ================= TOP IDENTITY BAR ================= */}
//       <div className="w-full bg-richblack-900 border-b border-richblack-700">
//         <div className="mx-auto max-w-maxContent px-6 py-3 flex items-center justify-between">

//           {/* LOGO AREA */}
//           <Link to="/" className="flex items-center gap-4">
//             <img
//               src={logoRound}
//               alt="AJQB"
//               className="h-12 w-12 rounded-full bg-white p-1"
//             />
//             <img
//               src={logoText}
//               alt="All India Jamiat-ul-Quresh"
//               className="h-9 object-contain"
//             />
//           </Link>

//           {/* RIGHT INFO / PROFILE */}
//           <div className="hidden md:flex items-center gap-6 text-sm text-richblack-100">
//             <span>Reg. No: AJQB/IND/1947</span>
//             {token ? <ProfileDropdown /> : null}
//           </div>

//           {/* MOBILE ICON */}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="md:hidden text-richblack-100"
//           >
//             {mobileOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* ================= NAVIGATION BAR ================= */}
//       <div className="w-full bg-richblack-800 border-b border-richblack-700">
//         <div className="mx-auto max-w-maxContent px-6">

//           {/* DESKTOP MENU */}
//           <ul className="hidden md:flex items-center gap-8 py-3 text-sm text-richblack-100">
//             {NavbarLinks.map((link) =>
//               link.title === "More" ? (
//                 <li key={link.title} className="relative group cursor-pointer">
//                   <div className="flex items-center gap-1 hover:text-yellow-50">
//                     More <BsChevronDown size={14} />
//                   </div>
//                   <div className="invisible absolute top-8 left-0 w-48 bg-richblack-900 border border-richblack-700 rounded-lg opacity-0 group-hover:visible group-hover:opacity-100 transition">
//                     {details_links.map((item) => (
//                       <Link
//                         key={item.id}
//                         to={item.path}
//                         className="block px-4 py-2 hover:bg-richblack-700"
//                       >
//                         {item.title}
//                       </Link>
//                     ))}
//                   </div>
//                 </li>
//               ) : (
//                 <li key={link.title}>
//                   <Link
//                     to={link.path}
//                     className="hover:text-yellow-50"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               )
//             )}
//           </ul>

//           {/* MOBILE MENU */}
//           {mobileOpen && (
//             <div className="md:hidden flex flex-col gap-4 py-4 text-richblack-100">
//               {NavbarLinks.map((link) => (
//                 <Link
//                   key={link.title}
//                   to={link.path}
//                   onClick={() => setMobileOpen(false)}
//                   className="hover:text-yellow-50"
//                 >
//                   {link.title}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
