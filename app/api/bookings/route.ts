import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, requireAdmin } from "@/lib/supabase/server";

const ALLOWED_FIELDS =
  "id, parent_name, email, phone, booking_date, booking_time, notes, status, created_at, updated_at";

export async function GET(request: NextRequest) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const filter = searchParams.get("filter"); // upcoming | past

    const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "50"), 1), 100);
    const page  = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const offset = (page - 1) * limit;

    let query = supabase
      .from("bookings")
      .select(ALLOWED_FIELDS, { count: "exact" })
      .order("booking_date", { ascending: false })
      .order("booking_time", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && ["pending", "confirmed", "cancelled"].includes(status)) {
      query = query.eq("status", status);
    }

    if (filter === "upcoming") {
      query = query.gte("booking_date", new Date().toISOString().split("T")[0]);
    } else if (filter === "past") {
      query = query.lt("booking_date", new Date().toISOString().split("T")[0]);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Failed to fetch bookings:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch bookings." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      bookings: data,
      pagination: { page, limit, total: count ?? 0, pages: Math.ceil((count ?? 0) / limit) },
    });
  } catch (error) {
    console.error("Bookings API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
