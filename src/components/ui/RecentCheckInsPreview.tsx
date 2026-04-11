// -------------------------------------------------------------
// Component: RecentCheckInsPreview
// Purpose: Show the user's last few check-ins on the Home page.
//
// Updated:
// - Uses global .card + .section-title
// - Consistent neon theme
// - Clean spacing + typography
// - Tailwind v4 safe
// -------------------------------------------------------------

import { MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecentCheckInsPreview() {
  const navigate = useNavigate();

  // TEMPORARY STATIC DATA — replace with real check-in logs later
  const recent = [
    { id: 1, location: "Paisley Town Centre", time: "2h ago" },
    { id: 2, location: "UWS Campus", time: "Yesterday" },
    { id: 3, location: "Home", time: "2 days ago" },
  ];

  return (
    <div className="card mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title m-0">Recent Check-Ins</h2>

        <button
          onClick={() => navigate("/app/check-ins")}
          className="text-cyan-300 text-sm hover:underline"
        >
          View All
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {recent.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-purple-300" />
              <p className="text-sm">{item.location}</p>
            </div>

            {/* Time */}
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Clock size={14} />
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
