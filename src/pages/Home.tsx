// -------------------------------------------------------------
// Page: Home Dashboard
// Purpose: Main landing page showing stats, location, and actions.
//
// Uses ONLY the global TrackingProvider.
// Tracking now persists across ALL pages.
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";

import Greeting from "../components/ui/Greeting";
import StatsGrid from "../components/ui/StatsGrid";
import CurrentLocationCard from "../components/ui/CurrentLocationCard";
import RecentCheckInsPreview from "../components/ui/RecentCheckInsPreview";
import SafetyTip from "../components/ui/SafetyTip";

import TrackingButtons from "../components/home/TrackingButtons";

// ⭐ GLOBAL tracking engine (the correct one)
import { useTrackingContext } from "../context/TrackingProvider";

export default function Home() {
  // Pull tracking state from the global provider
  const {
    isTracking,
    position,
    lastUpdated,
    startTracking: trackingStart,
    stopTracking: trackingStop,
    activeSession,
  } = useTrackingContext();



  // -------------------------------------------------------------
  // Tracking Ready Indicator
  // -------------------------------------------------------------
  const [trackingReady, setTrackingReady] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => setTrackingReady(true),
      () => setTrackingReady(false),
    );
  }, []);

  // -------------------------------------------------------------
  // Start/Stop handlers
  // -------------------------------------------------------------
  const handleStartTracking = () => {
    trackingStart(); // ⭐ global engine
  };

  const handleStopTracking = () => {
    trackingStop(); // ⭐ global engine
  };

  return (
    <PageContainer>
      <Greeting />
      <StatsGrid />

      {/* ---------------------------------------------------------
         Tracking Ready Indicator
         --------------------------------------------------------- */}
      <div
        className={`mt-2 mb-4 text-sm font-medium transition-colors ${
          trackingReady ? "text-green-400" : "text-yellow-400"
        }`}
      >
        {trackingReady ? "✓ Tracking Ready" : "… Preparing GPS"}
      </div>

      {/* Start/Stop Buttons */}
      <TrackingButtons
        isTracking={isTracking}
        startTracking={handleStartTracking}
        stopTracking={handleStopTracking}
      />

      {/* Live Location Card */}
      <CurrentLocationCard
        isTracking={isTracking}
        position={position}
        lastUpdated={lastUpdated}
        startedAt={activeSession?.startedAt ?? null}
      />

      <RecentCheckInsPreview />
      <SafetyTip />
    </PageContainer>
  );
}
