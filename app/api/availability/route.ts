import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`availability:${ip}`, 30, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        { error: "Missing required query parameter: date" },
        { status: 400 }
      );
    }

    // Parse the date and validate format
    const parsedDate = new Date(dateParam + "T00:00:00");
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD." },
        { status: 400 }
      );
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsedDate < today) {
      return NextResponse.json(
        { error: "Date cannot be in the past." },
        { status: 400 }
      );
    }

    const dayOfWeek = parsedDate.getDay(); // 0=Sun, 1=Mon, ... 6=Sat
    const supabase = createServiceClient();

    // Check if the date is blocked
    const { data: blockedData, error: blockedError } = await supabase
      .from("blocked_dates")
      .select("id")
      .eq("blocked_date", dateParam)
      .limit(1);

    if (blockedError) {
      throw blockedError;
    }

    if (blockedData && blockedData.length > 0) {
      return NextResponse.json({ date: dateParam, slots: [] });
    }

    // Get available slots for this day of week
    const { data: availabilityData, error: availabilityError } = await supabase
      .from("availability")
      .select("start_time, end_time, max_bookings")
      .eq("day_of_week", dayOfWeek)
      .eq("is_active", true)
      .order("start_time", { ascending: true });

    if (availabilityError) {
      throw availabilityError;
    }

    if (!availabilityData || availabilityData.length === 0) {
      return NextResponse.json({ date: dateParam, slots: [] });
    }

    // Count existing bookings for this date, grouped by time slot
    const { data: bookingsData, error: bookingsError } = await supabase
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", dateParam)
      .in("status", ["pending", "confirmed"]);

    if (bookingsError) {
      throw bookingsError;
    }

    // Build a map of booking counts per time slot
    const bookingCounts: Record<string, number> = {};
    if (bookingsData) {
      for (const booking of bookingsData) {
        const time = booking.booking_time;
        bookingCounts[time] = (bookingCounts[time] || 0) + 1;
      }
    }

    // Determine availability for each slot
    const slots = availabilityData.map((slot) => {
      const currentBookings = bookingCounts[slot.start_time] || 0;
      return {
        start_time: slot.start_time,
        end_time: slot.end_time,
        available: currentBookings < (slot.max_bookings ?? 1),
      };
    });

    return NextResponse.json({ date: dateParam, slots });
  } catch (error) {
    console.error("Availability API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
