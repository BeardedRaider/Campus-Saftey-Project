// -------------------------------------------------------------
// Hook: useSettings (FINAL FIXED VERSION)
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

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // -------------------------------------------------------------
  // Load settings whenever the user changes
  // -------------------------------------------------------------
  useEffect(() => {
    if (!user) {
      setSettings(DEFAULT_SETTINGS);
      return;
    }

    const STORAGE_KEY = `appSettings_${user.id}`;
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
  // Save settings
  // -------------------------------------------------------------
  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);

    if (user) {
      const STORAGE_KEY = `appSettings_${user.id}`;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    }
  };

  return {
    settings,
    saveSettings,
  };
}
