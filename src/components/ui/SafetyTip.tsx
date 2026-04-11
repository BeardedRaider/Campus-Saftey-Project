// -------------------------------------------------------------
// Component: SafetyTip
// Purpose: Display a rotating or static safety tip.
//
// Updated:
// - Solid purple background for high visibility
// - Purple neon glow
// - Uses section-title + consistent spacing
// - Tailwind v4 safe
// -------------------------------------------------------------

import { Shield } from "lucide-react";

export default function SafetyTip() {
  return (
    <div
      className="
        mt-6 mb-10 p-4 rounded-xl
        bg-[#3A1F5D] 
        shadow-[0_0_12px_rgba(179,136,255,0.45)]
        border border-purple-500/30
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Shield size={18} className="text-purple-200" />
        <h2 className="section-title m-0">Safety Tip</h2>
      </div>

      {/* Tip text */}
      <p className="text-sm text-purple-100 leading-snug">
        Always let someone you trust know when you're travelling alone or
        heading somewhere unfamiliar.
      </p>
    </div>
  );
}
