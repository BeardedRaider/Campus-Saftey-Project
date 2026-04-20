// -------------------------------------------------------------
// Page: TrackingSession
// Purpose: Display a single tracking session and all breadcrumb
//          points using <TrackingSessionViewer />.
//
// Route: /app/tracking-history/:id
// -------------------------------------------------------------

import { useParams, Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import SettingsSectionHeader from "../components/settings/SettingsSectionHeader";
import { useTrackingHistory } from "../hooks/useTrackingHistory";
import TrackingSessionViewer from "../components/tracking/TrackingSessionViewer";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TrackingSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getSessionById, getPointsForSession, deleteSession } =
    useTrackingHistory();

  const session = id ? getSessionById(id) : null;
  const points = id ? getPointsForSession(id) : [];

  const [showConfirm, setShowConfirm] = useState(false);

  // -------------------------------------------------------------
  // Handle invalid session ID
  // -------------------------------------------------------------
  if (!session) {
    return (
      <PageContainer>
        <h1 className="text-2xl font-bold text-white mb-1">Tracking Session</h1>
        <Link
          to="/app/tracking-history"
          className="flex items-center text-cyan-300 text-sm mb-3 hover:underline"
        >
          <ChevronLeft size={18} className="mr-1" />
          Back to Tracking History
        </Link>

        <h2 className="text-xl font-semibold text-white mb-4">
          Session Not Found
        </h2>

        <p className="text-gray-400 mb-4">
          The tracking session you're trying to view does not exist.
        </p>

        <Link
          to="/app/tracking-history"
          className="text-cyan-400 underline text-sm"
        >
          Return to Tracking History
        </Link>
      </PageContainer>
    );
  }

  // -------------------------------------------------------------
  // Delete handler
  // -------------------------------------------------------------
  const handleDelete = () => {
    deleteSession(session.id);
    navigate("/app/tracking-history");
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-white mb-2">Tracking Session</h1>

      <Link
        to="/app/tracking-history"
        className="flex items-center text-cyan-300 text-sm mb-1 hover:underline"
      >
        <ChevronLeft size={18} className="mr-1" />
        Back to Tracking History
      </Link>

      {/* Header with Delete Button */}
      <div className="flex items-center justify-between mt-0 pt-0 mb-4">
        <SettingsSectionHeader title="Session Details" />

        <button
          onClick={() => setShowConfirm(true)}
          className="text-red-400 hover:text-red-300 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <TrackingSessionViewer session={session} points={points} />

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
