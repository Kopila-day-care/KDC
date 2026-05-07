import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero Section */}
      <section className="relative min-h-[921px] flex items-center overflow-hidden px-8 lg:px-16 py-12">
        {/* Decorative Animal Illustrations (Asymmetric) */}
        <div className="absolute -bottom-10 -left-10 opacity-20 lg:opacity-100 transform -rotate-12 pointer-events-none">
          <span className="material-symbols-outlined text-[200px] text-primary-container">
            pets
          </span>
        </div>
        <div className="absolute top-20 right-10 opacity-10 lg:opacity-30 transform rotate-12 pointer-events-none">
          <span className="material-symbols-outlined text-[150px] text-secondary">
            owl
          </span>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="font-display text-5xl lg:text-7xl text-primary leading-tight uppercase tracking-tight">
              KOPILA CHILDCARE AND PRESCHOOL
            </h1>
            <p className="font-accent text-3xl text-secondary lg:text-4xl italic">
              Providing Licensed care in Hayward for ages 6mo-6yrs
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book-a-tour"
                className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-95 transition-all shadow-lg flex items-center gap-3"
              >
                Book a Tour!
                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </Link>
              <a
                href="tel:5102826653"
                className="border-2 border-secondary-container text-secondary px-10 py-5 rounded-full font-bold text-lg hover:bg-secondary-container/20 transition-all flex items-center gap-3"
              >
                <span className="material-symbols-outlined">call</span>
                Call Us
              </a>
            </div>
            <p className="font-headline font-extrabold text-xl text-on-surface-variant flex items-center gap-3">
              <span className="w-12 h-1 bg-primary-container rounded-full" />
              Helping you raise happy, healthy, and curious kids
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 bg-surface-container">
              <img
                alt="Children Learning"
                className="w-full h-full object-cover"
                src="/images/HomePlay.webp"
              />
            </div>
            {/* Small overlapping floating images */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-lg overflow-hidden border-8 border-surface shadow-xl -rotate-6 hidden md:block">
              <img
                alt="Child Playing"
                className="w-full h-full object-cover"
                src="/images/Play3.jpg"
              />
            </div>
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-lg overflow-hidden border-8 border-surface shadow-xl rotate-12 hidden md:block">
              <img
                alt="Gardening"
                className="w-full h-full object-cover"
                src="/images/play4.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Fresh Healthy Meals */}
      <section className="bg-surface-container-low py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
          <span className="material-symbols-outlined text-primary-container text-6xl mb-4">
            restaurant
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-8">
            Fresh, Healthy Meals (Made Daily)
          </h2>
          <div className="bg-surface p-8 lg:p-12 rounded-lg shadow-sm max-w-3xl mx-auto border-t-4 border-primary-container">
            <p className="font-reading text-lg leading-relaxed text-on-surface-variant mb-6">
              At Kopila, nutrition is the heartbeat of our day. Mr. Indra, our
              dedicated chef and caregiver, prepares home-style meals that are as
              nutritious as they are delicious. We use fresh ingredients to fuel
              growing minds and bodies, ensuring every child develops a love for
              healthy eating from an early age.
            </p>
            <div className="flex items-center justify-center gap-2 font-accent text-2xl text-soft-rose">
              <span className="material-symbols-outlined">favorite</span>
              Hand-cooked with love by Mr. Indra
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Curriculum (Bento-ish Grid) */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">
                Our Curriculum
              </h2>
              <p className="font-reading text-lg text-on-surface-variant">
                Our holistic approach ensures your child blossoms in every
                dimension. We blend play-based learning with structured
                developmental milestones.
              </p>
            </div>
            <Link
              href="/our-approach"
              className="font-label font-bold text-soft-rose flex items-center gap-2 hover:underline"
            >
              Learn more about our approach
              <span className="material-symbols-outlined">
                arrow_right_alt
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Curriculum Focus */}
            <div className="md:col-span-2 bg-primary-fixed/30 p-10 rounded-lg relative overflow-hidden">
              <div className="absolute top-4 right-4 text-primary/10">
                <span className="material-symbols-outlined text-9xl">
                  cognition
                </span>
              </div>
              <h3 className="font-display text-2xl text-on-primary-fixed-variant mb-6">
                Core Focus Areas
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {[
                  { icon: "groups", title: "Social/Emotional", desc: "Developing empathy and collaboration." },
                  { icon: "lightbulb", title: "Cognitive", desc: "Critical thinking and problem solving." },
                  { icon: "forum", title: "Language", desc: "Communication and self-expression." },
                  { icon: "directions_run", title: "Physical", desc: "Gross and fine motor skill building." },
                  { icon: "menu_book", title: "Literacy", desc: "The magic of stories and phonics." },
                  { icon: "school", title: "Kindergarten Prep", desc: "Ready for the big next step." },
                ].map((item) => (
                  <div key={item.icon} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">
                      {item.icon}
                    </span>
                    <div>
                      <span className="font-bold block">{item.title}</span>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities List */}
            <div className="bg-secondary-fixed p-10 rounded-lg">
              <h3 className="font-display text-2xl text-on-secondary-fixed-variant mb-6">
                Daily Activities
              </h3>
              <ul className="space-y-4 font-reading font-bold text-on-secondary-container">
                {[
                  "Indoor & Outdoor Exploration",
                  "Sensory & Nature Play",
                  "Interactive Storytelling",
                  "Music & Movement",
                  "Arts, Crafts & Expression",
                ].map((activity) => (
                  <li key={activity} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-soft-rose" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Team */}
      <section className="py-24 bg-surface-container overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">
              Our Team
            </h2>
            <p className="font-handwritten text-3xl text-secondary">
              A family caring for your family
            </p>
          </div>

          <div className="flex overflow-x-auto pb-12 gap-8 snap-x no-scrollbar">
            {/* Basanti */}
            <div className="min-w-[320px] md:min-w-[450px] snap-center bg-surface p-8 rounded-lg shadow-sm border-b-8 border-primary relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-fixed border-4 border-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-4xl">
                  star
                </span>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-variant">
                  <img
                    alt="Basanti"
                    className="w-full h-full object-cover"
                    src="/images/basanti.jpg"
                  />
                </div>
                <div>
                  <h4 className="font-display text-2xl text-primary">
                    Basanti
                  </h4>
                  <p className="font-label text-secondary font-bold">
                    Owner / Lead Teacher
                  </p>
                </div>
              </div>
              <p className="font-reading text-on-surface-variant italic mb-6">
                &ldquo;My goal is to create a space where every child feels
                seen, loved, and encouraged to explore the world around
                them.&rdquo;
              </p>
              <Link
                href="/our-team"
                className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
              >
                Meet Basanti{" "}
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>

            {/* Indra */}
            <div className="min-w-[320px] md:min-w-[450px] snap-center bg-surface p-8 rounded-lg shadow-sm border-b-8 border-secondary relative">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-variant">
                  <img
                    alt="Indra"
                    className="w-full h-full object-cover"
                    src="/images/indra.jpg"
                  />
                </div>
                <div>
                  <h4 className="font-display text-2xl text-secondary">
                    Indra
                  </h4>
                  <p className="font-label text-primary font-bold">
                    Chef / Caregiver
                  </p>
                </div>
              </div>
              <p className="font-reading text-on-surface-variant italic mb-6">
                &ldquo;Healthy food is the foundation of a healthy life. I take
                pride in crafting menus that spark joy and curiosity at the lunch
                table.&rdquo;
              </p>
              <Link
                href="/our-team"
                className="text-secondary font-bold flex items-center gap-1 hover:gap-2 transition-all"
              >
                Meet Indra{" "}
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: A Nurturing Home for Learning */}
      <section className="py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden -rotate-2">
                <img
                  alt="Indoor Play Area"
                  className="w-full h-full object-cover"
                  src="/images/play6.jpg"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden translate-y-8 rotate-3">
                <img
                  alt="Nap Room"
                  className="w-full h-full object-cover"
                  src="/images/play5.jpg"
                />
              </div>
              <div className="col-span-2 aspect-[16/9] rounded-lg overflow-hidden -mt-4 shadow-xl">
                <img
                  alt="Backyard Play"
                  className="w-full h-full object-cover"
                  src="/images/Play2.webp"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="font-display text-4xl lg:text-5xl text-primary leading-tight">
              A Nurturing Home for Learning
            </h2>
            <p className="font-reading text-lg text-on-surface-variant">
              Our facility is designed to feel like a second home. From cozy nap
              corners to vibrant activity zones, every inch of Kopila is crafted
              for safety, comfort, and discovery.
            </p>
            <ul className="space-y-6">
              {[
                {
                  icon: "toys",
                  title: "Safe Indoor Play Area",
                  desc: "Stimulating toys and safe surfaces for rainy-day fun.",
                  bg: "bg-primary-fixed",
                  iconColor: "text-primary",
                },
                {
                  icon: "bed",
                  title: "Peaceful Nap Room",
                  desc: "A quiet, climate-controlled space for essential rest.",
                  bg: "bg-secondary-fixed",
                  iconColor: "text-secondary",
                },
                {
                  icon: "park",
                  title: "Enclosed Backyard",
                  desc: "Secure outdoor space for gardening and gross motor play.",
                  bg: "bg-tertiary-fixed",
                  iconColor: "text-tertiary",
                },
              ].map((item) => (
                <li key={item.icon} className="flex gap-4 items-start">
                  <div
                    className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}
                  >
                    <span
                      className={`material-symbols-outlined ${item.iconColor}`}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">{item.title}</h5>
                    <p className="text-on-surface-variant">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Safety & Licensing */}
      <section className="py-24 bg-surface-container-high relative">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface mb-8 shadow-sm">
            <span
              className="material-symbols-outlined text-primary text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
          </div>
          <h2 className="font-display text-4xl text-primary mb-6">
            Safety &amp; Licensing
          </h2>
          <div className="font-reading text-lg text-on-surface-variant space-y-4 max-w-2xl mx-auto">
            <p>
              Established in 2014, Kopila Day Care &amp; Preschool is a fully
              licensed, home-based facility in Hayward, California.
            </p>
            <p>
              We adhere to the highest state safety standards, ensuring a secure
              environment where parents can have absolute peace of mind while
              their children grow.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="py-24 bg-surface overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-16 scalloped-divider rotate-180" />
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">
              What Parents Are Saying
            </h2>
            <p className="font-handwritten text-3xl text-soft-rose">
              Kind words from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-surface-container-low p-12 rounded-lg relative">
              <span className="material-symbols-outlined text-primary-container text-6xl absolute -top-6 left-6 opacity-40">
                format_quote
              </span>
              <p className="font-accent text-2xl text-secondary leading-relaxed mb-8">
                &ldquo;Kopila has been a second home for my daughter.
                Basanti&apos;s patience and the educational activities have
                prepared her so well for kindergarten!&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-container" />
                <span className="font-bold text-primary">
                  &mdash; Sarah J., Hayward Parent
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low p-12 rounded-lg relative">
              <span className="material-symbols-outlined text-primary-container text-6xl absolute -top-6 left-6 opacity-40">
                format_quote
              </span>
              <p className="font-accent text-2xl text-secondary leading-relaxed mb-8">
                &ldquo;We love the healthy meals Indra cooks! It&apos;s such a
                relief knowing our son is eating fresh, nutritious food every
                single day.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container" />
                <span className="font-bold text-secondary">
                  &mdash; Michael R., Local Dad
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 font-display text-primary hover:text-soft-rose transition-colors text-xl"
            >
              View more testimonials
              <span className="material-symbols-outlined">star</span>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
