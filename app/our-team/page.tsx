import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meet Our Team | Kopila Day Care & Preschool",
  description:
    "Get to know Basanti and Indra — the dedicated caregivers who bring warmth, learning, and joy to every child's day at Kopila.",
};

export default function OurTeamPage() {
  return (
    <>
      {/* Hero Header Band */}
      <section className="relative bg-primary py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        {/* Whimsical SVG Elements */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary-container rounded-full blur-3xl opacity-30" />
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary-container rounded-full blur-3xl opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <h1 className="font-handwritten text-6xl md:text-8xl text-surface-container-low font-bold tracking-wider leading-none">
            Meet Our Team
          </h1>
          <p className="font-reading text-lg md:text-xl text-surface-container-low/90 max-w-2xl mx-auto">
            Get to know the dedicated caregivers who bring warmth, learning, and
            joy to every child&apos;s day at Kopila.
          </p>
        </div>
      </section>

      {/* Team Story Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Basanti Card */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary-fixed rounded-xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-primary-container shadow-inner bg-surface-container-high">
                  <img
                    alt="Basanti M. Lead Teacher"
                    className="w-full h-full object-cover"
                    src="/images/basanti.jpg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="font-display text-4xl text-primary">
                      Basanti M.
                    </h2>
                    <p className="font-accent text-secondary text-xl">
                      Owner + Lead Teacher
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold rounded-full uppercase tracking-tighter">
                      15+ YRS Experience
                    </span>
                    <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold rounded-full uppercase tracking-tighter">
                      Special Needs
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-reading text-on-surface-variant leading-relaxed text-lg">
                With over 15 years of dedicated experience in early childhood
                development, Basanti is the heart of Kopila. Her specialized
                work with children with special needs ensures that our
                environment is truly inclusive, sensory-friendly, and nurturing
                for every unique learner.
              </p>
              <div className="pt-4 flex items-center gap-4 text-primary">
                <span className="material-symbols-outlined">child_care</span>
                <span className="font-bold font-label">
                  Early Childhood Development Expert
                </span>
              </div>
            </div>
          </div>

          {/* Indra Card */}
          <div className="relative group lg:mt-24">
            <div className="absolute -inset-4 bg-secondary-fixed rounded-xl rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-secondary-container shadow-inner bg-surface-container-high">
                  <img
                    alt="Indra Co-Caregiver"
                    className="w-full h-full object-cover"
                    src="/images/indra.jpg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="font-display text-4xl text-secondary">
                      Indra
                    </h2>
                    <p className="font-accent text-primary text-xl">
                      Co-Caregiver &amp; Chef
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold rounded-full uppercase tracking-tighter">
                      Nutritionist
                    </span>
                    <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold rounded-full uppercase tracking-tighter">
                      Gentle Care
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-reading text-on-surface-variant leading-relaxed text-lg">
                Indra brings a calming presence and a passion for wholesome
                nutrition to our home. Every day, he prepares healthy,
                home-cooked meals that nourish the body while creating a
                peaceful, family-like atmosphere where children feel safe and
                cherished.
              </p>
              <div className="pt-4 flex items-center gap-4 text-secondary">
                <span className="material-symbols-outlined">restaurant</span>
                <span className="font-bold font-label">
                  Healthy Home-Cooked Meals
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whimsical Bento Grid for Philosophy */}
      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <h3 className="font-handwritten text-5xl text-primary">
              Our Shared Philosophy
            </h3>
            <p className="font-reading text-on-surface-variant">
              What makes our team special
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-lg shadow-sm flex flex-col items-center text-center space-y-4">
              <span className="material-symbols-outlined text-5xl text-primary">
                favorite
              </span>
              <h4 className="font-display text-xl text-on-surface">
                Patience First
              </h4>
              <p className="font-reading text-sm opacity-80">
                We believe every milestone happens at its own beautiful pace.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg shadow-sm flex flex-col items-center text-center space-y-4 md:translate-y-8">
              <span className="material-symbols-outlined text-5xl text-secondary">
                menu_book
              </span>
              <h4 className="font-display text-xl text-on-surface">
                Curiosity Driven
              </h4>
              <p className="font-reading text-sm opacity-80">
                Our caregivers are co-explorers in your child&apos;s journey of
                discovery.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg shadow-sm flex flex-col items-center text-center space-y-4">
              <span className="material-symbols-outlined text-5xl text-tertiary-container">
                eco
              </span>
              <h4 className="font-display text-xl text-on-surface">
                Natural Growth
              </h4>
              <p className="font-reading text-sm opacity-80">
                Focusing on organic development through play and social
                interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 text-center relative overflow-hidden">
        {/* Decorative Scalloped Top */}
        <div className="absolute top-0 left-0 w-full h-8 bg-surface-container-low scalloped-divider" />
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="font-display text-5xl md:text-6xl text-primary leading-tight">
            Ready to come meet us?
          </h2>
          <p className="font-reading text-xl text-on-surface-variant">
            We&apos;d love to show you around our space and introduce you to our
            family in person.
          </p>
          <div className="pt-4 flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/book-a-tour"
              className="px-10 py-5 bg-gradient-to-r from-primary to-primary-container text-white font-bold text-lg rounded-full shadow-xl hover:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Book a Tour
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 border-2 border-secondary text-secondary font-bold text-lg rounded-full hover:bg-secondary hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
        {/* Floating Whimsical Graphic */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-10 pointer-events-none">
          <div className="h-32 bg-primary-fixed rounded-t-full" />
        </div>
      </section>
    </>
  );
}
