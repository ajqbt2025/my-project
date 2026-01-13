// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile); // ya state.auth.user agar wahi hai

  // Not logged in → allow access
  if (!token) {
    return children;
  }

  // Logged in via Google but password not set → allow access to set password page
  if (user && !user.password) {
    return children;
  }

  // Otherwise → already has password → redirect to dashboard
  return <Navigate to="/dashboard/my-profile" />;
}

export default OpenRoute;
