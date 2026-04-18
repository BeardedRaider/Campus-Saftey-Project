// -------------------------------------------------------------
// Component: LandingHero (Option A)
// Purpose: Minimal hero with tagline only.
// - Removes duplicate app name (header already shows it)
// - Cleaner, more premium, more app-like
// -------------------------------------------------------------

export default function LandingHero() {
  return (
    <div className="text-center">
      <p className="neon-cyan-title text-2xl font-semibold">
        Stay safe. Stay connected.
      </p>
    </div>
  );
}
