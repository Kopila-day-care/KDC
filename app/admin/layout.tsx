"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/bookings", label: "Bookings", icon: "calendar_month" },
  { href: "/admin/gallery", label: "Gallery", icon: "photo_library" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Listen for auth changes first so we catch the session immediately
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
      } else if (pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    });

    // Also check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else if (pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  // Login page gets no chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-surface-container-low">
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-30 bg-surface/95 backdrop-blur border-b border-outline-variant px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-surface-container"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-headline font-bold text-primary">
          <span className="material-symbols-outlined text-primary mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span>
          Kopila Admin
        </span>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-surface border-r border-outline-variant transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 mb-8" onClick={() => setSidebarOpen(false)}>
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_florist
            </span>
            <div>
              <div className="font-headline font-bold text-on-surface">Kopila Admin</div>
              <div className="text-xs text-on-surface-variant">Day Care & Preschool</div>
            </div>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-fixed text-on-primary-fixed-variant"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-outline-variant">
          <div className="text-xs text-on-surface-variant mb-3 truncate px-3">
            {user.email}
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs text-error hover:bg-error-container rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
