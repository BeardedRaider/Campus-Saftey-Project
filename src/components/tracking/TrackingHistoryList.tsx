// -------------------------------------------------------------
// Component: TrackingHistoryList
// Purpose: Render a list of tracking sessions using
//          <TrackingSessionCard />.
//
// Updated:
// - Handles delete modal + delete logic
// - Passes onDelete to each card
// - Added duration formatting using formatDuration()
// -------------------------------------------------------------

import { useState } from "react";
import type { TrackingSession } from "../../hooks/useTrackingHistory";
import { useTrackingHistory } from "../../hooks/useTrackingHistory";
import TrackingSessionCard from "./TrackingSessionCard";
import { formatDuration } from "../../utils/formatDuration";

interface TrackingHistoryListProps {
  sessions: TrackingSession[];
  pointCounts: Record<string, number>;
}

export default function TrackingHistoryList({
  sessions,
  pointCounts,
}: TrackingHistoryListProps) {
  const { deleteSession, getSessions, getPointCounts } = useTrackingHistory();

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [localSessions, setLocalSessions] = useState(sessions);
  const [localPointCounts, setLocalPointCounts] = useState(pointCounts);

  // Trigger delete modal
  const requestDelete = (id: string) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  // Confirm deletion
  const handleDelete = () => {
    if (!pendingDeleteId) return;

    deleteSession(pendingDeleteId);

    // Refresh list
    setLocalSessions(getSessions());
    setLocalPointCounts(getPointCounts());

    setShowConfirm(false);
    setPendingDeleteId(null);
  };

  // Empty state
  if (localSessions.length === 0) {
    return (
      <p className="text-gray-400 text-sm mt-4">No tracking sessions yet.</p>
    );
  }

  return (
    <>
      <div className="mt-4 space-y-4">
        {localSessions.map((session) => {
          const durationMs = session.endedAt
            ? session.endedAt - session.startedAt
            : 0;

          const duration = session.endedAt ? formatDuration(durationMs) : "N/A";

          return (
            <TrackingSessionCard
              key={session.id}
              session={session}
              pointCount={localPointCounts[session.id] ?? 0}
              duration={duration} // ⭐ NEW
              onDelete={() => requestDelete(session.id)}
            />
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
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
    </>
  );
}
