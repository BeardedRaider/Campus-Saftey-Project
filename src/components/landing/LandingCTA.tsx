// -------------------------------------------------------------
// Component: LandingCTA
// Purpose: Final call-to-action card on the landing page.
// -------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export default function LandingCTA() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setVisible(true), 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="px-4 text-center relative">
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

      <div
        ref={cardRef}
        className={`
          card relative max-w-md mx-auto px-6 py-6
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
        `}
      >
        <Users
          className="
            w-12 h-12 mx-auto mb-4
            text-purple-300
            drop-shadow-[0_0_10px_rgba(179,136,255,0.8)]
          "
        />

        <h2 className="section-title mb-3">
          Ready to Join Your Campus Community?
        </h2>

        <p className="text-gray-300 leading-relaxed mb-6">
          Connect with trusted contacts, stay aware of your surroundings, and
          feel safer every day on campus.
        </p>

        <Link
          to="/register"
          className="btn-base btn-purple inline-flex mx-auto"
        >
          Get Started
        </Link>
      </div>

      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            50% { opacity: 0.55; transform: scale(1.15); }
          }
        `}
      </style>
    </div>
  );
}
