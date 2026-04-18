// -------------------------------------------------------------
// Component: Section
// Purpose: Global vertical spacing wrapper for landing sections.
// -------------------------------------------------------------

export default function Section({ children }: { children: React.ReactNode }) {
  return <section className="py-12">{children}</section>;
}
