import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, requireAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Failed to fetch gallery:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch gallery images." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, images: data });
  } catch (error) {
    console.error("Gallery API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createServiceClient();
    const body = await request.json();
    const { image_url, alt_text, category } = body;

    if (!image_url) {
      return NextResponse.json(
        { success: false, message: "image_url is required." },
        { status: 400 }
      );
    }

    try {
      const parsed = new URL(image_url);
      if (parsed.protocol !== "https:") throw new Error();
    } catch {
      return NextResponse.json(
        { success: false, message: "image_url must be a valid HTTPS URL." },
        { status: 400 }
      );
    }

    const validCategories = ["general", "outdoor", "indoor", "meals", "activities"];
    if (category && !validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid category." },
        { status: 400 }
      );
    }

    // Get the current max sort_order
    const { data: maxRow } = await supabase
      .from("gallery_images")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextOrder = (maxRow?.sort_order ?? 0) + 1;

    const { data, error } = await supabase
      .from("gallery_images")
      .insert({
        image_url,
        alt_text: alt_text || null,
        category: category || "outdoor",
        sort_order: nextOrder,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to insert gallery image:", error);
      return NextResponse.json(
        { success: false, message: "Failed to add gallery image." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, image: data }, { status: 201 });
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
