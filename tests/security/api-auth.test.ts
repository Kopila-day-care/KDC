/**
 * API Authentication & Authorization Tests
 * Verifies that every admin-only route returns 401 when called
 * without a valid session, and that public routes remain accessible.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock Supabase server module before importing routes ──────────────────────
vi.mock("@/lib/supabase/server", () => ({
  requireAdmin: vi.fn(),
  createServiceClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lt: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      in: vi.fn().mockReturnThis(),
      neq: vi.fn().mockReturnThis(),
    })),
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({ error: null }),
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: "https://example.com/img.jpg" } }),
        remove: vi.fn().mockResolvedValue({ error: null }),
      })),
    },
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
  })),
}));

vi.mock("@/lib/resend", () => ({
  sendBookingConfirmation: vi.fn(),
  sendBookingCancellation: vi.fn(),
  sendContactNotification: vi.fn(),
  sendBookingNotification: vi.fn(),
}));

import { requireAdmin } from "@/lib/supabase/server";
const mockRequireAdmin = vi.mocked(requireAdmin);

// ─── Helper ───────────────────────────────────────────────────────────────────

function makeRequest(method = "GET", body?: unknown): Request {
  return new Request("http://localhost/api/test", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
}

// ─── Admin routes — must return 401 when unauthenticated ──────────────────────

describe("Admin routes — unauthenticated requests return 401", () => {
  beforeEach(() => {
    mockRequireAdmin.mockResolvedValue(null); // no session
  });

  it("GET /api/bookings → 401", async () => {
    const { GET } = await import("@/app/api/bookings/route");
    const res = await GET(makeRequest("GET") as any);
    expect(res.status).toBe(401);
  });

  it("PATCH /api/bookings/[id] → 401", async () => {
    const { PATCH } = await import("@/app/api/bookings/[id]/route");
    const res = await PATCH(makeRequest("PATCH", { status: "confirmed" }), {
      params: { id: "some-uuid" },
    });
    expect(res.status).toBe(401);
  });

  it("DELETE /api/bookings/[id] → 401", async () => {
    const { DELETE } = await import("@/app/api/bookings/[id]/route");
    const res = await DELETE(makeRequest("DELETE"), {
      params: { id: "some-uuid" },
    });
    expect(res.status).toBe(401);
  });

  it("POST /api/gallery → 401", async () => {
    const { POST } = await import("@/app/api/gallery/route");
    const res = await POST(makeRequest("POST", { image_url: "https://example.com/img.jpg" }));
    expect(res.status).toBe(401);
  });

  it("PATCH /api/gallery/[id] → 401", async () => {
    const { PATCH } = await import("@/app/api/gallery/[id]/route");
    const res = await PATCH(makeRequest("PATCH", { alt_text: "test" }), {
      params: { id: "some-uuid" },
    });
    expect(res.status).toBe(401);
  });

  it("DELETE /api/gallery/[id] → 401", async () => {
    const { DELETE } = await import("@/app/api/gallery/[id]/route");
    const res = await DELETE(makeRequest("DELETE"), {
      params: { id: "some-uuid" },
    });
    expect(res.status).toBe(401);
  });

  it("POST /api/upload → 401", async () => {
    const { POST } = await import("@/app/api/upload/route");
    const formData = new FormData();
    const res = await POST(
      new Request("http://localhost/api/upload", { method: "POST", body: formData })
    );
    expect(res.status).toBe(401);
  });
});

describe("Admin routes — 401 response body", () => {
  beforeEach(() => {
    mockRequireAdmin.mockResolvedValue(null);
  });

  it("GET /api/bookings returns JSON with Unauthorized message", async () => {
    const { GET } = await import("@/app/api/bookings/route");
    const res = await GET(makeRequest("GET") as any);
    const body = await res.json();
    expect(body.message).toBe("Unauthorized");
  });
});

describe("Admin routes — authenticated requests are not blocked", () => {
  beforeEach(() => {
    mockRequireAdmin.mockResolvedValue({ id: "admin-user", email: "admin@test.com" } as any);
  });

  it("GET /api/bookings passes auth check and attempts DB query", async () => {
    const { GET } = await import("@/app/api/bookings/route");
    const res = await GET(makeRequest("GET") as any);
    // Not 401 — auth passed (DB mock returns null data so it may be 200 or 500 but not 401)
    expect(res.status).not.toBe(401);
  });
});

// ─── Public routes — must remain accessible without auth ─────────────────────

describe("Public routes — accessible without authentication", () => {
  it("POST /api/contact does not require admin session", async () => {
    const { POST } = await import("@/app/api/contact/route");
    // Missing required body → 400, not 401 (auth is not checked)
    const res = await POST(makeRequest("POST", {}));
    expect(res.status).toBe(400);
    expect(res.status).not.toBe(401);
  });

  it("POST /api/book-tour does not require admin session", async () => {
    const { POST } = await import("@/app/api/book-tour/route");
    const res = await POST(makeRequest("POST", {}));
    expect(res.status).toBe(400);
    expect(res.status).not.toBe(401);
  });
});
