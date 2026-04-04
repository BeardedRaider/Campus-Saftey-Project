// -------------------------------------------------------------
// Component: StatsCard
// Purpose: Reusable stat tile with icon, value, and label.
// -------------------------------------------------------------

import type { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  color: string;
}

export default function StatsCard({
  icon,
  value,
  label,
  color,
}: StatsCardProps) {
  return (
    <div className="stat-tile">
      <div className={`mb-1 ${color}`}>{icon}</div>

      <p className="text-lg font-semibold">{value}</p>

      <p className="text-[10px] text-gray-400 mt-1 text-center leading-tight">
        {label}
      </p>
    </div>
  );
}
