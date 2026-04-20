// -------------------------------------------------------------
// Component: CurrentLocationCard
// Purpose: Display current tracking status + address + map.
//
// FIXED:
// - Removed conditional hook call (React error)
// - useReverseGeocode now runs unconditionally
// - UI handles missing coords instead of skipping the hook
//
// Notes:
// - This version is SAFE: no invalid hook calls
// - Visual layout is unchanged
// -------------------------------------------------------------

import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatDuration } from "../../utils/formatDuration";
import MapPreview from "../maps/MapPreview";
import { useReverseGeocode } from "../../hooks/useReverseGeocode";

interface Props {
  isTracking: boolean;
  position: GeolocationPosition | null;
  lastUpdated: number | null;
  startedAt: number | null;
}

export default function CurrentLocationCard({
  isTracking,
  position,
  lastUpdated,
  startedAt,
}: Props) {
  const [liveDuration, setLiveDuration] = useState<string>("N/A");

  // Extract coords safely
  const lat = position?.coords.latitude;
  const lng = position?.coords.longitude;

  // -------------------------------------------------------------
  // ❗ FIX: Hook must run unconditionally
  // -------------------------------------------------------------
  // Before:
  //   const address = lat && lng ? useReverseGeocode(lat, lng) : "Location unavailable";
  //
  // This caused React's "Should have a queue" error because the hook
  // only ran when lat/lng existed.
  //
  // Now:
  //   Hook ALWAYS runs, but gracefully handles null coords.
  // -------------------------------------------------------------
  const address = useReverseGeocode(lat, lng);

  // -------------------------------------------------------------
  // Live duration updater (runs every second while tracking)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isTracking || !startedAt) {
      setLiveDuration("N/A");
      return;
    }

    const update = () => {
      const ms = Date.now() - startedAt;
      setLiveDuration(formatDuration(ms));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isTracking, startedAt]);

  return (
    <div className="card mt-6 relative overflow-hidden">
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

      {/* Address */}
      <p className="text-sm text-gray-300 mt-2 pr-24">
        <span className="text-cyan-300 font-medium">Location:</span>{" "}
        {address || "Location unavailable"}
      </p>

      {/* Last Updated */}
      <p className="text-sm text-gray-300 mt-1">
        <span className="text-cyan-300 font-medium">Last updated:</span>{" "}
        {formatDate(lastUpdated)}
      </p>

      {/* Duration */}
      <p className="mt-1 flex items-center gap-2 text-sm text-gray-300">
        <Clock size={16} className="text-[#c7d2e0]" />
        <span>
          <span className="text-cyan-300 font-medium">Duration:</span> {liveDuration}
        </span>
      </p>

      {/* Small Map Thumbnail */}
      {lat && lng && (
        <div className="absolute bottom-3 right-3 w-20 h-20 rounded-md overflow-hidden border border-cyan-500 shadow-md">
          <MapPreview lat={lat} lng={lng} zoom={16} />
        </div>
      )}
    </div>
  );
}
