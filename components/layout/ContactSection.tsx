"use client";

import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="py-24 bg-primary text-on-primary">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl mb-6">
              Ready to Visit?
            </h2>
            <p className="font-reading text-lg opacity-90">
              We&apos;d love to show you around our home and introduce you to
              our philosophy. Drop us a message or give us a call!
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined">phone</span>
              </div>
              <span className="font-bold text-xl">(510) 282-6653</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined">pin_drop</span>
              </div>
              <span className="font-bold text-xl">
                17040 Esteban St, Hayward, CA 94541
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <span className="block font-bold">Mon - Fri</span>
                <span className="opacity-80">7:30 AM - 5:30 PM</span>
              </div>
            </div>
          </div>

          <div className="h-64 rounded-lg overflow-hidden bg-surface-container shadow-inner">
            <img
              alt="Location Map"
              className="w-full h-full object-cover opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWTeh_LOQjSugYAt_R3a3usxT3fQ81ArCV7GEfNBjWYC1fdrX4-ZnIQCQgWXAP0fz8DWUQUs1ZvwofEQ8MncWyk9uoHVCMmKw-IDlLkBmRtxuGaQZFjNRthTiR4V0eh4QUWedKE76wNe3aDwrr_Q2FXbngp2PtqU96pKCco0pQhgH62AAHHpMO_iaY6Pt7QpY027HUbyIKYU4XeJf9Fx5F8mcbNCsSYBZRXMqAIPAaQ2wgjqbkV7IxR6ecNQI5pCJS-FzYSQ4RFlg"
            />
          </div>
        </div>

        <div className="bg-surface text-on-surface p-8 lg:p-12 rounded-lg shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label font-bold text-sm text-secondary">
                  Your Name
                </label>
                <input
                  className="w-full bg-surface-container-high border-none rounded-md focus:ring-2 focus:ring-primary-fixed"
                  placeholder="Full Name"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label font-bold text-sm text-secondary">
                  Email Address
                </label>
                <input
                  className="w-full bg-surface-container-high border-none rounded-md focus:ring-2 focus:ring-primary-fixed"
                  placeholder="email@example.com"
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label font-bold text-sm text-secondary">
                Child&apos;s Age
              </label>
              <select className="w-full bg-surface-container-high border-none rounded-md focus:ring-2 focus:ring-primary-fixed">
                <option>6 months - 1 year</option>
                <option>1 - 2 years</option>
                <option>2 - 4 years</option>
                <option>4 - 6 years</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-label font-bold text-sm text-secondary">
                Message
              </label>
              <textarea
                className="w-full bg-surface-container-high border-none rounded-md focus:ring-2 focus:ring-primary-fixed"
                placeholder="Tell us a bit about your needs..."
                rows={4}
              />
            </div>
            <button
              className="w-full bg-soft-rose text-white font-display py-4 rounded-full text-xl hover:scale-95 transition-all shadow-lg"
              type="submit"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
