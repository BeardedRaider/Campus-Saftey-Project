// -------------------------------------------------------------
// Component: SettingsField
// Purpose: Reusable dropdown field for Settings page.
//
// Includes:
// - Label
// - Styled select
// - Custom arrow spacing
// - Global neon theme
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

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-3 pr-10 rounded-lg bg-[#0a0f1c] border ${borderColor} text-white
                      appearance-none bg-right bg-no-repeat`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg fill='white' height='20' width='40' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='5,7 10,12 15,7'/%3E%3C/svg%3E\")",
          }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
