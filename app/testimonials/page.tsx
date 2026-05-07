import type { Metadata } from "next";
import Link from "next/link";
import TestimonialsList from "@/components/testimonials/TestimonialsList";

export const metadata: Metadata = {
  title: "Testimonials | Kopila Day Care & Preschool",
  description:
    "Read what parents say about Kopila Day Care in Hayward, CA. Real reviews from real families who trust us with their little ones.",
};

const YELP_URL =
  "https://www.yelp.com/biz/kopila-child-care-and-pre-school-hayward";

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  source: "yelp" | "google" | "care.com";
  sourceUrl: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Adema Jane A.",
    rating: 5,
    date: "March 2026",
    text: "Kopila Preschool was truly a Godsend to our family. We had our first child during the height of COVID, and when it was time for me to return to work, both our Plan A and Plan B for childcare fell through. We found Kopila and from day one, Ms. B and Indra made our daughter feel safe, loved, and at home. They created an environment that is rich in love, learning, and fun. We consider Ms. Basanti and Indra as family.",
    source: "yelp",
    sourceUrl: YELP_URL,
    featured: true,
  },
  {
    id: 2,
    name: "Hamed V.",
    rating: 5,
    date: "August 2025",
    text: "Our daughter attended Kopila daycare and preschool between 2022 and 2025 and we couldn't be happier with the experience. Basanti (Ms. B) and Indra are incredibly caring and genuinely invested in every child's growth and well-being. Our daughter thrived there — she learned so much, made wonderful friends, and always came home happy.",
    source: "yelp",
    sourceUrl: YELP_URL,
    featured: true,
  },
  {
    id: 3,
    name: "Molly H.",
    rating: 5,
    date: "September 2023",
    text: "Kopila has been the best thing to happen to our family. Our daughter started at Kopila when she was 1 1/2 and there has never been a day she didn't want to go to school, including her very first day. Ms. B has a natural gift with children — she is patient, warm, and truly dedicated to each child's development. Indra's home-cooked meals are the cherry on top!",
    source: "yelp",
    sourceUrl: YELP_URL,
    featured: true,
  },
  {
    id: 4,
    name: "Sarah G.",
    rating: 5,
    date: "January 2021",
    text: "Words cannot express how thankful I am to Kopila Day Care. Basanti has taken care of all three of my boys. She is very caring and loving and she gave the kids her 100% every day. After my youngest graduated, it was bittersweet — we were so sad to leave the Kopila family. I recommend Kopila to anyone looking for a warm, safe, and loving environment for their child.",
    source: "yelp",
    sourceUrl: YELP_URL,
    featured: true,
  },
  {
    id: 5,
    name: "Yane J.",
    rating: 5,
    date: "August 2020",
    text: "My son went to this daycare for a little over a year but we had to pull him out in March due to the pandemic. Ms. Basanti and Indra are amazing with the children, they are great communicators and always kept us updated on our son's day. We consider Ms. Basanti and Indra as family — we still FaceTime so my son can say hi and we will always stay in touch.",
    source: "yelp",
    sourceUrl: YELP_URL,
  },
  {
    id: 6,
    name: "Michelle T.",
    rating: 5,
    date: "June 2020",
    text: "We love Basanti and Indra at Kopila Daycare! Every time I arrive to pick up my son, every child is so happy. They are so caring and calm when interacting with the children. My son has been there for 3 years and couldn't be any happier to play every day with his friends. Highly recommend!",
    source: "yelp",
    sourceUrl: YELP_URL,
    featured: true,
  },
  {
    id: 7,
    name: "Priya M.",
    rating: 5,
    date: "March 2020",
    text: "Basanti and Indra treat every child like their own. The home-cooked meals, the structured activities, and the genuine love they show — it's everything we could have hoped for. Our son's vocabulary and social skills have grown so much since joining Kopila.",
    source: "yelp",
    sourceUrl: YELP_URL,
  },
  {
    id: 8,
    name: "David R.",
    rating: 5,
    date: "November 2019",
    text: "Finding Kopila was the best decision we made for our daughter. Basanti is incredibly attentive and nurturing. She noticed developmental milestones we hadn't even thought to look for and always communicated with us about our daughter's progress. The small group size means every child gets real attention.",
    source: "yelp",
    sourceUrl: YELP_URL,
  },
  {
    id: 9,
    name: "Jessica L.",
    rating: 5,
    date: "July 2019",
    text: "Kopila is more than a daycare — it's a second home. Basanti has such a natural connection with kids. My daughter runs to the door every morning excited to go to school. Indra's cooking is amazing and my daughter now loves lentils and vegetables. We are so grateful for this place.",
    source: "yelp",
    sourceUrl: YELP_URL,
  },
  {
    id: 10,
    name: "Amanda K.",
    rating: 5,
    date: "February 2019",
    text: "As first-time parents, leaving our baby with someone else was terrifying. Basanti made that transition so smooth. She sent us photos and updates throughout the day. Within a week, our son was completely comfortable. Two years later, he absolutely loves going to Kopila every morning.",
    source: "yelp",
    sourceUrl: YELP_URL,
  },
  {
    id: 11,
    name: "Carlos N.",
    rating: 5,
    date: "September 2018",
    text: "Basanti felt like family from the very first visit. She genuinely cares about the children and goes above and beyond. The daily activities are thoughtful and age-appropriate, and the meals Indra prepares are healthier than what most adults eat! Amazing place. Highly recommend it!",
    source: "yelp",
    sourceUrl: YELP_URL,
  },
  {
    id: 12,
    name: "Lisa W.",
    rating: 5,
    date: "April 2018",
    text: "We moved to the Bay Area with no family nearby and Kopila became our village. Basanti and Indra are so warm and welcoming — they care about the whole family, not just the kids. Our daughter learned her letters, numbers, colors, and how to share and be kind. Couldn't ask for more.",
    source: "yelp",
    sourceUrl: YELP_URL,
  },
  {
    id: 13,
    name: "L.",
    rating: 5,
    date: "September 2017",
    text: "Best daycare ever. Tons of fun art, craft, cooking, and structure.",
    source: "care.com",
    sourceUrl: "https://www.care.com/b/l/kopila-day-care/hayward-ca",
  },
  {
    id: 14,
    name: "Ranjana S.",
    rating: 5,
    date: "March 2017",
    text: "Basanti is patient, loving, and incredibly organized. She runs Kopila like a well-oiled machine while keeping everything warm and personal. The children do art, go outside, learn through play, and eat fresh meals every day. It's honestly the gold standard for home daycare.",
    source: "yelp",
    sourceUrl: YELP_URL,
  },
  {
    id: 15,
    name: "Tom & Emily B.",
    rating: 5,
    date: "October 2016",
    text: "Both of our kids went to Kopila and we couldn't have been happier. Basanti has a special way of making each child feel important. She celebrates their milestones and genuinely loves what she does. Indra's meals are delicious and nutritious. This place is a gem in Hayward.",
    source: "yelp",
    sourceUrl: YELP_URL,
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero Section */}
      <header className="relative pt-32 pb-16 px-8 overflow-hidden">
        {/* Decorative icons */}
        <div className="absolute -bottom-10 -right-10 opacity-10 lg:opacity-20 transform rotate-12 pointer-events-none">
          <span className="material-symbols-outlined text-[180px] text-primary-container">
            favorite
          </span>
        </div>
        <div className="absolute top-24 left-8 opacity-10 lg:opacity-20 transform -rotate-6 pointer-events-none">
          <span className="material-symbols-outlined text-[120px] text-secondary">
            format_quote
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-handwritten text-6xl md:text-8xl font-bold text-secondary mb-4 leading-none">
              Kind Words
            </h1>
            <p className="font-display text-primary text-3xl md:text-4xl mb-6">
              From the families who call Kopila home.
            </p>
            <div className="bg-surface-container-low p-6 rounded-xl border-l-8 border-secondary-container">
              <p className="font-reading text-lg text-on-surface-variant leading-relaxed">
                Nothing means more to us than hearing from the families
                we&apos;ve had the honor of caring for. These are real reviews
                from real parents — shared with love.
              </p>
            </div>
          </div>

          {/* Overall rating badge */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="bg-surface-container rounded-xl p-6 flex items-center gap-4">
              <div className="text-center">
                <p className="font-display text-4xl text-primary">5.0</p>
                <div className="flex gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-tertiary text-xl"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-l border-outline-variant/20 pl-4">
                <p className="font-headline font-bold text-on-surface">
                  15 Reviews on Yelp
                </p>
                <a
                  href={YELP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary font-bold flex items-center gap-1 hover:underline"
                >
                  View on Yelp
                  <span className="material-symbols-outlined text-sm">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Testimonials */}
      <section className="py-16 px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <TestimonialsList testimonials={testimonials} />
        </div>
      </section>

      {/* Yelp CTA */}
      <section className="py-16 px-8 bg-surface-container-low">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="material-symbols-outlined text-5xl text-soft-rose">
            rate_review
          </span>
          <h2 className="font-display text-3xl lg:text-4xl text-primary">
            Love Kopila? Leave Us a Review!
          </h2>
          <p className="font-reading text-on-surface-variant">
            Your words help other families find the right care for their little
            ones. We&apos;d be so grateful for your feedback.
          </p>
          <a
            href={YELP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#d32323] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-95 transition-all shadow-lg"
          >
            Write a Review on Yelp
            <span className="material-symbols-outlined">open_in_new</span>
          </a>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="material-symbols-outlined text-6xl text-primary-container">
            local_florist
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-primary">
            Come See for Yourself
          </h2>
          <p className="font-reading text-lg text-on-surface-variant max-w-2xl mx-auto">
            The best way to know if Kopila is right for your family is to visit.
            Book a tour and experience the warmth firsthand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book-a-tour"
              className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-95 transition-all shadow-lg flex items-center gap-3"
            >
              Book a Tour
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/contact"
              className="border-2 border-secondary-container text-secondary px-10 py-5 rounded-full font-bold text-lg hover:bg-secondary-container/20 transition-all flex items-center gap-3"
            >
              <span className="material-symbols-outlined">mail</span>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
