// -------------------------------------------------------------
// Component: LandingValueProps
// Purpose: Unified card with title, text, and value props.
// -------------------------------------------------------------

import { Shield, MapPin, Users } from "lucide-react";
import ValuePropItem from "./ValuePropItem";

export default function LandingValueProps() {
  return (
    <div className="px-4">
      <div className="card max-w-md mx-auto space-y-5">
        <h2 className="section-title neon-cyan-title text-center">
          Your Campus, Your Crew, Your Peace of Mind
        </h2>

        <p className="text-gray-300 text-center leading-relaxed">
          Stay connected with trusted contacts, check in with friends, and feel
          confident knowing help is always within reach.
        </p>

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
    </div>
  );
}
