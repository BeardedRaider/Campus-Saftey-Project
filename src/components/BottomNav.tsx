import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-[#1A1A1A] border-t border-[#333] text-white h-16 flex items-center justify-around">
      <Link to="/" className="flex flex-col items-center text-xs">
        <span className="text-lg">🏠</span>
        Home
      </Link>

      <Link to="/contacts" className="flex flex-col items-center text-xs">
        <span className="text-lg">📞</span>
        Contacts
      </Link>

      <Link to="/check-ins" className="flex flex-col items-center text-xs">
        <span className="text-lg">📍</span>
        Check‑Ins
      </Link>

      <Link to="/settings" className="flex flex-col items-center text-xs">
        <span className="text-lg">⚙️</span>
        Settings
      </Link>
    </nav>
  );
}
