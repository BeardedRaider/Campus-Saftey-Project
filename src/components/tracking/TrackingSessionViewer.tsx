// -------------------------------------------------------------
// Component: TrackingSessionViewer
// Purpose: Display session summary + breadcrumb points.
//
// Updated to match global icon styling from Check-Ins:
// - Cyan for location
// - Purple for route/points
// - Yellow for notes (not used here)
// - Gray/default for timestamps
// - Red for destructive actions (not used here)
// -------------------------------------------------------------

import { Calendar, CalendarCheck, Clock, Route, MapPin } from "lucide-react";

interface Props {
  session: {
    id: string;
    startedAt: number;
    endedAt: number | null;
    pointIds: string[];
  };
  points: {
    id: string;
    timestamp: number;
    latitude: number;
    longitude: number;
  }[];
}

export default function TrackingSessionViewer({ session, points }: Props) {
  // Calculate duration
  const durationMs = session.endedAt ? session.endedAt - session.startedAt : 0;

  const durationMinutes = Math.max(1, Math.round(durationMs / 60000));

  return (
    <div className="mt-4 space-y-6">
      {/* ---------------------------------------------------------
         Session Summary
      ---------------------------------------------------------- */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-3">
          Session Summary
        </h3>

        <div className="space-y-2 text-sm text-gray-300">
          <p className="flex items-center gap-2">
            <Calendar size={18} className="text-cyan-400" />
            <span>
              <span className="text-gray-400">Started:</span>{" "}
              {new Date(session.startedAt).toLocaleString()}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <CalendarCheck size={18} className="text-cyan-400" />
            <span>
              <span className="text-gray-400">Ended:</span>{" "}
              {session.endedAt
                ? new Date(session.endedAt).toLocaleString()
                : "Active"}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <Clock size={18} />
            <span>
              <span className="text-gray-400">Duration:</span> {durationMinutes}{" "}
              min
            </span>
          </p>

          <p className="flex items-center gap-2">
            <Route size={18} className="text-purple-400" />
            <span>
              <span className="text-gray-400">Total Points:</span>{" "}
              {session.pointIds.length}
            </span>
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------
         Breadcrumb Points
      ---------------------------------------------------------- */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-3">
          Breadcrumb Points
        </h3>

        {points.length === 0 && (
          <p className="text-gray-400 text-sm">No points recorded.</p>
        )}

        <div className="space-y-4">
          {points.map((p) => (
            <div
              key={p.id}
              className="border border-gray-700 rounded-lg p-3 text-sm text-gray-300"
            >
              <p className="flex items-center gap-2 mb-1">
                <Clock size={16} />
                {new Date(p.timestamp).toLocaleString()}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-cyan-400" />
                <span>
                  <span className="text-gray-400">Lat:</span>{" "}
                  {p.latitude.toFixed(6)}
                  {"  "}
                  <span className="text-gray-400">Lng:</span>{" "}
                  {p.longitude.toFixed(6)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
