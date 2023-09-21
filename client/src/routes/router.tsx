import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"));
const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Error = React.lazy(() => import("../components/Error"));

// initialize route paths
export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
