// -------------------------------------------------------------
// Component: LandingHero
// Purpose: Main hero section with app title + tagline.
//
// Updated:
// - Removed black background
// - Uses consistent spacing + typography
// - Tagline now uses the same neon cyan glow as Home components
// -------------------------------------------------------------

export default function LandingHero() {
  return (
    <section className="text-center pt-12 pb-10 px-4">
      {/* App name */}
      <h1 className="text-3xl font-bold tracking-wide mb-3">
        Campus Safety Buddy
      </h1>

      {/* Tagline — Cyan (Primary theme, matches Home) */}
      <p className="neon-cyan-title text-lg">Stay safe. Stay connected.</p>
    </section>
  );
}
