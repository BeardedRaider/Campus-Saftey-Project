// -------------------------------------------------------------
// Component: ProtectedRoute
// Purpose: Restrict access to authenticated-only pages (/app/*).
//
// How it works:
// - Checks if a user exists in localStorage
// - If NOT logged in → redirect to /login
// - If logged in → allow access to the protected page
//
// Notes:
// - Used to wrap all /app/* routes
// -------------------------------------------------------------

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

