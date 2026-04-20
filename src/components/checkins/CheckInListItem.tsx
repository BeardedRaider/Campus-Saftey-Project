// -------------------------------------------------------------
// Component: CheckInListItem
// Purpose: Render a single check-in entry with:
// - Small map thumbnail (bottom-right)
// - Reverse geocoded address
// - Photo thumbnail
// - Accuracy, note, timestamp
// -------------------------------------------------------------

import { Trash2 } from "lucide-react";
import type { CheckIn } from "../../types/CheckIn";
import MapPreview from "../maps/MapPreview";
import { useReverseGeocode } from "../../hooks/useReverseGeocode";

interface CheckInListItemProps {
  checkIn: CheckIn;
  onDelete: (id: string) => void;
}

export default function CheckInListItem({
  checkIn,
  onDelete,
}: CheckInListItemProps) {
  const accuracyWhole = Math.floor(checkIn.accuracy);

  // Reverse geocoded address
  const address = useReverseGeocode(checkIn.latitude, checkIn.longitude);

  return (
    <li className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-md relative overflow-hidden">
      {/* Delete Button */}
      <button
        onClick={() => onDelete(checkIn.id)}
        className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition"
      >
        <Trash2 size={18} />
      </button>

      {/* Photo Thumbnail */}
      {checkIn.photo && (
        <img
          src={checkIn.photo}
          alt="Check-in"
          className="w-full h-40 object-cover rounded-md mb-3 border border-gray-700"
        />
      )}

      {/* Address */}
      <p className="text-sm text-cyan-300 mb-1 pr-20">
        <span className="font-semibold">Location:</span>{" "}
        {address || "Loading..."}
      </p>

      {/* Accuracy */}
      <p className="text-sm text-gray-300">
        <span className="font-semibold">Accuracy:</span> {accuracyWhole} m
      </p>

      {/* Note */}
      {checkIn.note && (
        <p className="text-sm text-gray-300 mt-1">
          <span className="font-semibold">Note:</span> {checkIn.note}
        </p>
      )}

      {/* Timestamp */}
      <p className="text-xs text-gray-500 mt-2">
        {new Date(checkIn.timestamp).toLocaleString()}
      </p>

      {/* Small Map Thumbnail (bottom-right) */}
      <div className="absolute bottom-3 right-3 w-20 h-20 rounded-md overflow-hidden border border-gray-700 shadow-md">
        <MapPreview lat={checkIn.latitude} lng={checkIn.longitude} zoom={16} />
      </div>
    </li>
  );
}
