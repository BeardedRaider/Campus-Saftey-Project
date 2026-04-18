// -------------------------------------------------------------
// Page: Landing Page
// Purpose: Public-facing marketing page before login/signup.
// -------------------------------------------------------------

import LandingHeader from "../components/landing/LandingHeader";
import LandingHero from "../components/landing/LandingHero";
import LandingValueProps from "../components/landing/LandingValueProps";
import LandingOffers from "../components/landing/LandingOffers";
import LandingCTA from "../components/landing/LandingCTA";
import LandingFooter from "../components/landing/LandingFooter";
import Section from "../components/landing/Section";

export default function LandingPage() {
  return (
    <div className="page-bg min-h-screen flex justify-center">
      <div className="w-full max-w-160 px-4 pb-10">
        <main>
          <LandingHeader />

          {/* ONE global section wrapper */}
          <Section>
          <div className="space-y-10">            <LandingHero />
            <LandingValueProps />
            <LandingOffers />
            <LandingCTA />
            <LandingFooter />
          </div>
          </Section>
        </main>
      </div>
    </div>
  );
}
