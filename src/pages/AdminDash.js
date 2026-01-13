import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/certificate-dashboard/Admin/AminSide";

export default function AdminLayout() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-richblack-900 text-white">
      <AdminSideBar />

      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-11/12 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
