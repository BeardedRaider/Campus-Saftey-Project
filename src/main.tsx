// -------------------------------------------------------------
// main.tsx
// Purpose: App entry point. Ensures AuthProvider wraps
// TrackingProvider, and TrackingProvider wraps RouterProvider.
// Now includes AppVersionProvider + AppWrapper for safe remounts.
// -------------------------------------------------------------

import ReactDOM from "react-dom/client";
import { useEffect } from "react"; // ⭐ NEEDED for AppWrapper
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { AuthProvider, useAuth } from "./context/AuthProvider";
import {
  TrackingProvider,
  useTrackingContext,
} from "./context/TrackingProvider";
import {
  AppVersionProvider,
  useAppVersion,
} from "./context/AppVersionProvider";

import SessionExpiredModal from "./components/auth/SessionExpiredModal";

import "./styles/index.css";
import "./styles/safe-area.css";

const root = document.getElementById("root") as HTMLElement;

// -------------------------------------------------------------
// Wrapper for global modals
// -------------------------------------------------------------
function AppWithModals() {
  const { sessionExpired, closeSessionExpired } = useAuth();

  return (
    <>
      <RouterProvider router={router} />
      {sessionExpired && <SessionExpiredModal onClose={closeSessionExpired} />}
    </>
  );
}

// -------------------------------------------------------------
// AppWrapper
// Purpose:
// - Wraps AppWithModals
// - Forces a SAFE remount when version changes
// - Adds resume logic (Option 3):
//     → Only bump version when app resumes AND tracking is NOT active
// -------------------------------------------------------------
function AppWrapper() {
  const { version, bumpVersion } = useAppVersion();
  const { isTracking } = useTrackingContext();

  // Resume-from-background logic (Option 3)
  useEffect(() => {
    const handleResume = () => {
      if (!isTracking) {
        bumpVersion(); // safe remount
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        handleResume();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", handleResume);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", handleResume);
    };
  }, [isTracking, bumpVersion]);

  // SAFE remount:
  // - Only when version changes
  // - Never on navigation
  // - Never during tracking
  console.log("App remounted. Version:", version);
  return <AppWithModals key={version} />;
  
}

ReactDOM.createRoot(root).render(
  // -------------------------------------------------------------
  // Correct Provider Order (SAFE)
  //
  // 1. AppVersionProvider
  //    - Controls safe remounts (login, settings save, PWA resume)
  //
  // 2. AuthProvider
  //    - TrackingHistory uses useAuth()
  //
  // 3. TrackingProvider
  //    - Must wrap RouterProvider so tracking persists across pages
  //
  // 4. RouterProvider (inside AppWithModals)
  // -------------------------------------------------------------
  <AppVersionProvider>
    <AuthProvider>
      <TrackingProvider>
        <AppWrapper />
      </TrackingProvider>
    </AuthProvider>
  </AppVersionProvider>,
);
