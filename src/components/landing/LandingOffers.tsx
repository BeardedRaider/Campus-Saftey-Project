// -------------------------------------------------------------
// Component: LandingOffers
// Purpose: Highlights student offers + campus updates.
// -------------------------------------------------------------

export default function LandingOffers() {
  return (
    <section className="pt-10 pb-12 px-4">
      {/* Section heading */}
      <h2 className="section-title text-center mb-2">
        What's Happening on Campus
      </h2>

      {/* Short description */}
      <p className="text-gray-300 text-center max-w-md mx-auto mb-8 leading-relaxed">
        Everything you need to make the most of student life.
      </p>

      {/* Offers card */}
      <div className="card p-5">
        {/* Card title */}
        <h3 className="text-lg font-semibold mb-2">Student Offers</h3>

        {/* Card description */}
        <p className="text-gray-300 text-sm leading-relaxed">
          Exclusive discounts and deals for campus safety services and student
          essentials.
        </p>
      </div>
    </section>
  );
}
