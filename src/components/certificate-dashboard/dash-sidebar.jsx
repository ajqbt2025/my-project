import { useState } from "react";
import { VscSignOut, VscMenu } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { CertifiedLinks } from "../../data/certifate-data";
import { logout } from "../../services/operations/authAPI";
import ConfirmationModal from "../common/ConfirmationModal";
import CertifiedLink from "./certifiedIcon"; // ✅ CORRECT IMPORT

export default function SertifiedSide() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden fixed top-3 right-3 z-50
  bg-richblack-800 border border-richblack-700
  rounded-lg px-3 py-2 text-richblack-25 text-2xl"
      >
        {open ? <RxCross2 /> : <VscMenu />}
      </button>

      <div
        className={`
    fixed md:static top-0 left-0 z-40
    h-full min-w-[220px]
    bg-richblack-800 border-r border-richblack-700
    py-10 transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        {/* 🔗 MENU LINKS */}
        <div className="flex flex-col">
          {CertifiedLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <CertifiedLink key={link.id} link={link} /> // ✅ FIX
            );
          })}
        </div>

        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />

        {/* 🚪 LOGOUT */}
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="px-8 py-2 text-sm font-medium text-richblack-300 hover:text-richblack-50"
        >
          <div className="flex items-center gap-x-3">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 md:hidden z-30"
        />
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
