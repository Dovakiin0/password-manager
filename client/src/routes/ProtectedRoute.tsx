import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

type Props = {};

function ProtectedRoute({}: Props) {
  const { current } = useAuthStore();
  // Check if user is logged in
  if (current === null) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
