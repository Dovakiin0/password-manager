import { Navigate, Outlet } from "react-router-dom";

type Props = {};

function ProtectedRoute({}: Props) {
  // Check if user is logged in
  // if (!auth.authenticated) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
