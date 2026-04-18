// -------------------------------------------------------------
// main.tsx
// Purpose: App entry point. Wraps the router with AuthProvider
//          so authentication + session logic is available globally.
//          Also injects the SessionExpiredModal above all screens.
// -------------------------------------------------------------

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

// Global authentication + session management
import { AuthProvider, useAuth } from "./context/AuthProvider";

// Session expired modal (neon theme)
import SessionExpiredModal from "./components/auth/SessionExpiredModal";

// Global styles
import "./styles/index.css";
import "./styles/safe-area.css";
import { TrackingProvider } from "./context/TrackingProvider";

const root = document.getElementById("root") as HTMLElement;

// -------------------------------------------------------------
// Wrapper component to inject the modal cleanly
// -------------------------------------------------------------
function AppWithModals() {
  const { sessionExpired, closeSessionExpired } = useAuth();

  return (
    <>
      {/* Global router */}
      <RouterProvider router={router} />

      {/* ---------------------------------------------------------
         Session Expired Modal
         - Blocks the screen until user taps OK
         - Only appears when auto-logout triggers
         --------------------------------------------------------- */}
      {sessionExpired && <SessionExpiredModal onClose={closeSessionExpired} />}
    </>
  );
}

ReactDOM.createRoot(root).render(
  // -------------------------------------------------------------
  // AuthProvider wraps the entire app so:
  // - useAuth() works anywhere
  // - auto-logout timer runs globally
  // - tracking pause logic works
  // - session expired modal can appear above all screens
  // -------------------------------------------------------------
  <div className="safe-top safe-bottom">
    <AuthProvider>
      <TrackingProvider>
        <AppWithModals />
      </TrackingProvider>
    </AuthProvider>
  </div>
);

// -------------------------------------------------------------
// Register service worker for PWA support
// -------------------------------------------------------------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
