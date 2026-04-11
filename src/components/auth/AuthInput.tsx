// -------------------------------------------------------------
// Component: AuthInput
// Purpose: Reusable input with label, icon, errors, and password toggle.
// -------------------------------------------------------------

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string; // Optional prop for autocomplete attribute
}

export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  error,
  value,
  onChange,
  autoComplete,// Destructure the autoComplete prop
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">{label}</label>

      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl
          bg-[#0d1226] border
          ${error ? "border-red-500" : "border-white/10"}
          text-white placeholder-gray-500
          focus-within:border-cyan-400 transition
        `}
      >
        {icon && <div className="text-gray-400">{icon}</div>}

        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete} // Pass the autoComplete prop to the input element
          className="flex-1 bg-transparent outline-none text-white"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-400 hover:text-gray-200 transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
