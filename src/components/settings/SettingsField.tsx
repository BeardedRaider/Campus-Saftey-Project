// -------------------------------------------------------------
// Component: SettingsField
// Purpose: Reusable dropdown field for Settings page.
// -------------------------------------------------------------

interface SettingsFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: { label: string; value: number | string }[];
  borderColor: string;
}

export default function SettingsField({
  label,
  value,
  onChange,
  options,
  borderColor,
}: SettingsFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-gray-300 mb-2">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 rounded-lg bg-[#0a0f1c] border ${borderColor} text-white`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
