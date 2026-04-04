import { useGeolocation } from "../hooks/useGeolocation";
import { useCheckIns } from "../hooks/useCheckIns";
import type { CheckIn } from "../types/CheckIn";
import { useState } from "react";
import {
  Radar,
  Check,
  X,
  MapPin,
  Target,
  Clock,
  StickyNote,
  Trash,
} from "lucide-react";

export default function CheckIns() {
  const { getCurrentLocation } = useGeolocation();
  const { checkIns, addCheckIn, deleteCheckIn } = useCheckIns();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [note, setNote] = useState("");

  const handleCheckIn = async () => {
    setIsLoading(true);
    getCurrentLocation();

    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCheckIn: CheckIn = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            note: note.trim() || undefined,
          };

          addCheckIn(newCheckIn);
          setNote("");
          setIsLoading(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
        },
        () => {
          setIsLoading(false);
          setError(true);
          setTimeout(() => setError(false), 2000);
        },
      );
    }, 500);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">Check-Ins</h1>

      {/* Note Input */}
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note (optional)"
        className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-cyan-500 focus:outline-none transition"
        maxLength={120}
      />

      {/* Check-In Button */}
      <button
        onClick={handleCheckIn}
        disabled={isLoading}
        className={`w-full px-4 py-3 rounded-lg mb-8 flex items-center justify-center gap-2 font-medium transition-all shadow-md ${
          isLoading
            ? "bg-cyan-700 opacity-70"
            : success
              ? "bg-green-600"
              : error
                ? "bg-red-600"
                : "bg-cyan-500 hover:bg-cyan-400"
        }`}
      >
        {isLoading ? (
          <Radar className="animate-spin-slow" size={20} />
        ) : success ? (
          <Check size={20} />
        ) : error ? (
          <X size={20} />
        ) : (
          <Radar size={20} />
        )}

        {isLoading
          ? "Sending..."
          : success
            ? "Sent!"
            : error
              ? "Failed"
              : "Send Check-In"}
      </button>

      {/* Recent Check-Ins */}
      <h2 className="text-xl font-semibold mb-4">Recent Check-Ins</h2>

      <ul className="space-y-4">
        {checkIns.map((c) => (
          <li
            key={c.id}
            className="bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-start border border-gray-700"
          >
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-gray-300">
                <MapPin size={18} className="text-cyan-400" />
                {c.latitude.toFixed(5)}, {c.longitude.toFixed(5)}
              </p>

              <p className="flex items-center gap-2 text-gray-300">
                <Target size={18} className="text-purple-400" />
                Accuracy: {c.accuracy}m
              </p>

              {c.note && (
                <p className="flex items-center gap-2 text-gray-300">
                  <StickyNote size={18} className="text-yellow-400" />
                  {c.note}
                </p>
              )}

              <p className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock size={16} />
                {new Date(c.timestamp).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => deleteCheckIn(c.id)}
              className="text-red-400 hover:text-red-300 transition"
            >
              <Trash size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
