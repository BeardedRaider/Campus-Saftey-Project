// -------------------------------------------------------------
// Page: TrackingHistory
// Purpose: Display list of all past tracking sessions.
//
// Updated:
// - Added icons matching global Check-Ins styling
// - Cyan for time/location, purple for route/points
// - Tightened spacing
// - Delete icon remains top-right
// -------------------------------------------------------------

import { useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import { useTrackingHistory } from "../hooks/useTrackingHistory";
import { Trash2, Calendar, CalendarCheck, Route, Clock } from "lucide-react";

export default function TrackingHistory() {
  const { getSessions, deleteSession } = useTrackingHistory();
  const [sessions, setSessions] = useState(getSessions());

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // -------------------------------------------------------------
  // Trigger delete modal
  // -------------------------------------------------------------
  const requestDelete = (sessionId: string) => {
    setPendingDeleteId(sessionId);
    setShowConfirm(true);
  };

  // -------------------------------------------------------------
  // Confirm deletion
  // -------------------------------------------------------------
  const handleDelete = () => {
    if (!pendingDeleteId) return;

    deleteSession(pendingDeleteId);

    // Refresh list
    setSessions(getSessions());

    setShowConfirm(false);
    setPendingDeleteId(null);
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-white mb-6">Tracking History</h1>

      {/* ---------------------------------------------------------
         Past Sessions List
      ---------------------------------------------------------- */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="card relative">
            {/* Delete Icon (top-right, same as Check-Ins) */}
            <button
              onClick={() => requestDelete(session.id)}
              className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition"
            >
              <Trash2 size={20} />
            </button>

            {/* Session Info */}
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar size={18} className="text-cyan-400" />
                <span>
                  <span className="text-gray-400">Started:</span>{" "}
                  {new Date(session.startedAt).toLocaleString()}
                </span>
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-300">
                <CalendarCheck size={18} className="text-cyan-400" />
                <span>
                  <span className="text-gray-400">Ended:</span>{" "}
                  {session.endedAt
                    ? new Date(session.endedAt).toLocaleString()
                    : "Active"}
                </span>
              </p>

              {/* Duration */}
              <p className="flex items-center gap-2 text-sm text-gray-300">
                <Clock size={18} className="text-gray-400" />
                <span>
                  <span className="text-gray-400">Duration:</span>{" "}
                  {Math.max(
                    1,
                    Math.round(
                      ((session.endedAt ?? Date.now()) - session.startedAt) /
                        60000,
                    ),
                  )}{" "}
                  min
                </span>
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-300">
                <Route size={18} className="text-purple-400" />
                <span>
                  <span className="text-gray-400">Points:</span>{" "}
                  {session.pointIds.length}
                </span>
              </p>

              <Link
                to={`/app/tracking-history/${session.id}`}
                className="text-cyan-300 text-sm underline mt-1 inline-block"
              >
                View Session →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------
         Delete Confirmation Modal
      ---------------------------------------------------------- */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-80 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">
              Delete Session?
            </h3>

            <p className="text-gray-300 text-sm mb-6">
              This will permanently delete this tracking session and all
              associated breadcrumb points.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 text-sm text-gray-300 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
