import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validators";
import { sendContactNotification } from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`contact:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, address, subject, message } = parsed.data;

    const supabase = createServiceClient();

    const { error } = await supabase.from("inquiries").insert({
      name,
      email,
      phone: phone || null,
      address: address || null,
      subject: subject || null,
      message,
    });

    if (error) {
      console.error("Failed to insert inquiry:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    try {
      sendContactNotification({ name, email, phone, subject, message }).catch(
        (err) => console.error("Failed to send contact notification:", err)
      );
    } catch (emailError) {
      console.error("Failed to initiate contact notification:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
