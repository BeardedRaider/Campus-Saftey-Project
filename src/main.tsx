// -------------------------------------------------------------
// main.tsx (FINAL — NO REMOUNTING ANYWHERE)
// -------------------------------------------------------------

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { AuthProvider, useAuth } from "./context/AuthProvider";
import { TrackingProvider } from "./context/TrackingProvider";
import { AppVersionProvider } from "./context/AppVersionProvider";

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
// AppWrapper (FINAL — NO KEY, NO REMOUNT)
// -------------------------------------------------------------
function AppWrapper() {
  return <AppWithModals />; // ❗ NO key={version}
}

ReactDOM.createRoot(root).render(
  <AppVersionProvider>
    <AuthProvider>
      <TrackingProvider>
        <AppWrapper />
      </TrackingProvider>
    </AuthProvider>
  </AppVersionProvider>,
);
