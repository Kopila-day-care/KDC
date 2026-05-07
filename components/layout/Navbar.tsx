"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-approach", label: "Approach" },
  { href: "/our-team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#faf9f7]/80 dark:bg-[#2E2B27]/80 backdrop-blur-md shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center px-8 py-5 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="font-display text-3xl text-[#3c674b] dark:text-[#8dbb9a] flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span>
          Kopila Day Care
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline font-bold text-base tracking-wide transition-all ${
                  isActive
                    ? "text-[#3c674b] dark:text-[#8dbb9a] border-b-2 border-[#8dbb9a]"
                    : "text-[#2E2B27] dark:text-[#f4f3f1] opacity-80 hover:scale-95 hover:text-[#3c674b]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 text-secondary font-bold text-base hover:text-soft-rose transition-colors"
          >
            <span className="material-symbols-outlined text-xl">location_on</span>
            Contact Us
          </Link>
          <Link
            href="/book-a-tour"
            className="bg-primary text-on-primary px-7 py-3 rounded-full font-bold text-base hover:scale-95 transition-all shadow-md"
          >
            Book a Tour!
          </Link>
          <Link
            href="/admin/login"
            className="text-on-surface-variant/40 hover:text-primary transition-colors"
            title="Login"
          >
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
