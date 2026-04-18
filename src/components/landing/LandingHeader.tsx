// -------------------------------------------------------------
// Component: LandingHeader
// Purpose: Top navigation bar for the landing page.
// -------------------------------------------------------------

import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingHeader() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3">
      {/* Logo + App Name */}
      <div className="flex items-center gap-2">
        <Shield className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

        <span className="font-semibold text-lg tracking-wide">
          Campus Safety Buddy
        </span>
      </div>

      {/* Login Link */}
      <Link
        to="/login"
        className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
      >
        Login
      </Link>
    </header>
  );
}
