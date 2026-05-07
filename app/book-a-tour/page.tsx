import type { Metadata } from "next";
import Link from "next/link";
import BookTourForm from "@/components/book-tour/BookTourForm";
import ContactSection from "@/components/layout/ContactSection";

export const metadata: Metadata = {
  title: "Book a Tour | Kopila Day Care & Preschool",
  description:
    "Schedule a personal tour of Kopila Day Care in Hayward, CA. Meet Ms. B & Indra, see our space, and learn about our play-based approach.",
};

const expectCards = [
  {
    icon: "timer",
    title: "~30 Minute Visit",
    desc: "A relaxed, unhurried walkthrough so you can truly get a feel for our home and how we care for little ones.",
    bg: "bg-surface-container-low",
    color: "text-primary",
    iconBg: "bg-primary-fixed",
  },
  {
    icon: "diversity_1",
    title: "Meet Ms. B & Indra",
    desc: "Chat one-on-one with our lead teacher and co-caregiver. Ask anything — we love curious parents!",
    bg: "bg-surface-container",
    color: "text-secondary",
    iconBg: "bg-secondary-fixed",
  },
  {
    icon: "cottage",
    title: "See the Space",
    desc: "Explore our indoor play areas, outdoor garden, reading nook, and kitchen where Indra prepares fresh meals daily.",
    bg: "bg-surface-container-low",
    color: "text-tertiary",
    iconBg: "bg-tertiary-fixed",
  },
  {
    icon: "help",
    title: "Ask Questions",
    desc: "Enrollment, schedule, meals, curriculum — no question is too small. We want you to feel confident in your choice.",
    bg: "bg-surface-container",
    color: "text-primary",
    iconBg: "bg-primary-fixed",
  },
];

export default function BookATourPage() {
  return (
    <>
      {/* Hero Section */}
      <header className="relative pt-32 pb-16 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-handwritten text-6xl md:text-8xl font-bold text-secondary mb-4 leading-none">
              Book a Tour
            </h1>
            <p className="font-display text-primary text-3xl md:text-4xl mb-6">
              Come see where little flower buds bloom.
            </p>
            <div className="bg-surface-container-low p-8 rounded-xl border-l-8 border-secondary-container relative max-w-2xl">
              <span className="font-accent text-secondary text-xl absolute -top-4 -left-2 bg-surface px-4 py-1 rounded-full shadow-sm">
                What to know
              </span>
              <p className="text-on-surface-variant italic leading-relaxed text-lg mt-2">
                Tours are available Monday through Friday during morning and
                afternoon windows. Pick a date that works for you, choose a
                time, and we&apos;ll confirm your visit within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Icons */}
        <span
          className="material-symbols-outlined absolute top-20 right-12 text-[120px] text-primary/10 hidden lg:block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          calendar_month
        </span>
        <span
          className="material-symbols-outlined absolute bottom-8 right-48 text-[80px] text-secondary/10 hidden lg:block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          child_care
        </span>
        <span
          className="material-symbols-outlined absolute top-40 left-8 text-[60px] text-tertiary/8 hidden xl:block rotate-12"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          local_florist
        </span>
      </header>

      {/* Booking Form Section */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <BookTourForm />
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-handwritten text-5xl md:text-6xl text-secondary font-bold mb-4">
              What to Expect
            </h2>
            <p className="text-on-surface-variant font-reading text-lg max-w-2xl mx-auto">
              Your tour is a chance to experience the warmth of Kopila
              firsthand. Here&apos;s what a typical visit looks like.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expectCards.map((card, i) => (
              <div
                key={i}
                className={`${card.bg} p-8 rounded-xl group hover:shadow-lg transition-all duration-300`}
              >
                <div
                  className={`${card.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}
                >
                  <span
                    className={`material-symbols-outlined text-3xl ${card.color}`}
                  >
                    {card.icon}
                  </span>
                </div>
                <h3
                  className={`font-headline font-extrabold text-xl mb-3 ${card.color}`}
                >
                  {card.title}
                </h3>
                <p className="text-on-surface-variant font-reading leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact Fallback */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container-low p-10 md:p-14 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h3 className="font-display text-3xl md:text-4xl text-primary">
                Prefer to call?
              </h3>
              <p className="text-on-surface-variant font-reading text-lg leading-relaxed">
                If online booking isn&apos;t your thing, we totally understand.
                Give us a ring and we&apos;ll set up your visit over the phone.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-primary-fixed p-4 rounded-xl text-primary shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    call
                  </span>
                </div>
                <div>
                  <p className="font-reading font-bold text-secondary uppercase tracking-widest text-xs mb-1">
                    Phone Number
                  </p>
                  <a
                    href="tel:+15102826653"
                    className="text-2xl font-headline font-extrabold text-on-surface hover:text-primary transition-colors"
                  >
                    (510) 282-6653
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary-fixed p-4 rounded-xl text-primary shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    location_on
                  </span>
                </div>
                <div>
                  <p className="font-reading font-bold text-secondary uppercase tracking-widest text-xs mb-1">
                    Our Location
                  </p>
                  <p className="text-xl font-headline font-extrabold text-on-surface leading-tight">
                    17040 Esteban St,
                    <br />
                    Hayward, CA 94541
                  </p>
                  <a
                    className="inline-flex items-center mt-3 text-primary font-bold hover:underline gap-2 group/btn"
                    href="https://maps.google.com/?q=17040+Esteban+St+Hayward+CA+94541"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                    <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="h-72 rounded-lg overflow-hidden shadow-inner bg-surface-container-highest">
              <iframe
                src="https://maps.google.com/maps?q=17040+Esteban+St,+Hayward,+CA+94541&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kopila Day Care location - 17040 Esteban St, Hayward, CA 94541"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <ContactSection />
    </>
  );
}
