// -------------------------------------------------------------
// Router Configuration
// Purpose: Defines all public + authenticated routes.
//
// Notes:
// - LandingPage is the public entry point
// - Login/Register added as standalone public routes
// - /app/* contains all authenticated pages inside <App /> layout
// -------------------------------------------------------------

import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Public pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Authenticated pages
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import CheckIns from "./pages/CheckIns";
import Settings from "./pages/Settings";
import TrackingHistory from "./pages/TrackingHistory";
import TrackingSession from "./pages/TrackingSession";

// Route protection
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

// NEW: 404 page
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  // -------------------------------------------------------------
  // Authentication Routes (Public)
  // -------------------------------------------------------------
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },

  // -------------------------------------------------------------
  // Authenticated App Routes
  // Wrapped inside <App /> layout
  // -------------------------------------------------------------
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "contacts", element: <Contacts /> },
      { path: "check-ins", element: <CheckIns /> },
      { path: "settings", element: <Settings /> },
      { path: "tracking-history", element: <TrackingHistory /> },
      { path: "tracking-history/:id", element: <TrackingSession /> },
    ],
  },

  // -------------------------------------------------------------
  // Catch-all route (404)
  // Purpose:
  // - Handles any route that doesn't match above
  // - Shows the custom NotFoundPage
  // -------------------------------------------------------------
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
