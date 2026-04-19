// -------------------------------------------------------------
// AuthProvider (FINAL, MOBILE-FIRST, NON-REACTIVE)
// -------------------------------------------------------------
// Fixes:
// - Removes mousemove + keydown spam
// - Prevents re-renders on every activity event
// - Uses refs instead of state for lastActivity
// - Prevents TrackingProvider from resetting
// - Keeps auto-logout working
// - Mobile-first activity detection
//
// Updated:
// - Added bumpVersion() after login + logout
//   → Ensures Safari/PWA reloads correct user + settings
//   → SAFE remount (AppWrapper prevents remount during tracking)
// -------------------------------------------------------------

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAppVersion } from "./AppVersionProvider"; // added

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;

  // Tracking controls
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;

  // Session expired modal
  sessionExpired: boolean;
  closeSessionExpired: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 15 minutes for production
const INACTIVITY_LIMIT = 15 * 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { bumpVersion } = useAppVersion();

  // -------------------------------------------------------------
  // User state
  // -------------------------------------------------------------
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;

  // -------------------------------------------------------------
  // Tracking state
  // -------------------------------------------------------------
  const [isTracking, setIsTracking] = useState(false);

  // -------------------------------------------------------------
  // Session expired modal
  // -------------------------------------------------------------
  const [sessionExpired, setSessionExpired] = useState(false);

  // -------------------------------------------------------------
  // lastActivity stored in a REF (NOT state)
  // This prevents re-renders on every activity event.
  // -------------------------------------------------------------
  const lastActivityRef = useRef(Date.now());

  // -------------------------------------------------------------
  // Auth actions
  // -------------------------------------------------------------
  const login = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    lastActivityRef.current = Date.now();

    bumpVersion(); // SAFE remount after login
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);

    bumpVersion(); // ensures clean state after logout
  };

  const startTracking = () => {
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
    lastActivityRef.current = Date.now();
  };

  // -------------------------------------------------------------
  // ⭐ MOBILE-FIRST ACTIVITY LISTENERS
  // These DO NOT cause re-renders.
  // -------------------------------------------------------------
  useEffect(() => {
    const handleActivity = () => {
      if (!isTracking) {
        lastActivityRef.current = Date.now();
      }
    };

    // Mobile-first events
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("touchend", handleActivity);
    window.addEventListener("touchmove", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity); // taps count as clicks

    return () => {
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("touchend", handleActivity);
      window.removeEventListener("touchmove", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [isTracking]);

  // -------------------------------------------------------------
  // INACTIVITY CHECK LOOP (runs every second)
  // Uses refs → NO re-renders
  // -------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAuthenticated) return;
      if (isTracking) return; // tracking pauses inactivity timer

      const now = Date.now();
      const inactiveFor = now - lastActivityRef.current;

      if (inactiveFor >= INACTIVITY_LIMIT) {
        setSessionExpired(true);
        logout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, isTracking]);

  const closeSessionExpired = () => setSessionExpired(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isTracking,
        startTracking,
        stopTracking,
        sessionExpired,
        closeSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
