// -------------------------------------------------------------
// Component: AuthInput
// Purpose: Reusable input with label + consistent styling.
// -------------------------------------------------------------

interface AuthInputProps {
  label: string;
  type?: string;
  placeholder?: string;
}

export default function AuthInput({
  label,
  type = "text",
  placeholder,
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full px-4 py-3 rounded-xl
          bg-[#0d1226] border border-white/10
          text-white placeholder-gray-500
          focus:outline-none focus:border-cyan-400
          transition
        "
      />
    </div>
  );
}
