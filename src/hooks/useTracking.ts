// -------------------------------------------------------------
// Hook: useTracking
// Purpose: Continuous geolocation tracking with auto-stop timer
//          based on user-selected tracking interval.
//
// trackingInterval meaning:
// - > 0  → auto-stop after X ms
// - = 0  → track until user manually stops
//
// Integrates with useTrackingHistory to:
// - start a tracking session
// - save every GPS update as a breadcrumb point
// - end the session when tracking stops
// -------------------------------------------------------------

import { useState, useRef, useEffect } from "react";
import { useSettings } from "./useSettings";
import { useTrackingHistory } from "./useTrackingHistory";

export function useTracking() {
  const { settings } = useSettings();

  // Tracking history hook
  const { startSession, addPoint, endSession } = useTrackingHistory();

  // Active session ID
  const sessionIdRef = useRef<string | null>(null);

  const [isTracking, setIsTracking] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // -------------------------------------------------------------
  // Start tracking
  // -------------------------------------------------------------
  const startTracking = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    console.log(
      "Starting tracking with interval (ms):",
      settings.trackingInterval,
    );

    setIsTracking(true);

    // Start a new tracking session
    sessionIdRef.current = startSession();
    console.log("Started session:", sessionIdRef.current);

    // Clear timers
    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    if (autoStopTimeoutRef.current) clearTimeout(autoStopTimeoutRef.current);

    // Auto-stop timer
    if (settings.trackingInterval > 0) {
      autoStopTimeoutRef.current = setTimeout(() => {
        console.log("Auto-stop triggered");
        stopTracking();
      }, settings.trackingInterval);
    }

    // Start GPS watch
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos);

        // HUMAN‑READABLE timestamp for UI display (not used for storage)
        setLastUpdated(new Date().toLocaleString());

        // Save breadcrumb point
        if (sessionIdRef.current) {
          addPoint(
            sessionIdRef.current,
            pos.coords.latitude,
            pos.coords.longitude,
            Date.now(),
          );
        }
      },

      // Retry logic
      (err) => {
        console.error("Tracking error:", err);

        retryTimeoutRef.current = setTimeout(() => {
          if (isTracking) startTracking();
        }, settings.retryInterval);
      },

      { enableHighAccuracy: true },
    );
  };

  // -------------------------------------------------------------
  // Stop tracking
  // -------------------------------------------------------------
  const stopTracking = () => {
    setIsTracking(false);

    // End the active tracking session
    if (sessionIdRef.current) {
      endSession(sessionIdRef.current);
      console.log("Ended session:", sessionIdRef.current);
      sessionIdRef.current = null;
    }

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current);
      autoStopTimeoutRef.current = null;
    }
  };

  // -------------------------------------------------------------
  // Cleanup on unmount
  // -------------------------------------------------------------
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null)
        navigator.geolocation.clearWatch(watchIdRef.current);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      if (autoStopTimeoutRef.current) clearTimeout(autoStopTimeoutRef.current);
    };
  }, []);

  return {
    isTracking,
    position,
    lastUpdated,
    startTracking,
    stopTracking,
  };
}
