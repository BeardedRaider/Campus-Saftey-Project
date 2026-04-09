// -------------------------------------------------------------
// Component: SettingsSectionHeader
// Purpose: Clean, globally styled section headers for Settings.
// -------------------------------------------------------------

export default function SettingsSectionHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-lg font-semibold text-cyan-300 tracking-wide mb-4 mt-8 
                   drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]"
    >
      {title}
    </h2>
  );
}
