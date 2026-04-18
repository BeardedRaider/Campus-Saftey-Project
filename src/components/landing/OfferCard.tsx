// -------------------------------------------------------------
// Component: OfferCard
// Purpose:
// - Reusable card for the horizontal carousel.
// - Icon on top → title → description.
// - Uses global `.card` styling for unified neon-glass look.
// -------------------------------------------------------------

import type { LucideIcon } from "lucide-react";

interface OfferCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "cyan" | "yellow" | "purple" | "pink";
}

export default function OfferCard({
  icon: Icon,
  title,
  description,
  color,
}: OfferCardProps) {
  const colorMap: Record<string, string> = {
    cyan: "bg-cyan-400/10 border-cyan-400/40 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.6)]",
    yellow:
      "bg-yellow-400/10 border-yellow-400/40 text-yellow-300 shadow-[0_0_14px_rgba(250,204,21,0.6)]",
    purple:
      "bg-purple-400/10 border-purple-400/40 text-purple-300 shadow-[0_0_14px_rgba(167,139,250,0.6)]",
    pink: "bg-pink-400/10 border-pink-400/40 text-pink-300 shadow-[0_0_14px_rgba(244,114,182,0.6)]",
  };

  return (
    <div className="card w-full max-w-md mx-auto shrink-0 snap-center text-center space-y-4">
      {/* Icon */}
      <div className="flex justify-center">
        <div
          className={`h-14 w-14 rounded-2xl border flex items-center justify-center ${colorMap[color]}`}
        >
          <Icon className="w-7 h-7" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-lg">{title}</h3>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
