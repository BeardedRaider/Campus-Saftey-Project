// -------------------------------------------------------------
// Component: LandingCTA
// Purpose: Call-to-action card on the landing page,
//          encouraging users to register.
// -------------------------------------------------------------

import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export default function LandingCTA() {
  return (
    <section className="pt-10 pb-16 px-4 text-center relative">
      {/* Glow Pulse (behind the card) */}
      <div
        className="
          absolute inset-0 flex justify-center pointer-events-none
          animate-[pulseGlow_5s_ease-in-out_infinite]
        "
      >
        <div
          className="
            w-96 h-96 rounded-full 
            blur-[90px] opacity-35
            bg-cyan-400/60
          "
        />
      </div>

      {/* CTA Card */}
      <div className="card relative max-w-md mx-auto px-6 py-8">
        {/* CTA Icon (now purple) */}
        <Users
          className="
            w-12 h-12 mx-auto mb-4
            text-purple-300
            drop-shadow-[0_0_10px_rgba(179,136,255,0.8)]
          "
        />

        {/* CTA heading */}
        <h2 className="section-title mb-3">
          Ready to Join Your Campus Community?
        </h2>

        {/* Supporting text */}
        <p className="text-gray-300 leading-relaxed mb-8">
          Connect with trusted contacts, stay aware of your surroundings, and
          feel safer every day on campus.
        </p>

        {/* CTA Button (now purple) */}
        <Link
          to="/register"
          className="btn-base btn-purple inline-flex mx-auto"
        >
          Get Started
        </Link>
      </div>

      {/* Glow pulse animation */}
      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            50% { opacity: 0.55; transform: scale(1.15); }
          }
        `}
      </style>
    </section>
  );
}
