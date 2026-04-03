import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import CheckIns from "./pages/CheckIns";
import Settings from "./pages/Settings";

// Testing page for geolocation features
import GeoTest from "./pages/GeoTest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  // TESTING ROUTE ONLY BELOW - REMOVE IN PRODUCTION
  {
    path: "/geotest",
    element: <GeoTest />,// testing page for geolocation features
  },
  {
    path: "/app",
    element: <App />, // App is your layout
    children: [
      { index: true, element: <Home /> },
      { path: "contacts", element: <Contacts /> },
      { path: "check-ins", element: <CheckIns /> },
      { path: "settings", element: <Settings /> },

    ],
  },
]);
