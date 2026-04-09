// -------------------------------------------------------------
// Component: PublicRoute
// Purpose: Prevent logged-in users from accessing public pages
//          such as /login and /register.
//
// How it works:
// - Checks if a user exists in localStorage
// - If logged in → redirect to /app
// - If NOT logged in → allow access
//
// Notes:
// - Wraps /login and /register routes
// -------------------------------------------------------------

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}

