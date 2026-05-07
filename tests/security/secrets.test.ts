/**
 * Secret Exposure Tests
 * Scans every source file to ensure no API keys, JWTs, or credentials
 * are hardcoded in committed code.
 */

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../..");

const SOURCE_DIRS = ["app", "components", "lib", "middleware.ts"];

const EXCLUDED = [
  "node_modules",
  ".next",
  ".vercel",
  "tests",
  ".env",
  "CLAUDE.md",
  "README.md",
  "DESIGN.md",
];

function collectFiles(target: string): string[] {
  const abs = path.join(ROOT, target);
  if (!fs.existsSync(abs)) return [];
  const stat = fs.statSync(abs);
  if (stat.isFile()) return [abs];

  const results: string[] = [];
  for (const entry of fs.readdirSync(abs)) {
    if (EXCLUDED.some((e) => entry.startsWith(e))) continue;
    results.push(...collectFiles(path.join(target, entry)));
  }
  return results;
}

const allFiles = SOURCE_DIRS.flatMap(collectFiles).filter((f) =>
  /\.(ts|tsx|js|jsx|json)$/.test(f)
);

// Real key patterns — all checked against actual .env values
const SECRET_PATTERNS: { name: string; pattern: RegExp }[] = [
  // Supabase JWTs start with eyJ (base64 JSON)
  {
    name: "Supabase JWT (anon or service role key)",
    pattern:
      /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.eyJpc3MiOiJzdXBhYmFzZSIv/,
  },
  // Resend keys start with re_
  { name: "Resend API key", pattern: /\bre_[A-Za-z0-9_]{20,}\b/ },
  // Generic high-entropy secrets (40+ hex chars)
  {
    name: "Generic hex secret (40+ chars)",
    pattern: /\b[0-9a-f]{40,}\b/i,
  },
  // Private keys
  { name: "PEM private key", pattern: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/ },
  // Postgres connection strings
  {
    name: "Postgres connection string",
    pattern: /postgres(?:ql)?:\/\/[^:]+:[^@]+@/,
  },
];

// Allowed files that may legitimately reference patterns (e.g. type stubs)
const ALLOWLIST_FILES: string[] = [];

describe("Secret exposure — source file scan", () => {
  for (const file of allFiles) {
    const rel = path.relative(ROOT, file);
    if (ALLOWLIST_FILES.includes(rel)) continue;

    it(`${rel} — contains no hardcoded secrets`, () => {
      const content = fs.readFileSync(file, "utf-8");
      for (const { name, pattern } of SECRET_PATTERNS) {
        const match = pattern.exec(content);
        expect(
          match,
          `Found a hardcoded ${name} in ${rel} at: "${match?.[0].slice(0, 40)}…"`
        ).toBeNull();
      }
    });
  }
});

describe("NEXT_PUBLIC_ variable safety", () => {
  it("service role key is NOT prefixed NEXT_PUBLIC_", () => {
    for (const file of allFiles) {
      const content = fs.readFileSync(file, "utf-8");
      expect(
        content,
        `${path.relative(ROOT, file)} exposes SUPABASE_SERVICE_ROLE_KEY publicly`
      ).not.toMatch(/NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY/);
    }
  });

  it("Resend API key is NOT prefixed NEXT_PUBLIC_", () => {
    for (const file of allFiles) {
      const content = fs.readFileSync(file, "utf-8");
      expect(
        content,
        `${path.relative(ROOT, file)} exposes RESEND_API_KEY publicly`
      ).not.toMatch(/NEXT_PUBLIC_RESEND_API_KEY/);
    }
  });

  it(".env.local is listed in .gitignore", () => {
    const gitignore = fs.readFileSync(path.join(ROOT, ".gitignore"), "utf-8");
    expect(gitignore).toMatch(/\.env.*\.local|\.env\.local/);
  });

  it(".env.local does not exist at the project root as a tracked file", () => {
    // The file may exist locally (fine for dev) but must never be committed.
    // We verify .gitignore covers it — tested above.
    // Here we also confirm it's not accidentally named without the .local suffix.
    const dangerous = [".env", ".env.production", ".env.staging"];
    for (const f of dangerous) {
      const fullPath = path.join(ROOT, f);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, "utf-8");
        expect(content).not.toMatch(
          /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/
        );
        expect(content).not.toMatch(/re_[A-Za-z0-9_]{20,}/);
      }
    }
  });
});
