// -------------------------------------------------------------
// Component: TrackingSessionCard
// Purpose: Display a single tracking session summary in a card.
// Now includes:
// - Start address
// - Small map thumbnail (non-overlapping)
// -------------------------------------------------------------

import { Link } from "react-router-dom";
import {
  Trash2,
  ChevronRight,
  Calendar,
  CalendarCheck,
  Clock,
  Route,
  MapPin,
} from "lucide-react";
import type { TrackingSession } from "../../hooks/useTrackingHistory";
import MapPreview from "../maps/MapPreview";
import { useReverseGeocode } from "../../hooks/useReverseGeocode";

interface TrackingSessionCardProps {
  session: TrackingSession;
  pointCount: number;
  duration: string;
  startLat?: number;
  startLng?: number;
  onDelete: () => void;
}

export default function TrackingSessionCard({
  session,
  pointCount,
  duration,
  startLat,
  startLng,
  onDelete,
}: TrackingSessionCardProps) {
  const start = new Date(session.startedAt).toLocaleString();
  const end = session.endedAt
    ? new Date(session.endedAt).toLocaleString()
    : "Active";

  const hasCoords =
    typeof startLat === "number" && typeof startLng === "number";

  const address = hasCoords
    ? useReverseGeocode(startLat!, startLng!)
    : "Location unavailable";

  return (
    <div className="relative bg-[#0a0f1c] border border-cyan-500 rounded-lg p-4 shadow-md pr-28 pb-4">
      {/* Delete Icon */}
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition"
      >
        <Trash2 size={20} />
      </button>

      {/* Main clickable area */}
      <Link
        to={`/app/tracking-history/${session.id}`}
        className="block rounded-lg transition-all"
      >
        <h3 className="text-white font-semibold mb-3">Tracking Session</h3>

        <div className="text-gray-300 text-sm space-y-2">
          {/* Location (NEW) */}
          <p className="flex items-center gap-2">
            <MapPin size={18} className="text-cyan-400" />
            <span className="text-cyan-300 font-medium">Location:</span>
            <span className="text-gray-300">
              {hasCoords ? address || "Loading..." : "Location unavailable"}
            </span>
          </p>

          {/* Started */}
          <p className="flex items-center gap-2">
            <Calendar size={18} className="text-cyan-400" />
            <span>
              <span className="text-cyan-300 font-medium">Started:</span>{" "}
              {start}
            </span>
          </p>

          {/* Ended */}
          <p className="flex items-center gap-2">
            <CalendarCheck size={18} className="text-cyan-400" />
            <span>
              <span className="text-cyan-300 font-medium">Ended:</span> {end}
            </span>
          </p>

          {/* Duration */}
          <p className="flex items-center gap-2">
            <Clock size={18} className="text-[#c7d2e0]" />
            <span>
              <span className="text-cyan-300 font-medium">Duration:</span>{" "}
              {duration}
            </span>
          </p>

          {/* Points + View Session */}
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-2">
              <Route size={18} className="text-purple-400" />
              <span>
                <span className="text-cyan-300 font-medium">Points:</span>{" "}
                {pointCount}
              </span>
            </p>

            <div className="flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition">
              <span className="text-sm">View session</span>
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      </Link>

      {/* Map Thumbnail (NEW) */}
      {hasCoords && (
        <div className="absolute bottom-3 right-3 w-20 h-20 rounded-md overflow-hidden border border-cyan-500 shadow-md">
          <MapPreview lat={startLat!} lng={startLng!} zoom={16} />
        </div>
      )}
    </div>
  );
}
