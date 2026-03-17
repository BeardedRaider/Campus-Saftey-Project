import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingHeader() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-4 bg-[#0D0D0D]">
      {/* Logo / Icon */}
      <div className="flex items-center gap-2">
        <Shield className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        <span className="text-white font-semibold text-lg tracking-wide">
          Campus Safety Buddy
        </span>
      </div>

      {/* Login Button */}
      <Link
        to="/login"
        className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
      >
        Login
      </Link>
    </header>
  );
}
