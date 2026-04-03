import { useGeolocation } from "../hooks/useGeolocation";
import { useCheckIns } from "../hooks/useCheckIns";
import type { CheckIn } from "../types/CheckIn";

export default function CheckIns() {
  const { position, getCurrentLocation } = useGeolocation();
  const { checkIns, addCheckIn } = useCheckIns();

  const handleCheckIn = () => {
    getCurrentLocation();

    if (!position) return;

    const newCheckIn: CheckIn = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
    };

    addCheckIn(newCheckIn);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Check-Ins</h1>

      <button
        onClick={handleCheckIn}
        className="bg-cyan-500 px-4 py-2 rounded mb-6"
      >
        Send Check-In
      </button>

      <h2 className="text-xl mb-2">Recent Check-Ins</h2>

      <ul className="space-y-4">
        {checkIns.map((c) => (
          <li key={c.id} className="bg-gray-800 p-4 rounded">
            <p>
              📍 {c.latitude.toFixed(5)}, {c.longitude.toFixed(5)}
            </p>
            <p>🎯 Accuracy: {c.accuracy}m</p>
            <p>🕒 {new Date(c.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
