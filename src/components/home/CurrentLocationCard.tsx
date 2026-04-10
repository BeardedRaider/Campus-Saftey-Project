// -------------------------------------------------------------
// Component: CurrentLocationCard
// Purpose: Display current tracking status + coordinates.
//
// Updated:
// - Uses global .card + .section-title
// - Consistent neon theme
// - Clean spacing + typography
// - Tailwind v4 safe
// - Added "View Tracking History" button aligned like Recent Check-Ins
// -------------------------------------------------------------

import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

interface Props {
  isTracking: boolean;
  position: GeolocationPosition | null;
  lastUpdated: number | null;
}

export default function CurrentLocationCard({
  isTracking,
  position,
  lastUpdated,
}: Props) {
  return (
    <div className="card mt-6">
      {/* Header (matches Recent Check-Ins layout) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-cyan-300" />
          <h2 className="section-title m-0">Current Location</h2>
        </div>

        <Link
          to="/app/tracking-history"
          className="text-cyan-300 text-sm hover:underline"
        >
          View Tracking History
        </Link>
      </div>

      {/* Tracking Status */}
      <p
        className={`text-sm ${isTracking ? "text-green-400" : "text-red-400"}`}
      >
        {isTracking ? "Active" : "Inactive"}
      </p>

      {/* Coordinates + Timestamp */}
      <div className="mt-2 text-sm text-gray-300">
        <p>
          <span className="text-gray-400">Coordinates:</span>{" "}
          {position
            ? `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
            : "N/A"}
        </p>

        <p className="mt-1">
          <span className="text-gray-400">Last updated:</span>{" "}
          {formatDate(lastUpdated)}
        </p>
      </div>
    </div>
  );
}
