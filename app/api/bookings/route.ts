import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, requireAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const filter = searchParams.get("filter"); // upcoming | past

    let query = supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: false })
      .order("booking_time", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    if (filter === "upcoming") {
      query = query.gte("booking_date", new Date().toISOString().split("T")[0]);
    } else if (filter === "past") {
      query = query.lt("booking_date", new Date().toISOString().split("T")[0]);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Failed to fetch bookings:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch bookings." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, bookings: data });
  } catch (error) {
    console.error("Bookings API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
