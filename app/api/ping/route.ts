import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("business_settings")
      .select("id")
      .limit(1)
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
  } catch (err) {
    console.error("[ping] Supabase health check failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
