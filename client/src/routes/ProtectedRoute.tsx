import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { AppShell } from "@mantine/core";
import Header from "../partials/Header";

type Props = {};

function ProtectedRoute({}: Props) {
  const { current } = useAuthStore();
  // Check if user is logged in
  if (current === null) return <Navigate to="/login" />;

  return (
    <AppShell header={<Header />}>
      <Outlet />
    </AppShell>
  );
}

export default ProtectedRoute;
