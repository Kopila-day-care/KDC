"use client";

import { useState, useMemo, useCallback } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0=Sun
}

function formatDateISO(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatTime(t: string) {
  // "09:00" → "9:00 AM", "14:30" → "2:30 PM"
  const [hStr, mStr] = t.split(":");
  let h = parseInt(hStr, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${mStr} ${suffix}`;
}

function formatDateReadable(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Slot = {
  start_time: string;
  end_time: string;
  available: boolean;
};

// ── Step Indicator ───────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  const steps = [
    { num: 1, label: "Pick a Date", icon: "calendar_today" },
    { num: 2, label: "Choose a Time", icon: "schedule" },
    { num: 3, label: "Your Details", icon: "person" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
      {steps.map((step, i) => {
        const isActive = current >= step.num;
        const isCurrent = current === step.num;
        return (
          <div key={step.num} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-on-primary shadow-lg"
                    : "bg-surface-container-high text-on-surface-variant"
                } ${isCurrent ? "ring-4 ring-primary-fixed scale-110" : ""}`}
              >
                <span className="material-symbols-outlined text-xl md:text-2xl">
                  {isActive && current > step.num ? "check" : step.icon}
                </span>
              </div>
              <span
                className={`hidden sm:block font-label font-bold text-sm transition-colors ${
                  isActive ? "text-primary" : "text-on-surface-variant/60"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 md:w-16 h-0.5 rounded-full transition-colors duration-300 ${
                  current > step.num
                    ? "bg-primary"
                    : "bg-surface-container-high"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Calendar ─────────────────────────────────────────────────────────────

function Calendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: string | null;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const todayISO = formatDateISO(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const blanks = useMemo(() => Array.from({ length: firstDay }), [firstDay]);
  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth]
  );

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function isDisabled(day: number) {
    const iso = formatDateISO(viewYear, viewMonth, day);
    const d = new Date(viewYear, viewMonth, day);
    const dayOfWeek = d.getDay();
    // Disable past dates
    if (iso < todayISO) return true;
    // Disable weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;
    return false;
  }

  // Prevent navigating to months before current
  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="bg-surface-container rounded-xl p-6">
      {/* Month Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h3 className="font-headline font-extrabold text-xl text-on-surface">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h3>
        <button
          type="button"
          onClick={nextMonth}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors"
          aria-label="Next month"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center font-label font-bold text-xs text-on-surface-variant/60 py-2"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const iso = formatDateISO(viewYear, viewMonth, day);
          const disabled = isDisabled(day);
          const isSelected = selectedDate === iso;
          const isToday = iso === todayISO;

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`
                w-full aspect-square rounded-full flex items-center justify-center
                text-sm font-bold transition-all duration-200
                ${
                  isSelected
                    ? "bg-primary text-on-primary shadow-lg scale-110"
                    : disabled
                      ? "text-on-surface-variant/30 cursor-not-allowed"
                      : "text-on-surface hover:bg-primary-container hover:text-on-primary-container cursor-pointer"
                }
                ${isToday && !isSelected ? "ring-2 ring-primary/40" : ""}
              `}
              aria-label={`${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}${disabled ? " (unavailable)" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-outline-variant/20">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary" />
          <span className="text-xs font-label text-on-surface-variant">
            Selected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full ring-2 ring-primary/40" />
          <span className="text-xs font-label text-on-surface-variant">
            Today
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-surface-container-high" />
          <span className="text-xs font-label text-on-surface-variant">
            Unavailable
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Time Slot Picker ─────────────────────────────────────────────────────

function TimeSlotPicker({
  slots,
  selectedTime,
  onSelect,
  loading,
}: {
  slots: Slot[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
  loading: boolean;
}) {
  const morningSlots = slots.filter((s) => {
    const hour = parseInt(s.start_time.split(":")[0], 10);
    return hour < 12;
  });
  const afternoonSlots = slots.filter((s) => {
    const hour = parseInt(s.start_time.split(":")[0], 10);
    return hour >= 12;
  });

  if (loading) {
    return (
      <div className="bg-surface-container rounded-xl p-8 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-on-surface-variant font-reading">
          Loading available times...
        </p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="bg-surface-container rounded-xl p-8 text-center">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-4 block">
          event_busy
        </span>
        <p className="text-on-surface-variant font-reading text-lg">
          No available time slots for this date.
        </p>
        <p className="text-on-surface-variant/60 font-reading text-sm mt-2">
          Please try another day or call us at (510) 282-6653.
        </p>
      </div>
    );
  }

  function renderGroup(label: string, icon: string, groupSlots: Slot[]) {
    if (groupSlots.length === 0) return null;
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-on-surface-variant">
            {icon}
          </span>
          <span className="font-label font-bold text-sm text-on-surface-variant uppercase tracking-widest">
            {label}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {groupSlots.map((slot) => {
            const isSelected = selectedTime === slot.start_time;
            return (
              <button
                key={slot.start_time}
                type="button"
                disabled={!slot.available}
                onClick={() => onSelect(slot.start_time)}
                className={`
                  px-5 py-3 rounded-full font-bold text-sm transition-all duration-200
                  ${
                    isSelected
                      ? "bg-primary text-on-primary shadow-lg scale-105"
                      : slot.available
                        ? "bg-surface-container-high text-on-surface hover:bg-primary-container hover:text-on-primary-container cursor-pointer"
                        : "bg-surface-container-high/50 text-on-surface-variant/40 line-through cursor-not-allowed"
                  }
                `}
              >
                {formatTime(slot.start_time)}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container rounded-xl p-6 space-y-6">
      <h4 className="font-headline font-extrabold text-lg text-on-surface">
        Available Times
      </h4>
      {renderGroup("Morning", "wb_sunny", morningSlots)}
      {renderGroup("Afternoon", "wb_twilight", afternoonSlots)}
    </div>
  );
}

// ── Main Form Component ──────────────────────────────────────────────────

export default function BookTourForm() {
  // State
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingResult, setBookingResult] = useState<{
    date: string;
    time: string;
  } | null>(null);

  // Derived step
  const currentStep = selectedTime ? 3 : selectedDate ? 2 : 1;

  // Fetch slots when a date is selected
  const handleDateSelect = useCallback(async (dateISO: string) => {
    setSelectedDate(dateISO);
    setSelectedTime(null);
    setSlotsLoading(true);
    setSlots([]);

    try {
      const res = await fetch(
        `/api/availability?date=${encodeURIComponent(dateISO)}`
      );
      if (!res.ok) throw new Error("Failed to load availability");
      const data = await res.json();
      setSlots(data.slots || []);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  // Submit booking
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setFormStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      parent_name: formData.get("parent_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      booking_date: selectedDate,
      booking_time: selectedTime,
      notes: (formData.get("notes") as string) || undefined,
    };

    try {
      const res = await fetch("/api/book-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setFormStatus("success");
      setBookingResult({ date: selectedDate, time: selectedTime });
    } catch (err) {
      setFormStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  // ── Success State ────────────────────────────────────────────────────

  if (formStatus === "success" && bookingResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-primary-fixed/30 rounded-xl p-10 md:p-14 text-center space-y-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
            <span className="material-symbols-outlined text-4xl text-on-primary">
              check_circle
            </span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl text-primary">
            Tour Booked!
          </h3>
          <p className="text-on-surface-variant font-reading text-lg leading-relaxed max-w-lg mx-auto">
            Thank you for scheduling a visit to Kopila Day Care. We&apos;ll
            send a confirmation to your email within 24 hours.
          </p>

          <div className="bg-surface rounded-xl p-6 space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-primary-fixed p-3 rounded-lg">
                <span className="material-symbols-outlined text-primary">
                  calendar_today
                </span>
              </div>
              <div>
                <p className="font-label font-bold text-xs text-secondary uppercase tracking-widest">
                  Date
                </p>
                <p className="font-headline font-extrabold text-on-surface">
                  {formatDateReadable(bookingResult.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-fixed p-3 rounded-lg">
                <span className="material-symbols-outlined text-primary">
                  schedule
                </span>
              </div>
              <div>
                <p className="font-label font-bold text-xs text-secondary uppercase tracking-widest">
                  Time
                </p>
                <p className="font-headline font-extrabold text-on-surface">
                  {formatTime(bookingResult.time)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-fixed p-3 rounded-lg">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
              </div>
              <div>
                <p className="font-label font-bold text-xs text-secondary uppercase tracking-widest">
                  Location
                </p>
                <p className="font-headline font-extrabold text-on-surface">
                  17040 Esteban St, Hayward, CA 94541
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://maps.google.com/?q=17040+Esteban+St+Hayward+CA+94541"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:scale-95 transition-all shadow-lg"
            >
              <span className="material-symbols-outlined">directions</span>
              Get Directions
            </a>
            <button
              type="button"
              onClick={() => {
                setFormStatus("idle");
                setSelectedDate(null);
                setSelectedTime(null);
                setSlots([]);
                setBookingResult(null);
              }}
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-bold hover:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">edit_calendar</span>
              Book Another Tour
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Booking Form ─────────────────────────────────────────────────────

  return (
    <div>
      <StepIndicator current={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Calendar + Time Slots */}
        <div className="space-y-6">
          <div>
            <h3 className="font-headline font-extrabold text-xl text-on-surface mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                calendar_today
              </span>
              Select a Date
            </h3>
            <p className="text-on-surface-variant/70 font-reading text-sm mb-4">
              Tours available Monday - Friday
            </p>
            <Calendar
              selectedDate={selectedDate}
              onSelect={handleDateSelect}
            />
          </div>

          {selectedDate && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h3 className="font-headline font-extrabold text-xl text-on-surface mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  schedule
                </span>
                Pick a Time
              </h3>
              <p className="text-on-surface-variant/70 font-reading text-sm mb-4">
                {formatDateReadable(selectedDate)}
              </p>
              <TimeSlotPicker
                slots={slots}
                selectedTime={selectedTime}
                onSelect={handleTimeSelect}
                loading={slotsLoading}
              />
            </div>
          )}
        </div>

        {/* Right: Form Fields */}
        <div>
          {selectedTime ? (
            <div>
              <h3 className="font-headline font-extrabold text-xl text-on-surface mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
                Your Details
              </h3>
              <p className="text-on-surface-variant/70 font-reading text-sm mb-6">
                {formatDateReadable(selectedDate!)}&ensp;&middot;&ensp;
                {formatTime(selectedTime)}
              </p>

              {formStatus === "error" && (
                <div className="mb-6 bg-error-container text-on-error-container p-4 rounded-lg font-bold flex items-center gap-3">
                  <span className="material-symbols-outlined">error</span>
                  {errorMessage}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="bg-surface-container-lowest p-8 rounded-xl shadow-sm space-y-6"
              >
                <div className="space-y-2">
                  <label className="font-label font-bold text-sm text-secondary">
                    Parent / Guardian Name *
                  </label>
                  <input
                    name="parent_name"
                    required
                    type="text"
                    placeholder="Your full name"
                    className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-fixed font-reading text-on-surface"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label font-bold text-sm text-secondary">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="you@email.com"
                      className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-fixed font-reading text-on-surface"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label font-bold text-sm text-secondary">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="(555) 000-0000"
                      className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-fixed font-reading text-on-surface"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label font-bold text-sm text-secondary">
                    Child&apos;s Age
                  </label>
                  <select
                    name="child_age"
                    className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-fixed font-reading text-on-surface appearance-none"
                  >
                    <option value="">Select age range</option>
                    <option value="6m-1y">6 months - 1 year</option>
                    <option value="1-2y">1 - 2 years</option>
                    <option value="2-4y">2 - 4 years</option>
                    <option value="4-6y">4 - 6 years</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-label font-bold text-sm text-secondary">
                    Notes / Questions{" "}
                    <span className="font-normal text-on-surface-variant/60">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Anything you'd like us to know or questions for the visit..."
                    className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-fixed font-reading text-on-surface"
                  />
                </div>

                {/* Summary */}
                <div className="bg-primary-fixed/20 p-5 rounded-xl space-y-2">
                  <p className="font-label font-bold text-sm text-primary uppercase tracking-widest">
                    Tour Summary
                  </p>
                  <div className="flex items-center gap-3 text-on-surface font-reading">
                    <span className="material-symbols-outlined text-primary text-lg">
                      calendar_today
                    </span>
                    {formatDateReadable(selectedDate!)}
                  </div>
                  <div className="flex items-center gap-3 text-on-surface font-reading">
                    <span className="material-symbols-outlined text-primary text-lg">
                      schedule
                    </span>
                    {formatTime(selectedTime)}
                  </div>
                  <div className="flex items-center gap-3 text-on-surface font-reading">
                    <span className="material-symbols-outlined text-primary text-lg">
                      location_on
                    </span>
                    17040 Esteban St, Hayward, CA 94541
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  {formStatus === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">
                        event_available
                      </span>
                      Confirm Tour Booking
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Placeholder when no time is selected yet */
            <div className="bg-surface-container rounded-xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px] gap-4">
              <span
                className="material-symbols-outlined text-7xl text-primary/20"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {selectedDate ? "schedule" : "event"}
              </span>
              <h4 className="font-headline font-extrabold text-xl text-on-surface-variant/60">
                {selectedDate
                  ? "Now pick a time slot"
                  : "Start by picking a date"}
              </h4>
              <p className="text-on-surface-variant/40 font-reading max-w-sm">
                {selectedDate
                  ? "Choose from available morning or afternoon time slots on the left."
                  : "Select a weekday on the calendar to see available tour times."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
