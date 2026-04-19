// -------------------------------------------------------------
// TrackingProvider (MINIMAL, WORKING, WITH USER RESET)
// -------------------------------------------------------------

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useTrackingHistory } from "../hooks/useTrackingHistory";
import { useSettings } from "../hooks/useSettings";
import { useAuth } from "../context/AuthProvider";
import type { TrackingSession } from "../hooks/useTrackingHistory";

interface TrackingContextValue {
  isTracking: boolean;
  position: GeolocationPosition | null;
  lastUpdated: number | null;
  startTracking: () => void;
  stopTracking: () => void;
  activeSessionId: string | null;
  activeSession: TrackingSession | null;
}

const TrackingContext = createContext<TrackingContextValue | null>(null);

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { settings } = useSettings();
  const { startSession, endSession, addPoint, sessions } = useTrackingHistory();

  const [isTracking, setIsTracking] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const autoStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeSessionIdRef = useRef<string | null>(null);
  const sessionIntervalRef = useRef<number>(0);

  const activeSession = activeSessionId
    ? sessions.find((s) => s.id === activeSessionId) || null
    : null;

  // -------------------------------------------------------------
  // Internal: start geolocation watcher
  // -------------------------------------------------------------
  const startWatcher = () => {
    if (!("geolocation" in navigator)) {
      console.error("Geolocation not available in this browser");
      return;
    }

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos);
        setLastUpdated(Date.now());

        const currentSessionId = activeSessionIdRef.current;
        if (currentSessionId) {
          addPoint(
            currentSessionId,
            pos.coords.latitude,
            pos.coords.longitude,
            Date.now(),
          );
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        // Just log; timer/session continue.
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );
  };

  // -------------------------------------------------------------
  // Public: start tracking
  // -------------------------------------------------------------
  const startTracking = () => {
    if (!user) {
      console.warn("Cannot start tracking without a user");
      return;
    }
    if (isTracking) return;

    const sessionId = startSession();
    setActiveSessionId(sessionId);
    activeSessionIdRef.current = sessionId;
    setIsTracking(true);

    sessionIntervalRef.current = settings.trackingInterval;
    console.log("SESSION INTERVAL LOCKED:", sessionIntervalRef.current);

    if (sessionIntervalRef.current > 0) {
      if (autoStopTimeoutRef.current) {
        clearTimeout(autoStopTimeoutRef.current);
      }
      autoStopTimeoutRef.current = setTimeout(() => {
        console.log("AUTO-STOP FIRED");
        stopTracking();
      }, sessionIntervalRef.current);
    }

    startWatcher();
  };

  // -------------------------------------------------------------
  // Public: stop tracking
  // -------------------------------------------------------------
  const stopTracking = () => {
    console.log("STOP TRACKING CALLED", {
      isTracking,
      activeSessionIdRef: activeSessionIdRef.current,
    });

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current);
      autoStopTimeoutRef.current = null;
    }

    const currentSessionId = activeSessionIdRef.current;
    if (currentSessionId) {
      endSession(currentSessionId);
    }

    activeSessionIdRef.current = null;
    setIsTracking(false);
    setActiveSessionId(null);
  };

  // -------------------------------------------------------------
  // Reset tracking when user changes (fix first-login issue)
  // -------------------------------------------------------------
  useEffect(() => {
    // When user logs in/out or switches, force a clean slate
    if (!user) {
      // No user → ensure tracking is fully stopped
      stopTracking();
    } else {
      // New user → clear any stale timers/watchers from previous user
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      if (autoStopTimeoutRef.current) {
        clearTimeout(autoStopTimeoutRef.current);
        autoStopTimeoutRef.current = null;
      }
      activeSessionIdRef.current = null;
      setIsTracking(false);
      setActiveSessionId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // -------------------------------------------------------------
  // Cleanup on unmount
  // -------------------------------------------------------------
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (autoStopTimeoutRef.current) {
        clearTimeout(autoStopTimeoutRef.current);
      }
    };
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        isTracking,
        position,
        lastUpdated,
        startTracking,
        stopTracking,
        activeSessionId,
        activeSession,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

export function useTrackingContext() {
  const ctx = useContext(TrackingContext);
  if (!ctx) {
    throw new Error("useTrackingContext must be used inside TrackingProvider");
  }
  return ctx;
}
