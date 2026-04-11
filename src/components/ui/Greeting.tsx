// -------------------------------------------------------------
// Component: Greeting
// Purpose: Display the welcome header on the Home Dashboard.
// -------------------------------------------------------------

import { Hand } from "lucide-react";

export default function Greeting() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const name = user?.name || "User";

  return (
    <div className="mb-6">
      {/* Subtle intro line */}
      <p className="text-sm text-gray-400">Welcome back,</p>

      {/* Main greeting */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold leading-none">{name}</h1>
        <Hand size={22} className="text-cyan-300" />
      </div>
    </div>
  );
}
