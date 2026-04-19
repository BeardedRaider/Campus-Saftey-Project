// -------------------------------------------------------------
// Hook: useSettings
// Purpose: Load + save user tracking + safety preferences.
//
// Updated:
// - Added bumpVersion() after saving settings
//   → Forces SAFE app remount so Safari/PWA picks up new settings
// - Does NOT remount during tracking (handled in AppWrapper)
// -------------------------------------------------------------

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useAppVersion } from "../context/AppVersionProvider";

export interface AppSettings {
  trackingInterval: number;
  retryInterval: number;
  defaultContactId: string | null;
}

const DEFAULT_SETTINGS: AppSettings = {
  trackingInterval: 10 * 1000, // 10 seconds for testing
  retryInterval: 30 * 1000,
  defaultContactId: null,
};

export function useSettings() {
  const { user } = useAuth();
  const { bumpVersion } = useAppVersion();

  const STORAGE_KEY = `appSettings_${user?.id}`;

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // -------------------------------------------------------------
  // Load settings on mount
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // Save settings + update state
  // -------------------------------------------------------------
  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);

    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    }

    bumpVersion(); // force SAFE remount so new settings apply instantly
  };

  return {
    settings,
    saveSettings,
  };
}
