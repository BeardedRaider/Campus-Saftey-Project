// -------------------------------------------------------------
// Component: AnimatedButton
// Purpose: Reusable action button with loading, success,
//          and error animations (same style as Check-In button).
//
// Props:
// - onClick: function to run on press
// - isLoading: boolean
// - success: boolean
// - error: boolean
// - idleText: string (default button text)
// - loadingText: string
// - successText: string
// - errorText: string
// - icon: React component for idle state
//
// Styling matches Check-In button exactly.
// -------------------------------------------------------------

import { Radar, Check, X } from "lucide-react";

interface AnimatedButtonProps {
  onClick: () => void;
  isLoading: boolean;
  success: boolean;
  error: boolean;
  idleText: string;
  loadingText: string;
  successText: string;
  errorText: string;
  icon?: React.ReactNode;
}

export default function AnimatedButton({
  onClick,
  isLoading,
  success,
  error,
  idleText,
  loadingText,
  successText,
  errorText,
  icon,
}: AnimatedButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-md
        ${
          isLoading
            ? "bg-cyan-700 opacity-70"
            : success
              ? "bg-green-600"
              : error
                ? "bg-red-600"
                : "bg-cyan-500 hover:bg-cyan-400"
        }`}
    >
      {isLoading ? (
        <Radar className="animate-spin-slow" size={20} />
      ) : success ? (
        <Check size={20} />
      ) : error ? (
        <X size={20} />
      ) : (
        icon || <Radar size={20} />
      )}

      {isLoading
        ? loadingText
        : success
          ? successText
          : error
            ? errorText
            : idleText}
    </button>
  );
}
