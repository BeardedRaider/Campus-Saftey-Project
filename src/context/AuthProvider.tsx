// -------------------------------------------------------------
// AuthProvider (FINAL, NO REMOUNT ON LOGIN/LOGOUT)
// -------------------------------------------------------------

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
  // -------------------------------------------------------------
  const lastActivityRef = useRef(Date.now());

  // -------------------------------------------------------------
  // Auth actions (NO bumpVersion)
  // -------------------------------------------------------------
  const login = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    lastActivityRef.current = Date.now();
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const startTracking = () => {
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
    lastActivityRef.current = Date.now();
  };

  // -------------------------------------------------------------
  // MOBILE-FIRST ACTIVITY LISTENERS
  // -------------------------------------------------------------
  useEffect(() => {
    const handleActivity = () => {
      if (!isTracking) {
        lastActivityRef.current = Date.now();
      }
    };

    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("touchend", handleActivity);
    window.addEventListener("touchmove", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("touchend", handleActivity);
      window.removeEventListener("touchmove", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [isTracking]);

  // -------------------------------------------------------------
  // INACTIVITY CHECK LOOP
  // -------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAuthenticated) return;
      if (isTracking) return;

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
