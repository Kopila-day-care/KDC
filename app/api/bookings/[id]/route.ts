import { NextResponse } from "next/server";
import { createServiceClient, requireAdmin } from "@/lib/supabase/server";
import { sendBookingConfirmation, sendBookingCancellation } from "@/lib/resend";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createServiceClient();
    const body = await request.json();
    const { status } = body;

    if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update booking:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update booking." },
        { status: 500 }
      );
    }

    // Send email to parent based on status change
    if (data) {
      try {
        if (status === "confirmed") {
          sendBookingConfirmation({
            parent_name: data.parent_name,
            email: data.email,
            booking_date: data.booking_date,
            booking_time: data.booking_time,
          }).catch((err) => {
            console.error("Failed to send booking confirmation:", err);
          });
        } else if (status === "cancelled") {
          sendBookingCancellation({
            parent_name: data.parent_name,
            email: data.email,
            booking_date: data.booking_date,
            booking_time: data.booking_time,
          }).catch((err) => {
            console.error("Failed to send booking cancellation:", err);
          });
        }
      } catch (emailError) {
        console.error("Failed to initiate email:", emailError);
      }
    }

    return NextResponse.json({ success: true, booking: data });
  } catch (error) {
    console.error("Booking PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createServiceClient();

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Failed to delete booking:", error);
      return NextResponse.json(
        { success: false, message: "Failed to delete booking." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
