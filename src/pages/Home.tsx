// -------------------------------------------------------------
// Page: Home Dashboard
// -------------------------------------------------------------

import PageContainer from "../components/PageContainer";

import Greeting from "../components/ui/Greeting";
import StatsGrid from "../components/ui/StatsGrid";
import CurrentLocationCard from "../components/ui/CurrentLocationCard";
import RecentCheckInsPreview from "../components/ui/RecentCheckInsPreview";
import SafetyTip from "../components/ui/SafetyTip";

import TrackingButtons from "../components/home/TrackingButtons";

import { useTrackingContext } from "../context/TrackingProvider";
import { useAuth } from "../context/AuthProvider";

export default function Home() {
  const {
    isTracking,
    position,
    lastUpdated,
    activeSession, // NEW
    startTracking: trackingStart,
    stopTracking: trackingStop,
  } = useTrackingContext();

  const { startTracking: authStartTracking, stopTracking: authStopTracking } =
    useAuth();

  const handleStartTracking = () => {
    trackingStart();
    authStartTracking();
  };

  const handleStopTracking = () => {
    trackingStop();
    authStopTracking();
  };

  return (
    <PageContainer>
      <Greeting />
      <StatsGrid />

      <TrackingButtons
        isTracking={isTracking}
        startTracking={handleStartTracking}
        stopTracking={handleStopTracking}
      />

      <CurrentLocationCard
        isTracking={isTracking}
        position={position}
        lastUpdated={lastUpdated}
        startedAt={activeSession?.startedAt ?? null} // NEW
      />

      <RecentCheckInsPreview />
      <SafetyTip />
    </PageContainer>
  );
}
