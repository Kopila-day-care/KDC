type Entry = { count: number; reset: number };
const store = new Map<string, Entry>();

/**
 * Simple in-process sliding-window rate limiter.
 * Returns true if the request is allowed, false if it should be rejected.
 * Note: state is per-instance — provides protection against single-client
 * bursts but is not distributed. Upgrade to Upstash Redis for multi-region.
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.reset <= now) {
    store.set(key, { count: 1, reset: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
}

/** Extract the best available client IP from a Next.js Request. */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
