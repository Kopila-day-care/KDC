/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Prevent clickjacking — our pages should never be embedded in foreign iframes
  { key: "X-Frame-Options", value: "DENY" },
  // Reduce referrer info sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features we don't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Force HTTPS for 2 years (Vercel also sets this, but explicit is better)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for its runtime hydration scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Tailwind + Next.js inject inline styles; Google Fonts CSS
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts + Material Symbols font files
      "font-src 'self' https://fonts.gstatic.com",
      // Images: own origin, data URIs, Supabase storage, Google placeholder images
      "img-src 'self' data: blob: https://oguvjtcvonnjvbechkjq.supabase.co https://lh3.googleusercontent.com",
      // Google Maps iframes on the contact page
      "frame-src https://www.google.com https://maps.google.com",
      // XHR/fetch: own API + Supabase
      "connect-src 'self' https://oguvjtcvonnjvbechkjq.supabase.co",
    ].join("; "),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "oguvjtcvonnjvbechkjq.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
