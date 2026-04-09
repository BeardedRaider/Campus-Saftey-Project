// -------------------------------------------------------------
// main.tsx
// Purpose: App entry point. Wraps the router with AuthProvider
//          so authentication + session logic is available globally.
// -------------------------------------------------------------

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

// Global authentication + session management
import { AuthProvider } from "./context/AuthProvider";

// Global styles
import "./styles/index.css";
import "./styles/safe-area.css";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  // -------------------------------------------------------------
  // AuthProvider wraps the entire app so:
  // - useAuth() works anywhere
  // - auto-logout timer runs globally
  // - tracking pause logic works
  // - session expired modal can appear above all screens
  // -------------------------------------------------------------
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);

// -------------------------------------------------------------
// Register service worker for PWA support
// -------------------------------------------------------------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
