export default function LandingValueProps() {
  return (
    <section className="px-6 py-10 text-center bg-[#0A0A0A]">
      <h2 className="text-2xl font-semibold text-white mb-3">
        Your Campus, Your Crew, Your Peace of Mind
      </h2>

      <p className="text-gray-400 max-w-md mx-auto mb-8">
        Stay connected with trusted contacts, check in with friends, and feel
        confident knowing help is always within reach.
      </p>

      {/* Icons Row */}
      <div className="flex items-center justify-center gap-8 text-3xl">
        <span className="drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">🛡️</span>
        <span className="drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">📍</span>
        <span className="drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">🤝</span>
      </div>
    </section>
  );
}
