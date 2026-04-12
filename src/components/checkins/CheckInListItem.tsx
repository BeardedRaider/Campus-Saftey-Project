// -------------------------------------------------------------
// Component: CheckInListItem
// Purpose: Render a single check-in entry.
//
// Features:
// - Shows coordinates, accuracy (whole number), note, timestamp
// - Displays photo thumbnail if available
// - Delete button
//
// Notes:
// - Accuracy is floored (14.99 → 14) for clean display
// -------------------------------------------------------------

import { Trash2 } from "lucide-react";
import type { CheckIn } from "../../types/CheckIn";

interface CheckInListItemProps {
  checkIn: CheckIn;
  onDelete: (id: string) => void;
}

export default function CheckInListItem({
  checkIn,
  onDelete,
}: CheckInListItemProps) {
  const accuracyWhole = Math.floor(checkIn.accuracy);

  return (
    <li className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-md relative">
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

      {/* Coordinates */}
      <p className="text-sm text-gray-300">
        <span className="font-semibold">Coords:</span>{" "}
        {checkIn.latitude.toFixed(5)}, {checkIn.longitude.toFixed(5)}
      </p>

      {/* Accuracy (whole number) */}
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
    </li>
  );
}
