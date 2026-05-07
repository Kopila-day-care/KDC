import { NextResponse } from "next/server";
import { createServiceClient, requireAdmin } from "@/lib/supabase/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createServiceClient();

    // Get the image record first to delete from storage
    const { data: image } = await supabase
      .from("gallery_images")
      .select("image_url")
      .eq("id", params.id)
      .single();

    if (!image) {
      return NextResponse.json(
        { success: false, message: "Image not found." },
        { status: 404 }
      );
    }

    // Delete from gallery_images table
    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Failed to delete gallery image:", error);
      return NextResponse.json(
        { success: false, message: "Failed to delete gallery image." },
        { status: 500 }
      );
    }

    // Try to delete from Supabase Storage if it's a Supabase URL
    try {
      const url = new URL(image.image_url);
      if (url.hostname.includes("supabase")) {
        const pathParts = url.pathname.split("/storage/v1/object/public/");
        if (pathParts[1]) {
          const [bucket, ...fileParts] = pathParts[1].split("/");
          const filePath = fileParts.join("/");
          await supabase.storage.from(bucket).remove([filePath]);
        }
      }
    } catch {
      // Not a Supabase URL or failed to parse — that's fine, DB record is already deleted
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gallery DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createServiceClient();
    const body = await request.json();
    const updates: Record<string, unknown> = {};

    const validCategories = ["general", "outdoor", "indoor", "meals", "activities"];

    if (body.alt_text !== undefined) {
      if (typeof body.alt_text !== "string" || body.alt_text.length > 200) {
        return NextResponse.json(
          { success: false, message: "alt_text must be a string under 200 characters." },
          { status: 400 }
        );
      }
      updates.alt_text = body.alt_text;
    }

    if (body.category !== undefined) {
      if (!validCategories.includes(body.category)) {
        return NextResponse.json(
          { success: false, message: `category must be one of: ${validCategories.join(", ")}.` },
          { status: 400 }
        );
      }
      updates.category = body.category;
    }

    if (body.sort_order !== undefined) {
      if (typeof body.sort_order !== "number" || !Number.isInteger(body.sort_order) || body.sort_order < 0) {
        return NextResponse.json(
          { success: false, message: "sort_order must be a non-negative integer." },
          { status: 400 }
        );
      }
      updates.sort_order = body.sort_order;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, message: "No fields to update." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("gallery_images")
      .update(updates)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update gallery image:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update gallery image." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, image: data });
  } catch (error) {
    console.error("Gallery PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
