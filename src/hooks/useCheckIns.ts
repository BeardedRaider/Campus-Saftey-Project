import { useState, useEffect } from "react";
import type { CheckIn } from "../types/CheckIn";

const STORAGE_KEY = "checkins";

export function useCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  // Load check-ins from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCheckIns(JSON.parse(saved));
    }
  }, []);

  // Save check-ins whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkIns));
  }, [checkIns]);

  // Add a new check-in
  const addCheckIn = (checkIn: CheckIn) => {
    setCheckIns((prev) => [checkIn, ...prev]);
  };

  return {
    checkIns,
    addCheckIn,
  };
}
