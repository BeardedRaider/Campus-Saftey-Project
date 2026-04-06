// -------------------------------------------------------------
// Component: AuthHeader
// Purpose: Reusable header for Login/Register pages.
//
// Notes:
// - Matches landing page branding
// - No navigation links (unlike LandingHeader)
// -------------------------------------------------------------

import { Shield } from "lucide-react";

export default function AuthHeader() {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Shield className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_6px_#22D3EE]" />
      <h1 className="text-xl font-semibold tracking-wide">
        Campus Safety Buddy
      </h1>
    </div>
  );
}
