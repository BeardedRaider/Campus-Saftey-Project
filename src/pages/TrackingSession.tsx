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
        <h1 className="text-2xl font-bold text-white mb-6">
          Session Not Found
        </h1>

        <p className="text-gray-400 mb-4">
          The tracking session you're trying to view does not exist.
        </p>

        <Link
          to="/app/tracking-history"
          className="text-cyan-400 underline text-sm"
        >
          Back to Tracking History
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-white mb-6">Tracking Session</h1>

      <SettingsSectionHeader title="Session Details" />

      <TrackingSessionViewer session={session} points={points} />
    </PageContainer>
  );
}
