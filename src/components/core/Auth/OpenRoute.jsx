import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  if (!token) {
    return children
  }

  if (user && user.isPasswordSet === false) {
    return children
  }

  return <Navigate to="/dashboard/my-profile" />
}

export default OpenRoute
