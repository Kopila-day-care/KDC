import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { bookTourSchema } from "@/lib/validators";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  sendBookingConfirmation,
  sendBookingNotification,
} from "@/lib/resend";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`book-tour:${ip}`, 3, 60_000)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Validate request body
    const parsed = bookTourSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { parent_name, email, phone, booking_date, booking_time, notes } =
      parsed.data;

    // Check the date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const requestedDate = new Date(booking_date + "T00:00:00");
    if (requestedDate < today) {
      return NextResponse.json(
        { success: false, message: "Cannot book a tour in the past." },
        { status: 400 }
      );
    }

    // Get day_of_week (0=Sun, 1=Mon, ... 6=Sat)
    const dayOfWeek = requestedDate.getDay();

    const supabase = createServiceClient();

    // Check date is not blocked
    const { data: blocked } = await supabase
      .from("blocked_dates")
      .select("id")
      .eq("blocked_date", booking_date)
      .maybeSingle();

    if (blocked) {
      return NextResponse.json(
        {
          success: false,
          message: "This date is unavailable. Please choose another date.",
        },
        { status: 400 }
      );
    }

    // Check availability slot exists for this day_of_week and time
    const { data: slot } = await supabase
      .from("availability")
      .select("id, max_bookings")
      .eq("day_of_week", dayOfWeek)
      .eq("start_time", booking_time)
      .eq("is_active", true)
      .maybeSingle();

    if (!slot) {
      return NextResponse.json(
        {
          success: false,
          message: "This time slot is not available. Please choose a different time.",
        },
        { status: 400 }
      );
    }

    // Count existing bookings for this date + time
    const { count } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("booking_date", booking_date)
      .eq("booking_time", booking_time)
      .neq("status", "cancelled");

    if ((count ?? 0) >= slot.max_bookings) {
      return NextResponse.json(
        {
          success: false,
          message: "This time slot is fully booked. Please choose another time.",
        },
        { status: 400 }
      );
    }

    // Insert booking
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        parent_name,
        email,
        phone,
        booking_date,
        booking_time,
        notes: notes || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to insert booking:", error);
      return NextResponse.json(
        { success: false, message: "Failed to create booking. Please try again." },
        { status: 500 }
      );
    }

    // Only notify the owner — confirmation email to parent is sent when admin confirms
    try {
      sendBookingNotification({
        parent_name,
        email,
        phone,
        booking_date,
        booking_time,
        notes,
      }).catch((err) => {
        console.error("Failed to send booking notification:", err);
      });
    } catch (emailError) {
      console.error("Failed to initiate booking notification:", emailError);
    }

    return NextResponse.json(
      { success: true, booking_id: data.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Book tour API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
