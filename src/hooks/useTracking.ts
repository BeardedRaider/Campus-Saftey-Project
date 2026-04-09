// -------------------------------------------------------------
// Hook: useTracking
// Purpose: Continuous geolocation tracking with auto-stop timer
//          based on user-selected tracking interval.
//
// trackingInterval meaning:
// - > 0  → auto-stop after X ms
// - = 0  → track until user manually stops
// -------------------------------------------------------------

import { useState, useRef, useEffect } from "react";
import { useSettings } from "./useSettings";

export function useTracking() {
  const { settings } = useSettings();

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

    // Clear any previous timers
    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    if (autoStopTimeoutRef.current) clearTimeout(autoStopTimeoutRef.current);

    // ---------------------------------------------------------
    // AUTO-STOP TIMER
    // ---------------------------------------------------------
    if (settings.trackingInterval > 0) {
      autoStopTimeoutRef.current = setTimeout(() => {
        console.log("Auto-stop triggered");
        stopTracking();
      }, settings.trackingInterval);
    }

    // ---------------------------------------------------------
    // Start GPS watch
    // ---------------------------------------------------------
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos);
        setLastUpdated(new Date().toLocaleString());
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
