// -------------------------------------------------------------
// Component: AuthPageWrapper
// Purpose: Shared layout wrapper for Login + Register pages.
// -------------------------------------------------------------

import { Link } from "react-router-dom";
import AuthHeader from "./AuthHeader";

interface AuthPageWrapperProps {
  children: React.ReactNode;
}

export default function AuthPageWrapper({ children }: AuthPageWrapperProps) {
  return (
    <div className="page-bg min-h-screen">
      <div className="max-w-160 mx-auto px-5 pt-10 pb-20">
        {/* App Header */}
        <AuthHeader />

        {/* Go Back */}
        <Link
          to="/"
          className="text-gray-300 text-sm hover:text-gray-200 transition-colors"
        >
          ← Go Back
        </Link>

        {children}

        {/* Footer */}
        <p className="text-gray-500 text-xs text-center mt-12">
          Powered by <span className="text-cyan-400">Campus Safety Buddy</span>
        </p>
      </div>
    </div>
  );
}
