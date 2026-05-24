"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-approach", label: "Approach" },
  { href: "/our-team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#faf9f7]/80 dark:bg-[#2E2B27]/80 backdrop-blur-md shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center px-6 md:px-8 py-4 md:py-5 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl md:text-3xl text-[#3c674b] dark:text-[#8dbb9a] flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span>
            Kopila Day Care
          </Link>

          {/* Desktop nav links */}
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

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 text-secondary font-bold text-base hover:text-soft-rose transition-colors"
            >
              <span className="material-symbols-outlined text-xl">location_on</span>
              Contact Us
            </Link>
            <Link
              href="/book-a-tour"
              className="bg-primary text-on-primary px-5 md:px-7 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base hover:scale-95 transition-all shadow-md"
            >
              Book a Tour!
            </Link>
            <Link
              href="/admin/login"
              className="hidden md:block text-on-surface-variant/40 hover:text-primary transition-colors"
              title="Login"
            >
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary-container/50 text-primary transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="material-symbols-outlined text-2xl">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-[#faf9f7] dark:bg-[#2E2B27] shadow-2xl flex flex-col pt-24 pb-10 px-8 gap-2 transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:bg-primary-container hover:text-primary transition-colors"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Flower logo in drawer */}
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span>
          <span className="font-display text-xl text-primary">Kopila</span>
        </div>

        {/* Nav links */}
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-headline font-bold text-lg py-3 px-4 rounded-xl transition-all ${
                isActive
                  ? "bg-primary-container text-on-primary-container"
                  : "text-[#2E2B27] dark:text-[#f4f3f1] hover:bg-surface-container"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="h-px bg-surface-container-highest my-4" />

        {/* Extra links */}
        <Link
          href="/contact"
          className="flex items-center gap-3 font-bold text-secondary py-3 px-4 rounded-xl hover:bg-surface-container transition-all"
        >
          <span className="material-symbols-outlined">location_on</span>
          Contact Us
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center gap-3 font-bold text-on-surface-variant/50 py-3 px-4 rounded-xl hover:bg-surface-container transition-all text-sm"
        >
          <span className="material-symbols-outlined text-xl">lock</span>
          Admin Login
        </Link>
      </div>
    </>
  );
}
