// -------------------------------------------------------------
// Component: StatsGrid
// Purpose: Layout wrapper for the three stat cards.
// -------------------------------------------------------------

import StatsCard from "../home/StatsCard";
import { CheckCircle, Clock, Users } from "lucide-react";

export default function StatsGrid() {
  return (
    <div className="flex justify-between gap-3 mt-4">
      <StatsCard
        icon={<CheckCircle size={22} />}
        value="3"
        label="Check-ins Today"
        colorClass="stat-tile-cyan"
        iconColorClass="text-cyan-300"
      />

      <StatsCard
        icon={<Clock size={22} />}
        value="2.5h"
        label="Tracking Time"
        colorClass="stat-tile-purple"
        iconColorClass="text-purple-300"
      />

      <StatsCard
        icon={<Users size={22} />}
        value="4"
        label="Emergency Contacts"
        colorClass="stat-tile-yellow"
        iconColorClass="text-yellow-300"
      />
    </div>
  );
}
