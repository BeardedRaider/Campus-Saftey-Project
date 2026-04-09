// -------------------------------------------------------------
// Component: AppHeader
// Purpose: Header for authenticated pages (inside /app/* routes)
//
// Notes:
// - Matches LandingHeader styling
// - Shows Logout instead of Login
// - Clears user + redirects to /login
// -------------------------------------------------------------

import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function AppHeader() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // <-- use global logout

  const handleLogout = () => {
    logout(); // <-- clears auth state properly
    navigate("/login"); // <-- redirect to login
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-5">
      <div className="flex items-center gap-2">
        <Shield className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        <span className="font-semibold text-lg tracking-wide">
          Campus Safety Buddy
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
      >
        Logout
      </button>
    </header>
  );
}

