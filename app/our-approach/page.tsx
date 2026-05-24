import type { Metadata } from "next";
import Link from "next/link";
import ApproachTabs from "@/components/approach/ApproachTabs";

export const metadata: Metadata = {
  title: "Our Approach | Kopila Day Care & Preschool",
  description:
    "Learn about Kopila's play-based learning philosophy, daily routines, fresh meals, and curriculum focus areas.",
};

const routineCards = [
  {
    icon: "waving_hand",
    title: "Arrival",
    desc: "Greeting friends & independent free play.",
    bg: "bg-surface-container-low",
    hoverBg: "hover:bg-primary-container",
    color: "text-primary",
    hoverColor: "group-hover:text-on-primary-container",
  },
  {
    icon: "sunny",
    title: "Outdoor",
    desc: "Gross motor skills and nature discovery.",
    bg: "bg-surface-container",
    hoverBg: "hover:bg-secondary-container",
    color: "text-secondary",
    hoverColor: "group-hover:text-on-secondary-container",
  },
  {
    icon: "groups",
    title: "Circle Time",
    desc: "Stories, music, and group discussion.",
    bg: "bg-surface-container-low",
    hoverBg: "hover:bg-tertiary-container",
    color: "text-tertiary",
    hoverColor: "group-hover:text-on-tertiary-container",
  },
  {
    icon: "brush",
    title: "Arts & Labs",
    desc: "Creative expression and sensory experiments.",
    bg: "bg-surface-container",
    hoverBg: "hover:bg-primary-container",
    color: "text-primary",
    hoverColor: "group-hover:text-on-primary-container",
  },
  {
    icon: "bed",
    title: "Rest & Nap",
    desc: "Recharging bodies for the afternoon.",
    bg: "bg-surface-container-low",
    hoverBg: "hover:bg-secondary-container",
    color: "text-secondary",
    hoverColor: "group-hover:text-on-secondary-container",
  },
];

const menuItems = [
  { day: "Monday", meal: "Indra's Lentil Dahl with Steamed Veggies" },
  { day: "Tuesday", meal: "Whole Wheat Pasta & Homemade Pesto" },
  { day: "Wednesday", meal: "Quinoa Bowls with Roasted Sweet Potato" },
  { day: "Thursday", meal: "Mild Chickpea Curry & Brown Rice" },
];

export default function OurApproachPage() {
  return (
    <>
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2">
            <h1 className="font-handwritten text-6xl md:text-8xl font-bold text-secondary mb-4 leading-none">
              Our Approach
            </h1>
            <p className="font-display text-primary text-3xl md:text-4xl mb-6">
              Nurturing curiosity, one story at a time.
            </p>
            <div className="bg-surface-container-low p-8 rounded-xl border-l-8 border-secondary-container relative">
              <span className="font-accent text-secondary text-xl absolute -top-4 -left-2 bg-surface px-4 py-1 rounded-full shadow-sm">
                A note from Basanti
              </span>
              <p className="text-on-surface-variant italic leading-relaxed text-lg mb-4 mt-2">
                &ldquo;The early childhood period is a special time in a
                human&apos;s life. It is when the seeds of curiosity, empathy,
                and resilience are planted. At Kopila, we don&apos;t just
                &lsquo;watch&rsquo; children; we walk alongside them in their
                journey of discovery.&rdquo;
              </p>
              <cite className="text-primary font-bold not-italic">
                — Basanti M., Founder &amp; Director
              </cite>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="rounded-xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 bg-white p-3">
              <img
                className="rounded-lg w-full h-[450px] object-cover"
                alt="Preschool children sitting in a circle reading a storybook"
                src="/images/Play.webp"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Approach Tabs Section */}
      <ApproachTabs />

      {/* Our Day - Routine Section */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-handwritten text-6xl text-secondary font-bold mb-4">
              Our Day
            </h2>
            <p className="font-body text-on-surface-variant max-w-2xl mx-auto">
              A predictable rhythm creates a sense of safety and confidence for
              young explorers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {routineCards.map((card) => (
              <div
                key={card.title}
                className={`${card.bg} p-6 rounded-xl text-center group ${card.hoverBg} transition-colors`}
              >
                <span
                  className={`material-symbols-outlined text-4xl ${card.color} mb-4 block ${card.hoverColor}`}
                >
                  {card.icon}
                </span>
                <h3
                  className={`font-display ${card.color} mb-2 ${card.hoverColor}`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-sm text-on-surface-variant ${card.hoverColor}`}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's for Lunch - Indra's Kitchen */}
      <section className="py-24 px-8 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-fixed rounded-full opacity-30 blur-3xl" />
            <img
              className="rounded-xl shadow-2xl relative z-10 w-full object-cover h-[500px]"
              alt="Chef preparing fresh healthy vegetable bowls"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyeKlV60a5ugeT2Xnb_vugxDdG5brgi2Q-ZsBjyXJafpHa8HKm9ZrdIFsaGMHFc0Kbu4F_v2vwTGfn_W7hsZBDCXGUR8sPS-c-zo1gmIy__lQ0ICxjAXFVHsJoh59bPTS2ZrFGmDCshnsJrlZQosHTGODaEZ5s4ISnf6oyTcPQwhzPgl74TGWjqrrBsEKHXnKy--jrZowpU68Ih6-z3gdhCitS6enlsA1BTWOVuABobHhG_xbtkWdUsa6fpY94SO5LwUwLY0kaiiQ"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg z-20 max-w-xs transform rotate-2">
              <p className="font-accent text-secondary text-lg">
                &ldquo;Healthy tummies make for happy hearts!&rdquo;
              </p>
              <span className="block mt-2 font-bold text-primary">
                — Mr. Indra
              </span>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="font-display text-primary text-5xl mb-6">
              What&apos;s for Lunch?
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              Mr. Indra, our master of the kitchen, believes that every meal is
              an opportunity to teach children about colors, textures, and the
              joy of sharing. We avoid all processed foods and focus on
              nutrient-dense meals that children actually love.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.day}
                  className="bg-surface-container-high p-4 rounded-lg"
                >
                  <h4 className="font-bold text-primary">{item.day}</h4>
                  <p className="text-sm">{item.meal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learn Through Play - Philosophy */}
      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-secondary text-5xl mb-4">
              Learn Through Play
            </h2>
            <div className="h-1 w-24 bg-primary-container mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "directions_run",
                title: "Movement-Based",
                desc: "Cognitive development is tied to physical action. We dance, climb, and crawl to build neural pathways.",
                border: "border-primary",
                bg: "bg-primary-fixed",
                color: "text-primary",
              },
              {
                icon: "lightbulb",
                title: "Guided Play",
                desc: 'Our teachers set "learning provocations"—intentional setups that spark curiosity and problem-solving.',
                border: "border-secondary",
                bg: "bg-secondary-fixed",
                color: "text-secondary",
              },
              {
                icon: "child_care",
                title: "Free Play",
                desc: "Self-directed exploration where children learn negotiation, role-play, and internal focus.",
                border: "border-tertiary",
                bg: "bg-tertiary-fixed",
                color: "text-tertiary",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`bg-surface p-8 rounded-xl shadow-sm border-t-8 ${card.border} hover:-translate-y-2 transition-transform`}
              >
                <div
                  className={`w-16 h-16 ${card.bg} rounded-full flex items-center justify-center mb-6`}
                >
                  <span
                    className={`material-symbols-outlined ${card.color} text-3xl`}
                  >
                    {card.icon}
                  </span>
                </div>
                <h3 className={`font-display ${card.color} text-2xl mb-4`}>
                  {card.title}
                </h3>
                <p className="text-on-surface-variant">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Focus - Bento Grid Style */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-handwritten text-6xl text-primary font-bold text-center mb-16">
            Curriculum Focus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 bg-secondary-container rounded-xl p-8 flex flex-col justify-end relative overflow-hidden group">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
                alt="Children collaborating on a craft project"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGJA47vOCW4oR4_4K31YnNnolgRG4wR-x4N33RplbjsRcbhvLrXQlXLeFUH3AIisR786bozAc9olhLq7DlY3Xkp-D2ft2-Cf4_tFVr1t_36hi6GUSdYHQoLy-5ymMIiL34vpeRBURv812X4Ccd-vCGotIWSwczqH7nnYnLltIgfgFFoAloJm-_kh6GZo7SV9kNmj7a5c5CyHf0163w2T6HGL4BRIWoANvovQAMt12TeY49f4mxjh31mWU2adDDAbcvhfjJz59JNr0"
              />
              <div className="relative z-10">
                <span className="bg-white/80 px-4 py-1 rounded-full text-xs font-bold text-secondary uppercase tracking-widest mb-4 inline-block">
                  Core Pillar
                </span>
                <h3 className="font-display text-4xl text-on-secondary-container mb-2">
                  Social &amp; Emotional
                </h3>
                <p className="text-on-secondary-container/90">
                  Identifying feelings, building friendships, and learning the
                  beauty of empathy in a shared space.
                </p>
              </div>
            </div>

            <div className="bg-primary-container rounded-xl p-6 flex flex-col justify-center">
              <h3 className="font-display text-xl text-on-primary-container mb-1">
                Cognitive
              </h3>
              <p className="text-sm text-on-primary-container/80">
                Developing logic through puzzles, sorting, and scientific
                inquiry.
              </p>
            </div>

            <div className="bg-tertiary-fixed-dim rounded-xl p-6 flex flex-col justify-center">
              <h3 className="font-display text-xl text-on-tertiary-container mb-1">
                Language
              </h3>
              <p className="text-sm text-on-tertiary-container/80">
                Storytelling, vocabulary expansion, and expressive
                communication.
              </p>
            </div>

            <div className="bg-surface-container-highest rounded-xl p-6 flex flex-col justify-center">
              <h3 className="font-display text-xl text-primary mb-1">
                Physical
              </h3>
              <p className="text-sm text-on-surface-variant">
                Fine and gross motor skills developed through active daily play.
              </p>
            </div>

            <div className="bg-[#D28080]/20 rounded-xl p-6 flex flex-col justify-center border-2 border-[#D28080]/30">
              <h3 className="font-display text-xl text-[#835339] mb-1">
                Literacy
              </h3>
              <p className="text-sm text-[#835339]/80">
                The magic of books, phonics, and the early joy of recognizing
                letters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-24 px-8 overflow-hidden bg-primary-container/20">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-primary text-5xl mb-6">
            Ready to see our magic in person?
          </h2>
          <p className="text-on-surface-variant text-xl mb-10 leading-relaxed">
            We&apos;d love to show you our classrooms and introduce you to our
            wonderful team. Tours are available every Tuesday and Thursday
            morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-a-tour"
              className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-95 transition-all shadow-xl"
            >
              Book Your Visit
            </Link>
            <button className="bg-surface text-primary border-2 border-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-95 transition-all">
              Download Brochure
            </button>
          </div>
        </div>
        {/* Decorative SVG animal */}
        <div className="absolute -bottom-10 left-10 w-48 h-48 opacity-40">
          <img
            alt="Whimsical Giraffe"
            className="w-full h-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIIKjAkjpav1LfaJdJniq4Z0jUcB0V19jUe3tHqYs5h6Cv29icO4ywz23_n1W7eC-MGVrdKj75A6OhRmHGeUYsYQfL3bMJhQANcqQfnmI7KtgRqiW4ta9hAGiLRpz-Ya0cyYQBlZFLabs6HDMX1-rIgNGUYY0sv_2DhUFU9NB8IDZmq87EmqrseRwXqqd8JA54lQwsWttZvoUNaHg75j_OgrdwlRwz2qlaLroKjmu75ajof8IqY4sQ7J4aPhIDLeyXGwNJ3jv2NL0"
          />
        </div>
      </section>
    </>
  );
}
