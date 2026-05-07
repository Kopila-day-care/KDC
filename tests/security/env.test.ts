/**
 * Environment Variable Safety Tests
 * Verifies that required env vars are referenced correctly in source code,
 * that secrets are never exposed client-side, and that the env example
 * file is accurate and complete.
 */

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../..");

function readSource(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), "utf-8");
}

// ─── Required env vars ────────────────────────────────────────────────────────

const REQUIRED_ENV_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "OWNER_EMAIL",
  "NEXT_PUBLIC_SITE_URL",
];

describe("Environment variables — .env.local.example is complete", () => {
  const example = readSource(".env.local.example");

  for (const varName of REQUIRED_ENV_VARS) {
    it(`${varName} is documented in .env.local.example`, () => {
      expect(example).toContain(varName);
    });
  }
});

// ─── Client-side secret safety ────────────────────────────────────────────────

describe("Environment variables — secrets never use NEXT_PUBLIC_ prefix", () => {
  const SOURCE_FILES = [
    "lib/supabase/client.ts",
    "lib/supabase/server.ts",
    "lib/resend.ts",
    "middleware.ts",
  ];

  const SECRET_VARS = [
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
    "OWNER_EMAIL",
  ];

  for (const file of SOURCE_FILES) {
    for (const varName of SECRET_VARS) {
      it(`${file} does not expose ${varName} with NEXT_PUBLIC_ prefix`, () => {
        const content = readSource(file);
        expect(content).not.toContain(`NEXT_PUBLIC_${varName}`);
      });
    }
  }
});

describe("Environment variables — server-only vars only appear in server-side files", () => {
  const CLIENT_FILES = ["lib/supabase/client.ts"];

  it("client.ts does not reference SUPABASE_SERVICE_ROLE_KEY", () => {
    const content = readSource("lib/supabase/client.ts");
    expect(content).not.toContain("SERVICE_ROLE");
  });

  it("client.ts does not reference RESEND_API_KEY", () => {
    const content = readSource("lib/supabase/client.ts");
    expect(content).not.toContain("RESEND_API_KEY");
  });

  it("middleware.ts uses anon key (not service role) for session reads", () => {
    const content = readSource("middleware.ts");
    expect(content).toContain("NEXT_PUBLIC_SUPABASE_ANON_KEY");
    expect(content).not.toContain("SERVICE_ROLE");
  });
});

// ─── Server client guard ──────────────────────────────────────────────────────

describe("createServiceClient() — fails fast on missing env vars", () => {
  it("server.ts throws if SUPABASE_SERVICE_ROLE_KEY is missing", () => {
    const content = readSource("lib/supabase/server.ts");
    // Must contain an explicit check, not just the ! non-null assertion
    expect(content).toMatch(/if\s*\(!url\s*\|\|\s*!key\)/);
    expect(content).toMatch(/throw new Error/);
  });
});

// ─── Admin route protection ───────────────────────────────────────────────────

describe("Admin API routes — all use requireAdmin guard", () => {
  const adminRoutes = [
    { file: "app/api/bookings/route.ts", handlers: ["GET"] },
    { file: "app/api/bookings/[id]/route.ts", handlers: ["PATCH", "DELETE"] },
    { file: "app/api/gallery/route.ts", handlers: ["POST"] },
    { file: "app/api/gallery/[id]/route.ts", handlers: ["PATCH", "DELETE"] },
    { file: "app/api/upload/route.ts", handlers: ["POST"] },
  ];

  for (const { file, handlers } of adminRoutes) {
    it(`${file} imports requireAdmin`, () => {
      const content = readSource(file);
      expect(content).toContain("requireAdmin");
    });

    for (const handler of handlers) {
      it(`${file} — ${handler} handler calls requireAdmin before DB access`, () => {
        const content = readSource(file);
        const handlerIndex = content.indexOf(`export async function ${handler}`);
        expect(handlerIndex).toBeGreaterThan(-1);

        // requireAdmin must appear before createServiceClient in the handler
        const afterHandler = content.slice(handlerIndex);
        const requireAdminPos = afterHandler.indexOf("requireAdmin");
        const serviceClientPos = afterHandler.indexOf("createServiceClient");

        expect(requireAdminPos).toBeGreaterThan(-1);
        expect(requireAdminPos).toBeLessThan(serviceClientPos);
      });
    }
  }
});

describe("Middleware — /admin/* routes are protected server-side", () => {
  it("middleware.ts exists at project root", () => {
    expect(fs.existsSync(path.join(ROOT, "middleware.ts"))).toBe(true);
  });

  it("middleware.ts matches /admin/:path*", () => {
    const content = readSource("middleware.ts");
    expect(content).toContain("/admin/:path*");
  });

  it("middleware.ts redirects to /admin/login when no user", () => {
    const content = readSource("middleware.ts");
    expect(content).toContain("/admin/login");
    expect(content).toContain("NextResponse.redirect");
  });

  it("middleware.ts uses getUser() not getSession() to prevent JWT spoofing", () => {
    const content = readSource("middleware.ts");
    // getUser() re-validates the JWT server-side; getSession() only reads local state
    expect(content).toContain("getUser()");
    expect(content).not.toContain("getSession()");
  });
});

// ─── Public routes — do NOT require auth ─────────────────────────────────────

describe("Public API routes — do not import requireAdmin", () => {
  const publicRoutes = [
    "app/api/contact/route.ts",
    "app/api/book-tour/route.ts",
    "app/api/availability/route.ts",
  ];

  for (const file of publicRoutes) {
    it(`${file} does not require admin auth`, () => {
      const content = readSource(file);
      expect(content).not.toContain("requireAdmin");
    });
  }
});
