// -------------------------------------------------------------
// Hook: useSettings
// Purpose: Load + save user tracking + safety preferences.
//
// Settings include:
// - trackingInterval (ms)
// - retryInterval (ms)
// - defaultEmergencyContact (contact ID)
//
// Stored in localStorage so they persist across sessions.
// -------------------------------------------------------------

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

export interface AppSettings {
  trackingInterval: number; // stored in ms
  retryInterval: number; // stored in ms
  defaultContactId: string | null;
}

// Default values used on first app launch
const DEFAULT_SETTINGS: AppSettings = {
  trackingInterval: 5 * 60 * 1000, // 5 minutes
  retryInterval: 30 * 1000, // 30 seconds
  defaultContactId: null,
};

export function useSettings() {
  const { user } = useAuth();

  // -------------------------------------------------------------
  // Per‑user storage key
  // -------------------------------------------------------------
  const STORAGE_KEY = `appSettings_${user?.id}`;

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // -------------------------------------------------------------
  // Load settings from localStorage on mount
  // -------------------------------------------------------------
  useEffect(() => {
    if (!user) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {
        console.error("Failed to parse settings");
      }
    } else {
      // New user → start with defaults
      setSettings(DEFAULT_SETTINGS);
    }
  }, [user]);

  // -------------------------------------------------------------
  // Save settings to localStorage
  // -------------------------------------------------------------
  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    }
  };

  return {
    settings,
    saveSettings,
  };
}
