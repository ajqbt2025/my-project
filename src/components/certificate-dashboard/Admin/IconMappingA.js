import { NavLink } from "react-router-dom";

export default function AdminLink({ link }) {

  const Icon = link.icon;

  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        `flex items-center gap-x-3 px-8 py-2 text-sm font-medium transition-all
        ${
          isActive
            ? "bg-richblack-700 text-yellow-50"
            : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
        }`
      }
    >
      <Icon className="text-lg" />
      <span className="capitalize">{link.name}</span>
    </NavLink>
  );
}
