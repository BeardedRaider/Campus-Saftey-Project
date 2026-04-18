// -------------------------------------------------------------
// Component: LandingValueProps
// Purpose:
// - A single unified card containing the title, supporting text,
//   and three value proposition items.
// - Matches the wireframe: app-like, clean, neon-accented.
// -------------------------------------------------------------

import { Shield, MapPin, Users } from "lucide-react";
import ValuePropItem from "./ValuePropItem";

export default function LandingValueProps() {
  return (
    <section className="px-4 pt-12 pb-16">
      {/* Card container */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 max-w-md mx-auto space-y-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
        {/* Title */}
        <h2 className="section-title neon-cyan-title text-center">
          Your Campus, Your Crew, Your Peace of Mind
        </h2>

        {/* Supporting text (now part of the card, as per wireframe) */}
        <p className="text-gray-300 text-center leading-relaxed">
          Stay connected with trusted contacts, check in with friends, and feel
          confident knowing help is always within reach.
        </p>

        {/* Value items */}
        <div className="space-y-6">
          <ValuePropItem
            icon={Shield}
            title="Stay Protected"
            description="Quick access to safety tools and trusted contacts when you need it most."
            color="cyan"
          />

          <ValuePropItem
            icon={MapPin}
            title="Know Where You Are"
            description="Share your location with trusted friends and check in with a single tap."
            color="yellow"
          />

          <ValuePropItem
            icon={Users}
            title="Stay Connected"
            description="Build your trusted circle and keep everyone in the loop effortlessly."
            color="purple"
          />
        </div>
      </div>
    </section>
  );
}
