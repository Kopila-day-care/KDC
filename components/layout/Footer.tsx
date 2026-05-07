import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 bg-[#f4f3f1] dark:bg-[#2E2B27]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="font-display text-3xl text-[#3c674b]">
            Kopila Day Care
          </div>
          <p className="font-reading text-[#2E2B27] dark:text-[#f4f3f1] max-w-md opacity-80">
            A licensed home-based preschool in Hayward dedicated to nurturing
            the curious minds of tomorrow through play, nutrition, and love.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-[#3c674b] hover:text-[#D28080] transition-colors"
            >
              <span className="material-symbols-outlined">
                social_leaderboard
              </span>
            </a>
            <a
              href="#"
              className="text-[#3c674b] hover:text-[#D28080] transition-colors"
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
          </div>
        </div>

        <div>
          <h6 className="font-bold mb-6 text-[#3c674b]">Quick Links</h6>
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="font-reading text-[#2E2B27]/70 dark:text-[#f4f3f1]/70 hover:text-[#D28080] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/our-approach"
                className="font-reading text-[#2E2B27]/70 dark:text-[#f4f3f1]/70 hover:text-[#D28080] transition-colors"
              >
                Our Approach
              </Link>
            </li>
            <li>
              <Link
                href="/our-team"
                className="font-reading text-[#2E2B27]/70 dark:text-[#f4f3f1]/70 hover:text-[#D28080] transition-colors"
              >
                Our Team
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className="font-reading text-[#2E2B27]/70 dark:text-[#f4f3f1]/70 hover:text-[#D28080] transition-colors"
              >
                Testimonials
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold mb-6 text-[#3c674b]">Enrollment</h6>
          <ul className="space-y-4">
            <li>
              <Link
                href="/book-a-tour"
                className="font-bold text-[#3c674b] hover:text-[#D28080] transition-colors"
              >
                Book a Tour!
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className="font-reading text-[#2E2B27]/70 dark:text-[#f4f3f1]/70 hover:text-[#D28080] transition-colors"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="font-reading text-[#2E2B27]/70 dark:text-[#f4f3f1]/70 hover:text-[#D28080] transition-colors"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="font-reading text-[#2E2B27]/70 dark:text-[#f4f3f1]/70 hover:text-[#D28080] transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-primary-container/20 text-center">
        <p className="font-reading text-[#2E2B27]/50 dark:text-[#f4f3f1]/50 text-sm">
          &copy; {new Date().getFullYear()} Kopila Day Care &amp; Preschool.
          Handcrafted with love.
        </p>
      </div>
    </footer>
  );
}
