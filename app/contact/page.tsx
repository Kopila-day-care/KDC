import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Kopila Day Care & Preschool",
  description:
    "Get in touch with Kopila Day Care in Hayward, CA. Call (510) 282-6653, email us, or send a message to schedule a visit.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <header className="mb-20 text-center relative">
        <h1 className="font-handwritten text-6xl md:text-8xl font-bold text-secondary-container mb-4">
          Ready to Visit?
        </h1>
        <p className="text-on-surface-variant text-xl max-w-2xl mx-auto leading-relaxed italic">
          We currently have limited openings for new little explorers. Come see
          how we create a magical world of learning every day.
        </p>
        {/* Decorative SVG Element */}
        <div className="absolute -top-12 -left-4 opacity-20 hidden lg:block">
          <span className="material-symbols-outlined text-8xl text-primary">
            cloud
          </span>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Details & Map */}
        <div className="lg:col-span-5 space-y-8">
          {/* Contact Info Card */}
          <section className="bg-surface-container-low p-10 rounded-lg relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-primary-fixed p-4 rounded-xl text-primary shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    call
                  </span>
                </div>
                <div>
                  <h3 className="font-reading font-bold text-secondary uppercase tracking-widest text-xs mb-1">
                    Phone Number
                  </h3>
                  <p className="text-2xl font-headline font-extrabold text-on-surface">
                    (510) 282-6653
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-primary-fixed p-4 rounded-xl text-primary shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    mail
                  </span>
                </div>
                <div>
                  <h3 className="font-reading font-bold text-secondary uppercase tracking-widest text-xs mb-1">
                    Email Address
                  </h3>
                  <p className="text-2xl font-headline font-extrabold text-on-surface">
                    kopiladcc@yahoo.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-primary-fixed p-4 rounded-xl text-primary shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    location_on
                  </span>
                </div>
                <div>
                  <h3 className="font-reading font-bold text-secondary uppercase tracking-widest text-xs mb-1">
                    Our Location
                  </h3>
                  <p className="text-xl font-headline font-extrabold text-on-surface leading-tight">
                    17040 Esteban St,
                    <br />
                    Hayward, CA 94541
                  </p>
                  <a
                    className="inline-flex items-center mt-4 text-primary font-bold hover:underline gap-2 group/btn"
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
          </section>

          {/* Hours of Operation Card */}
          <section className="bg-surface-container-high p-10 rounded-lg border-l-8 border-primary-container">
            <h2 className="font-display text-3xl text-primary mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                schedule
              </span>
              Our Hours
            </h2>
            <ul className="space-y-4 font-reading font-semibold">
              <li className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                <span className="text-on-surface-variant">Mon - Fri</span>
                <span className="text-on-surface">7:30 AM – 5:30 PM</span>
              </li>
              <li className="flex justify-between items-center py-2 opacity-60">
                <span className="text-on-surface-variant">Sat - Sun</span>
                <span className="text-error">Closed</span>
              </li>
            </ul>
          </section>

          {/* Map Widget */}
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

        {/* Right Column: Contact Form & Illustrations */}
        <div className="lg:col-span-7 space-y-8">
          {/* Action Buttons & Illustrations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-secondary-fixed p-8 rounded-lg relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <Link
                href="/book-a-tour"
                className="w-full bg-primary text-on-primary py-4 rounded-full font-bold text-lg hover:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                Book a Tour!
              </Link>
            </div>
            <div className="flex justify-center md:justify-end items-end h-40 relative">
              {/* Abstract Animal Representation with Icons */}
              <div className="flex gap-4 items-end">
                <div className="w-24 h-32 bg-primary-container rounded-t-full relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-on-primary-container">
                    emoji_nature
                  </span>
                </div>
                <div className="w-20 h-24 bg-tertiary-fixed-dim rounded-t-full relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-on-tertiary-fixed-variant">
                    pets
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Container */}
          <ContactForm />
        </div>
      </div>

      {/* Street View 360° — Full Width */}
      <section className="mt-16 bg-surface-container-low p-8 lg:p-12 rounded-lg space-y-6 text-center">
        <h3 className="font-display text-4xl text-primary flex items-center justify-center gap-3">
          <span
            className="material-symbols-outlined text-primary text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            streetview
          </span>
          Take a Virtual Walk Around Our Neighbourhood
        </h3>
        <p className="text-on-surface-variant font-reading text-lg max-w-2xl mx-auto">
          Explore the quiet, family-friendly street where Kopila calls home
        </p>
        <div className="h-[500px] rounded-lg overflow-hidden shadow-inner bg-surface-container-highest">
          <iframe
            src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sus!4v1700000000!6m8!1m7!1sRnZE6UemxRBnAeTxM8xbjg!2m2!1d37.6919934!2d-122.1045233!3f27.81!4f14.07!5f0.7820865974627469"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="360° street view of Kopila Day Care neighbourhood"
          />
        </div>
      </section>
    </div>
  );
}
