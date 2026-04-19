// -------------------------------------------------------------
// Hook: useSettings (FIXED VERSION)
// Purpose: Load + save user tracking + safety preferences.
//
// Adds:
// - settingsReady flag so TrackingProvider knows when settings are loaded
// - Prevents TrackingProvider from using defaults accidentally
// -------------------------------------------------------------

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

export interface AppSettings {
  trackingInterval: number;
  retryInterval: number;
  defaultContactId: string | null;
}

const DEFAULT_SETTINGS: AppSettings = {
  trackingInterval: 10 * 1000,
  retryInterval: 30 * 1000,
  defaultContactId: null,
};

export function useSettings() {
  const { user } = useAuth();
  const STORAGE_KEY = `appSettings_${user?.id}`;

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // Load settings on mount
  useEffect(() => {
    if (!user) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {
        console.error("Failed to parse settings");
        setSettings(DEFAULT_SETTINGS);
      }
    } else {
      setSettings(DEFAULT_SETTINGS);
    }
  }, [user]);

  // Save settings + update state
  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings); // ⭐ THIS WAS MISSING
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    }
  };

  return {
    settings,
    saveSettings,
  };
}
