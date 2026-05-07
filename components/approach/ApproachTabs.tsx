"use client";

import { useState, useEffect, useRef } from "react";

const SLIDE_DURATION = 15000;

const tabs = [
  { id: "play", label: "Play First", icon: "sports_esports" },
  { id: "curriculum", label: "Curriculum", icon: "menu_book" },
  { id: "care", label: "Fresh Food & Loving Care", icon: "favorite" },
];

export default function ApproachTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);

  const goTo = (index: number) => {
    setActiveIndex(index);
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= SLIDE_DURATION) {
        setActiveIndex((prev) => (prev + 1) % tabs.length);
        startTimeRef.current = Date.now();
        setProgress(0);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex]);

  return (
    <section className="bg-surface-container-low py-24 px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => goTo(i)}
              className={`px-8 py-4 rounded-full font-bold hover:scale-95 transition-all flex items-center gap-2 ${
                activeIndex === i
                  ? "bg-primary-container text-on-primary-container shadow-md"
                  : "bg-surface-container-highest text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-xs h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Slide Content */}
        <div key={tabs[activeIndex].id}>
          {activeIndex === 0 && <PlayFirstContent />}
          {activeIndex === 1 && <CurriculumContent />}
          {activeIndex === 2 && <FreshFoodAndCareContent />}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {tabs.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeIndex === i
                  ? "bg-primary scale-125"
                  : "bg-surface-container-highest"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlayFirstContent() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="font-display text-primary text-4xl">
          Play First, Learn Forever
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          At Kopila, play isn&apos;t a break from learning — it <em>is</em>{" "}
          learning. Research shows that children develop critical cognitive,
          social, and emotional skills through unstructured and guided play. We
          design every corner of our space to spark imagination and discovery.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Sensory Exploration
              </span>
              <span className="text-sm">
                Sand, water, textures, and nature — hands-on discovery every
                day.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Imaginative Role-Play
              </span>
              <span className="text-sm">
                Dress-up corners and pretend kitchens build empathy and language
                skills.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Outdoor Adventures
              </span>
              <span className="text-sm">
                Our enclosed backyard offers climbing, gardening, and free
                movement.
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="rounded-xl bg-surface p-4 shadow-xl border-4 border-white transform rotate-1">
        <img
          className="rounded-lg w-full h-[350px] object-cover"
          alt="Children playing outdoors at daycare"
          src="/images/play9.jpg"
        />
      </div>
    </div>
  );
}

function CurriculumContent() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="font-display text-primary text-4xl">
          A Thoughtful Curriculum
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          Our curriculum is inspired by proven early childhood frameworks. We
          blend structured learning with child-led exploration so every child
          builds confidence, creativity, and kindergarten readiness at their own
          pace.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Early Literacy &amp; Phonics
              </span>
              <span className="text-sm">
                Letter recognition, storytelling, and a love of books.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Math &amp; Problem Solving
              </span>
              <span className="text-sm">
                Counting, sorting, patterns, and puzzles woven into daily play.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Science &amp; Nature
              </span>
              <span className="text-sm">
                Gardening, weather observation, and hands-on experiments.
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="rounded-xl bg-surface p-4 shadow-xl border-4 border-white transform -rotate-2">
        <img
          className="rounded-lg w-full h-[350px] object-cover"
          alt="Children engaged in a learning activity"
          src="/images/play7.jpg"
        />
      </div>
    </div>
  );
}

function FreshFoodAndCareContent() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Fresh Food */}
      <div className="space-y-6">
        <h2 className="font-display text-primary text-3xl">
          Fresh Food &amp; Healthy Meals
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          We believe physical growth is the foundation for intellectual
          curiosity. Our meals are prepared daily in-house using organic
          ingredients, ensuring every child has the energy they need to explore.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Indra&apos;s Secret Recipes
              </span>
              <span className="text-sm">
                Home-cooked goodness with zero processed sugars.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Farm-to-Table
              </span>
              <span className="text-sm">
                Seasonal fruits and vegetables sourced locally.
              </span>
            </div>
          </li>
        </ul>
      </div>

      {/* Loving Care */}
      <div className="space-y-6">
        <h2 className="font-display text-secondary text-3xl">
          Loving Care, Every Day
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          Above everything else, Kopila is a place of love. We keep our group
          small intentionally so every child gets individual attention, warm
          hugs, and the emotional safety they need to thrive.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-soft-rose bg-[#D28080]/20 p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Small Group, Big Heart
              </span>
              <span className="text-sm">
                Low child-to-caregiver ratio means no one gets lost in the crowd.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-soft-rose bg-[#D28080]/20 p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Daily Parent Updates
              </span>
              <span className="text-sm">
                Photos, notes, and open communication so you never miss a moment.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-soft-rose bg-[#D28080]/20 p-2 rounded-full">
              check_circle
            </span>
            <div>
              <span className="font-bold block text-primary">
                Emotional Safety
              </span>
              <span className="text-sm">
                We teach children to name their feelings and express themselves
                with confidence.
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
