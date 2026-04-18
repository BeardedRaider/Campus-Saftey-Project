// -------------------------------------------------------------
// Component: ValuePropItem
// Purpose:
// - Reusable item for the Value Props card.
// - Displays an icon, title, and description.
// - Matches neon theme + global spacing.
// -------------------------------------------------------------

import type { LucideIcon } from "lucide-react";

interface ValuePropItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string; // e.g. "cyan", "yellow", "purple"
}

export default function ValuePropItem({
  icon: Icon,
  title,
  description,
  color,
}: ValuePropItemProps) {
  const colorMap: Record<string, string> = {
    cyan: "bg-cyan-400/10 border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]",
    yellow:
      "bg-yellow-400/10 border-yellow-400/40 text-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.5)]",
    purple:
      "bg-purple-400/10 border-purple-400/40 text-purple-300 shadow-[0_0_12px_rgba(167,139,250,0.5)]",
  };

  return (
    <div className="flex items-start gap-4">
      {/* Icon container */}
      <div
        className={`h-12 w-12 rounded-xl border flex items-center justify-center ${colorMap[color]}`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
