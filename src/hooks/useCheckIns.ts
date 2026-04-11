// -------------------------------------------------------------
// Hook: useCheckIns (Per‑User Storage)
// Purpose: Manage check-in entries with localStorage persistence.
//
// Features:
// - Load check-ins from localStorage on mount
// - Save check-ins whenever they change
// - Add new check-in
// - Delete check-in
//
// Notes:
// - Supports optional `photo` field on CheckIn
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import type { CheckIn } from "../types/CheckIn";

export function useCheckIns() {
  const { user } = useAuth();
  const STORAGE_KEY = `checkIns_${user?.id}`;

  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  // Load check-ins for this user
  useEffect(() => {
    if (!user) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCheckIns(JSON.parse(saved));
      } catch {
        console.error("Failed to parse check-ins");
      }
    } else {
      setCheckIns([]); // new user → empty list
    }
  }, [user]);

  // Save check-ins for this user
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkIns));
  }, [checkIns, user]);

  const addCheckIn = (checkIn: CheckIn) => {
    setCheckIns((prev) => [checkIn, ...prev]);
  };

  const deleteCheckIn = (id: string) => {
    setCheckIns((prev) => prev.filter((c) => c.id !== id));
  };

  return { checkIns, addCheckIn, deleteCheckIn };
}
