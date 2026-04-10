// -------------------------------------------------------------
// Page: TrackingSession
// Purpose: Display a single tracking session and all breadcrumb
//          points using <TrackingSessionViewer />.
//
// Route: /app/tracking-history/:id
//
// This page:
// - Reads the session ID from the URL
// - Loads the session + points from useTrackingHistory()
// - Renders TrackingSessionViewer
// - Handles missing/invalid session IDs
// -------------------------------------------------------------

import { useParams, Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import SettingsSectionHeader from "../components/settings/SettingsSectionHeader";
import { useTrackingHistory } from "../hooks/useTrackingHistory";
import TrackingSessionViewer from "../components/tracking/TrackingSessionViewer";
import { ChevronLeft } from "lucide-react";

export default function TrackingSession() {
  const { id } = useParams();
  const { getSessionById, getPointsForSession } = useTrackingHistory();

  // Load session + points
  const session = id ? getSessionById(id) : null;
  const points = id ? getPointsForSession(id) : [];

  // Handle invalid session ID
  if (!session) {
    return (
      <PageContainer>
        <h1 className="text-2xl font-bold text-white mb-2">Tracking Session</h1>

        {/* Back Button (tight spacing) */}
        <Link
          to="/app/tracking-history"
          className="flex items-center text-cyan-300 text-sm mb-6 hover:underline"
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

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-white mb-2">Tracking Session</h1>

      {/* Back Button (tight spacing) */}
      <Link
        to="/app/tracking-history"
        className="flex items-center text-cyan-300 text-sm mb-6 hover:underline"
      >
        <ChevronLeft size={18} className="mr-1" />
        Back to Tracking History
      </Link>

      <SettingsSectionHeader title="Session Details" />

      <TrackingSessionViewer session={session} points={points} />
    </PageContainer>
  );
}
