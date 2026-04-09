// -------------------------------------------------------------
// AuthProvider
// Purpose: Global authentication + session management system.
//
// Features:
// - Stores user state
// - Handles login + logout
// - Auto-logout after inactivity (10s test mode)
// - Pauses inactivity timer while tracking is active
// - Shows neon "Session Expired" modal
// - Exposes startTracking() / stopTracking()
//
// Notes:
// - Switch INACTIVITY_LIMIT to 15 * 60 * 1000 for production
// -------------------------------------------------------------

import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;

  // Tracking controls
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;

  // Modal
  sessionExpired: boolean;
  closeSessionExpired: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// -------------------------------
// TEST MODE: 10 seconds
// PROD MODE: 15 minutes
// -------------------------------
const INACTIVITY_LIMIT = 10 * 1000; // 10 seconds for testing
// const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes for production

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [isTracking, setIsTracking] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const [lastActivity, setLastActivity] = useState(Date.now());

  const isAuthenticated = !!user;

  // -------------------------------------------------------------
  // Login
  // -------------------------------------------------------------
  const login = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setLastActivity(Date.now());
  };

  // -------------------------------------------------------------
  // Logout
  // -------------------------------------------------------------
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // -------------------------------------------------------------
  // Tracking Controls
  // -------------------------------------------------------------
  const startTracking = () => {
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setLastActivity(Date.now()); // reset timer when tracking stops
  };

  // -------------------------------------------------------------
  // Inactivity Timer
  // -------------------------------------------------------------
  useEffect(() => {
    const handleActivity = () => {
      if (!isTracking) {
        setLastActivity(Date.now());
      }
    };

    // Listen for user activity
    window.addEventListener("click", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("mousemove", handleActivity);

    const interval = setInterval(() => {
      if (!isAuthenticated) return;
      if (isTracking) return; // Timer paused during tracking

      const now = Date.now();
      const inactiveFor = now - lastActivity;

      if (inactiveFor >= INACTIVITY_LIMIT) {
        setSessionExpired(true);
        logout();
      }
    }, 1000);

    return () => {
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("mousemove", handleActivity);
      clearInterval(interval);
    };
  }, [isAuthenticated, isTracking, lastActivity]);

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

// -------------------------------------------------------------
// Hook: useAuth()
// Purpose: Clean access to auth context
// -------------------------------------------------------------
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
