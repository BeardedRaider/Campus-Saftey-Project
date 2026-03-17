import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import CheckIns from "./pages/CheckIns";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
