"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Booking, GalleryImage } from "@/lib/supabase/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    upcomingBookings: 0,
    pendingBookings: 0,
    galleryCount: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookingsRes, galleryRes] = await Promise.all([
          fetch("/api/bookings?filter=upcoming"),
          fetch("/api/gallery"),
        ]);

        const bookingsData = await bookingsRes.json();
        const galleryData = await galleryRes.json();

        const bookings: Booking[] = bookingsData.bookings || [];
        const images: GalleryImage[] = galleryData.images || [];

        setStats({
          upcomingBookings: bookings.length,
          pendingBookings: bookings.filter((b) => b.status === "pending").length,
          galleryCount: images.length,
        });

        setRecentBookings(bookings.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Upcoming Bookings",
      value: stats.upcomingBookings,
      icon: "calendar_month",
      href: "/admin/bookings",
      color: "bg-primary-fixed text-on-primary-fixed-variant",
    },
    {
      label: "Pending Confirmation",
      value: stats.pendingBookings,
      icon: "pending_actions",
      href: "/admin/bookings?status=pending",
      color: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    },
    {
      label: "Gallery Photos",
      value: stats.galleryCount,
      icon: "photo_library",
      href: "/admin/gallery",
      color: "bg-secondary-fixed text-on-secondary-fixed-variant",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-headline font-bold text-on-surface mb-6">
        Dashboard
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`${card.color} rounded-2xl p-5 hover:opacity-90 transition-opacity`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-[28px]">{card.icon}</span>
              <span className="text-3xl font-headline font-bold">{card.value}</span>
            </div>
            <div className="text-sm font-medium opacity-80">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-surface rounded-2xl border border-outline-variant">
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant">
          <h2 className="font-headline font-bold text-on-surface">
            Upcoming Bookings
          </h2>
          <Link
            href="/admin/bookings"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2 block opacity-40">
              calendar_month
            </span>
            No upcoming bookings
          </div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="px-5 py-3 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-on-surface text-sm">
                    {booking.parent_name}
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    {new Date(booking.booking_date + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at {booking.booking_time}
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    booking.status === "confirmed"
                      ? "bg-primary-fixed text-on-primary-fixed-variant"
                      : booking.status === "cancelled"
                      ? "bg-error-container text-on-error-container"
                      : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
