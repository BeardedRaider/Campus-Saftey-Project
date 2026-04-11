// -------------------------------------------------------------
// Component: CurrentLocationCard
// Purpose: Display current tracking status + coordinates.
//
// Updated:
// - Added Duration with live counter when tracking
// - Shows "N/A" when inactive
// - Uses formatDate + formatDuration helpers
// - Consistent neon theme + spacing
// -------------------------------------------------------------

import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatDuration } from "../../utils/formatDuration";

interface Props {
  isTracking: boolean;
  position: GeolocationPosition | null;
  lastUpdated: number | null;
  startedAt: number | null; // needed for duration
}

export default function CurrentLocationCard({
  isTracking,
  position,
  lastUpdated,
  startedAt,
}: Props) {
  const [liveDuration, setLiveDuration] = useState<string>("N/A");

  // -------------------------------------------------------------
  // Live duration updater (runs every minute while tracking)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isTracking || !startedAt) {
      setLiveDuration("N/A");
      return;
    }

    // Initial calculation
    const update = () => {
      const ms = Date.now() - startedAt;
      setLiveDuration(formatDuration(ms));
    };

    update(); // run immediately

    const interval = setInterval(update, 60000); // update every minute

    return () => clearInterval(interval);
  }, [isTracking, startedAt]);

  return (
    <div className="card mt-6">
      {/* Header */}
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

      {/* Coordinates + Timestamp + Duration */}
      <div className="mt-2 text-sm text-gray-300">
        {/* Coordinates */}
        <p>
          
          <span className="text-gray-400">Coordinates:</span>{" "}
          {position
            ? `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
            : "N/A"}
        </p>

        {/* Last Updated */}
        <p className="mt-1">
          <span className="text-gray-400">Last updated:</span>{" "}
          {formatDate(lastUpdated)}
        </p>

        {/* Duration */}
        <p className="mt-1 flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span>
            <span className="text-gray-400">Duration:</span> {liveDuration}
          </span>
        </p>
      </div>
    </div>
  );
}
