// -------------------------------------------------------------
// Component: LandingCTA
// Purpose: Final call-to-action card on the landing page,
//          encouraging users to register.
// Notes:
// - Converted to a glassy neon card to match landing design.
// - Uses global .card styling for consistency.
// - Button placed inside the card for stronger visual hierarchy.
// -------------------------------------------------------------

import { Link } from "react-router-dom";

export default function LandingCTA() {
  return (
    <section className="pt-10 pb-16 px-4 text-center">
      {/* ---------------------------------------------------------
         CTA Card Container
         - Uses global .card for glassy background + glow.
         - Centered with consistent spacing.
         --------------------------------------------------------- */}
      <div className="card max-w-md mx-auto px-6 py-8">
        {/* CTA heading */}
        <h2 className="section-title mb-3">
          Ready to Join Your Campus Community?
        </h2>

        {/* Supporting text */}
        <p className="text-gray-300 leading-relaxed mb-8">
          Connect with trusted contacts, stay aware of your surroundings, and
          feel safer every day on campus.
        </p>

        {/* ---------------------------------------------------------
           CTA Button
           - Uses global button system (btn-base + btn-cyan).
           - Inline-flex ensures proper alignment.
           --------------------------------------------------------- */}
        <Link to="/register" className="btn-base btn-cyan inline-flex mx-auto">
          Get Started
        </Link>
      </div>
    </section>
  );
}
