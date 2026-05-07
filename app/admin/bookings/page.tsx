"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Booking } from "@/lib/supabase/types";

const STATUS_OPTIONS = ["all", "pending", "confirmed", "cancelled"] as const;
const FILTER_OPTIONS = ["upcoming", "past", "all"] as const;

export default function AdminBookingsPage() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [timeFilter, setTimeFilter] = useState<string>("upcoming");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (timeFilter !== "all") params.set("filter", timeFilter);

      const res = await fetch(`/api/bookings?${params}`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, timeFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: status as Booking["status"] } : b))
        );
      }
    } catch (err) {
      console.error("Failed to update booking:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-headline font-bold text-on-surface mb-6">
        Bookings
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex bg-surface-container rounded-xl p-1">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setTimeFilter(f)}
              className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${
                timeFilter === f
                  ? "bg-surface text-on-surface font-medium shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex bg-surface-container rounded-xl p-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${
                statusFilter === s
                  ? "bg-surface text-on-surface font-medium shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-outline-variant p-12 text-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-40 block mb-2">
            event_busy
          </span>
          <p className="text-on-surface-variant">No bookings found</p>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-outline-variant overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="text-left px-5 py-3 font-medium text-on-surface-variant">Date</th>
                  <th className="text-left px-5 py-3 font-medium text-on-surface-variant">Time</th>
                  <th className="text-left px-5 py-3 font-medium text-on-surface-variant">Parent</th>
                  <th className="text-left px-5 py-3 font-medium text-on-surface-variant">Contact</th>
                  <th className="text-left px-5 py-3 font-medium text-on-surface-variant">Status</th>
                  <th className="text-right px-5 py-3 font-medium text-on-surface-variant">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-surface-container-low/50">
                    <td className="px-5 py-3 text-on-surface">
                      {new Date(booking.booking_date + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3 text-on-surface">{booking.booking_time}</td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-on-surface">{booking.parent_name}</div>
                      {booking.notes && (
                        <div className="text-xs text-on-surface-variant mt-0.5 max-w-[200px] truncate">
                          {booking.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-on-surface">{booking.email}</div>
                      <div className="text-xs text-on-surface-variant">{booking.phone}</div>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {booking.status !== "confirmed" && (
                          <button
                            onClick={() => updateStatus(booking.id, "confirmed")}
                            disabled={actionLoading === booking.id}
                            className="p-1.5 rounded-lg hover:bg-primary-fixed text-primary transition-colors"
                            title="Confirm"
                          >
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          </button>
                        )}
                        {booking.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(booking.id, "cancelled")}
                            disabled={actionLoading === booking.id}
                            className="p-1.5 rounded-lg hover:bg-error-container text-on-surface-variant hover:text-error transition-colors"
                            title="Cancel"
                          >
                            <span className="material-symbols-outlined text-[18px]">cancel</span>
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          disabled={actionLoading === booking.id}
                          className="p-1.5 rounded-lg hover:bg-error-container text-on-surface-variant hover:text-error transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-outline-variant">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-on-surface">{booking.parent_name}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">
                      {new Date(booking.booking_date + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at {booking.booking_time}
                    </div>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
                <div className="text-xs text-on-surface-variant mb-3">
                  {booking.email} &middot; {booking.phone}
                </div>
                {booking.notes && (
                  <div className="text-xs text-on-surface-variant bg-surface-container-low rounded-lg p-2 mb-3">
                    {booking.notes}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {booking.status !== "confirmed" && (
                    <button
                      onClick={() => updateStatus(booking.id, "confirmed")}
                      disabled={actionLoading === booking.id}
                      className="text-xs px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => updateStatus(booking.id, "cancelled")}
                      disabled={actionLoading === booking.id}
                      className="text-xs px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => deleteBooking(booking.id)}
                    disabled={actionLoading === booking.id}
                    className="text-xs px-3 py-1.5 rounded-lg text-error hover:bg-error-container transition-colors ml-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    confirmed: "bg-primary-fixed text-on-primary-fixed-variant",
    cancelled: "bg-error-container text-on-error-container",
    pending: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  };

  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
        styles[status as keyof typeof styles] || styles.pending
      }`}
    >
      {status}
    </span>
  );
}
