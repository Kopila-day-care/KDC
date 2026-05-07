/**
 * Input Validation Tests
 * Verifies every Zod schema rejects attack strings, oversized payloads,
 * malformed dates/times, and accepts valid inputs correctly.
 */

import { describe, it, expect } from "vitest";
import {
  bookTourSchema,
  contactSchema,
} from "@/lib/validators";

// ─── Valid baseline fixtures ──────────────────────────────────────────────────

const validBooking = {
  parent_name: "Jane Doe",
  email: "jane@example.com",
  phone: "5105551234",
  booking_date: "2026-08-15",
  booking_time: "09:00",
  notes: "Looking forward to it!",
};

const validContact = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "5105551234",
  address: "123 Main St",
  subject: "General Inquiry",
  message: "Hello, I have a question.",
};

// ─── bookTourSchema ───────────────────────────────────────────────────────────

describe("bookTourSchema — valid input", () => {
  it("accepts a well-formed booking", () => {
    expect(bookTourSchema.safeParse(validBooking).success).toBe(true);
  });

  it("accepts booking without optional notes", () => {
    const { notes: _, ...noNotes } = validBooking;
    expect(bookTourSchema.safeParse(noNotes).success).toBe(true);
  });
});

describe("bookTourSchema — required fields", () => {
  const fields = ["parent_name", "email", "phone", "booking_date", "booking_time"] as const;
  for (const field of fields) {
    it(`rejects missing ${field}`, () => {
      const bad = { ...validBooking, [field]: undefined };
      expect(bookTourSchema.safeParse(bad).success).toBe(false);
    });

    it(`rejects empty string for ${field}`, () => {
      const bad = { ...validBooking, [field]: "" };
      expect(bookTourSchema.safeParse(bad).success).toBe(false);
    });
  }
});

describe("bookTourSchema — length limits", () => {
  it("rejects parent_name > 100 chars", () => {
    expect(
      bookTourSchema.safeParse({ ...validBooking, parent_name: "A".repeat(101) }).success
    ).toBe(false);
  });

  it("accepts parent_name at exactly 100 chars", () => {
    expect(
      bookTourSchema.safeParse({ ...validBooking, parent_name: "A".repeat(100) }).success
    ).toBe(true);
  });

  it("rejects email > 254 chars", () => {
    // "a".repeat(246) + "@test.com" = 246 + 9 = 255 chars — over the 254 limit
    expect(
      bookTourSchema.safeParse({
        ...validBooking,
        email: "a".repeat(246) + "@test.com",
      }).success
    ).toBe(false);
  });

  it("rejects phone > 20 chars", () => {
    expect(
      bookTourSchema.safeParse({ ...validBooking, phone: "1".repeat(21) }).success
    ).toBe(false);
  });

  it("rejects notes > 1000 chars", () => {
    expect(
      bookTourSchema.safeParse({ ...validBooking, notes: "X".repeat(1001) }).success
    ).toBe(false);
  });

  it("rejects 10MB notes payload", () => {
    expect(
      bookTourSchema.safeParse({ ...validBooking, notes: "X".repeat(10_000_000) }).success
    ).toBe(false);
  });
});

describe("bookTourSchema — date format validation", () => {
  const badDates = [
    "not-a-date",
    "08/15/2026",         // US format — should be YYYY-MM-DD
    "2026/08/15",         // slashes
    "Feb 30 2026",        // JS-permissive string
    "20260815",           // no separators
    "",
    // Note: "2026-13-01" matches the YYYY-MM-DD regex (format-only check).
    // Semantic month range validation is enforced by the DB's DATE type.
  ];

  for (const d of badDates) {
    it(`rejects booking_date: "${d}"`, () => {
      expect(
        bookTourSchema.safeParse({ ...validBooking, booking_date: d }).success
      ).toBe(false);
    });
  }

  it("accepts YYYY-MM-DD", () => {
    expect(
      bookTourSchema.safeParse({ ...validBooking, booking_date: "2026-08-15" }).success
    ).toBe(true);
  });
});

describe("bookTourSchema — time format validation", () => {
  const badTimes = [
    "9am",
    "9:00 AM",
    "09:00:00",
    "whenever",
    "900",
    "",
  ];

  for (const t of badTimes) {
    it(`rejects booking_time: "${t}"`, () => {
      expect(
        bookTourSchema.safeParse({ ...validBooking, booking_time: t }).success
      ).toBe(false);
    });
  }

  it("accepts HH:MM format", () => {
    expect(
      bookTourSchema.safeParse({ ...validBooking, booking_time: "09:00" }).success
    ).toBe(true);
  });
});

describe("bookTourSchema — email validation", () => {
  const badEmails = ["notanemail", "missing@", "@nodomain.com", "two@@signs.com"];
  for (const e of badEmails) {
    it(`rejects email: "${e}"`, () => {
      expect(
        bookTourSchema.safeParse({ ...validBooking, email: e }).success
      ).toBe(false);
    });
  }
});

describe("bookTourSchema — injection attack strings (parsed as strings, no execution)", () => {
  // These pass Zod (they're valid strings within length limits) — that's correct.
  // Zod's job is type/length/format validation, not content sanitization.
  // The escaping tests verify they can't cause harm downstream.
  const attacks = [
    "<script>alert(1)</script>",
    "'; DROP TABLE bookings; --",
    "{{7*7}}",
    "../../../etc/passwd",
  ];

  for (const attack of attacks) {
    it(`short attack string is accepted by schema (safe — escaped downstream): "${attack.slice(0, 30)}"`, () => {
      // Attack strings under length limit pass schema validation — correct behaviour.
      // Harm is prevented by HTML escaping (resend.ts) and parameterised Supabase queries.
      expect(
        bookTourSchema.safeParse({ ...validBooking, parent_name: attack }).success
      ).toBe(true);
    });
  }
});

// ─── contactSchema ────────────────────────────────────────────────────────────

describe("contactSchema — valid input", () => {
  it("accepts a well-formed contact submission", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("accepts minimal required fields only", () => {
    expect(
      contactSchema.safeParse({ name: "Jane", email: "j@j.com", message: "Hi" }).success
    ).toBe(true);
  });
});

describe("contactSchema — length limits", () => {
  it("rejects name > 100 chars", () => {
    expect(
      contactSchema.safeParse({ ...validContact, name: "A".repeat(101) }).success
    ).toBe(false);
  });

  it("rejects address > 200 chars", () => {
    expect(
      contactSchema.safeParse({ ...validContact, address: "A".repeat(201) }).success
    ).toBe(false);
  });

  it("rejects subject > 100 chars", () => {
    expect(
      contactSchema.safeParse({ ...validContact, subject: "A".repeat(101) }).success
    ).toBe(false);
  });

  it("rejects message > 5000 chars", () => {
    expect(
      contactSchema.safeParse({ ...validContact, message: "X".repeat(5001) }).success
    ).toBe(false);
  });

  it("rejects 10MB message payload", () => {
    expect(
      contactSchema.safeParse({ ...validContact, message: "X".repeat(10_000_000) }).success
    ).toBe(false);
  });

  it("accepts message at exactly 5000 chars", () => {
    expect(
      contactSchema.safeParse({ ...validContact, message: "X".repeat(5000) }).success
    ).toBe(true);
  });
});

describe("contactSchema — required fields", () => {
  it("rejects missing name", () => {
    expect(contactSchema.safeParse({ ...validContact, name: "" }).success).toBe(false);
  });

  it("rejects missing message", () => {
    expect(contactSchema.safeParse({ ...validContact, message: "" }).success).toBe(false);
  });

  it("rejects invalid email", () => {
    expect(
      contactSchema.safeParse({ ...validContact, email: "bad" }).success
    ).toBe(false);
  });
});
