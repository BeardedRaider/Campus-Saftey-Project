import { useState, useRef } from "react";

export function useGeolocation() {
  // Stores the user's current position
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  // Stores any geolocation error (permissions, unavailable, etc.)
  const [error, setError] = useState<string | null>(null);

  // Stores the watch ID so we can stop tracking later
  const watchId = useRef<number | null>(null);

  // Get the user's current location once
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
        setError(null);
      },
      (err) => {
        setError(err.message);
      },
    );
  };

  // Start watching the user's location continuously
  const startWatching = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos);
        setError(null);
      },
      (err) => {
        setError(err.message);
      },
    );
  };

  // Stop watching the user's location
  const stopWatching = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  return {
    position,
    error,
    getCurrentLocation,
    startWatching,
    stopWatching,
  };
}
