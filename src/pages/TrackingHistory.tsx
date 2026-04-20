// -------------------------------------------------------------
// Page: TrackingHistory
// Purpose: Display list of all past tracking sessions.
//
// Clean version:
// - Loads sessions + point counts
// - Delegates rendering + deletion to TrackingHistoryList
// - No inline card markup
// - No delete modal here
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import { useTrackingHistory } from "../hooks/useTrackingHistory";
import { useAuth } from "../context/AuthProvider";
import TrackingHistoryList from "../components/tracking/TrackingHistoryList";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TrackingHistory() {
  const { getSessions, getPointCounts } = useTrackingHistory();
  const { user } = useAuth();

  const [sessions, setSessions] = useState(getSessions());
  const [pointCounts, setPointCounts] = useState(getPointCounts());

  // Refresh when user changes
  useEffect(() => {
    setSessions(getSessions());
    setPointCounts(getPointCounts());
  }, [user]);

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-white mb-1">Tracking History</h1>
      <Link
        to="/app"
        className="flex items-center text-cyan-300 text-sm mb-3 hover:underline"
      >
        <ChevronLeft size={18} className="mr-1" />
        Back to Home
      </Link>

      <TrackingHistoryList sessions={sessions} pointCounts={pointCounts} />
    </PageContainer>
  );
}
