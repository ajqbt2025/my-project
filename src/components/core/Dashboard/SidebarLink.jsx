import React from "react";

import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";

import { memo } from "react";

const SidebarLink = ({ link, completed }) => {
  const Icon = Icons[link.icon] || Icons.VscAccount;
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
      
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

// function ClientSidebar() {
//   const { completedSteps } = useSelector((state) => state.client);

//   return (
//     <div className="flex h-[calc(100vh-3.5rem)] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
//       {ClientLInk.map((link) => (
//         <SidebarLink
//           key={link.id}
//           link={link}
//           completed={completedSteps.includes(link.name)}
//         />
//       ))}
//     </div>
//   );
// }

export default memo(SidebarLink);
