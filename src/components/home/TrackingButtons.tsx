// -------------------------------------------------------------
// Component: TrackingButtons
// Purpose: Start/Stop tracking + New Check-In actions.
//
// This component:
// - Uses Option C styling (solid + subtle shadow + glow)
// - Integrates with useTracking hook
// - Matches wireframe layout (stacked full-width buttons)
// - Uses Lucide icons for clarity
// - Navigates to the Check-Ins page for new check-ins
// -------------------------------------------------------------

import { Play, Square, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrackingButtonsProps {
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
}

export default function TrackingButtons({
  isTracking,
  startTracking,
  stopTracking,
}: TrackingButtonsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 mt-6">
      {!isTracking && (
        <button onClick={startTracking} className="neon-button">
          <Play size={18} />
          Start Tracking
        </button>
      )}

      {isTracking && (
        <button onClick={stopTracking} className="neon-button bg-red-600">
          <Square size={18} />
          Stop Tracking
        </button>
      )}

      <button
        onClick={() => navigate("/app/check-ins")}
        className="neon-button bg-neonPurple text-white"
      >
        <Plus size={18} />
        New Check-In
      </button>
    </div>
  );
}
