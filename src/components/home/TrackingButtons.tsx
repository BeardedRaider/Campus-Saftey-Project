// -------------------------------------------------------------
// Component: TrackingButtons
// Purpose: Start/Stop tracking + New Check-In actions.
//
// Updated:
// - Uses new button system (btn-base + btn-cyan/purple/red)
// - Removes legacy .neon-button
// - Clean, consistent, design-system aligned
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
      {/* Start Tracking (Primary Action — Cyan) */}
      {!isTracking && (
        <button onClick={startTracking} className="btn-base btn-cyan">
          <Play size={18} />
          Start Tracking
        </button>
      )}

      {/* Stop Tracking (Danger — Red) */}
      {isTracking && (
        <button onClick={stopTracking} className="btn-base btn-red">
          <Square size={18} />
          Stop Tracking
        </button>
      )}

      {/* New Check-In (Secondary Action — Purple) */}
      <button
        onClick={() => navigate("/app/check-ins")}
        className="btn-base btn-purple"
      >
        <Plus size={18} />
        New Check-In
      </button>
    </div>
  );
}
