import LandingHeader from "../components/landing/LandingHeader";
import LandingHero from "../components/landing/LandingHero";
import LandingValueProps from "../components/landing/LandingValueProps";
import LandingOffers from "../components/landing/LandingOffers";
import LandingCTA from "../components/landing/LandingCTA";
import LandingFooter from "../components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <LandingHeader />
      <LandingHero />
      <LandingValueProps />
      <LandingOffers />
      <LandingCTA />

      {/* Footer sits at the bottom */}
      <LandingFooter />
    </div>
  );
}
