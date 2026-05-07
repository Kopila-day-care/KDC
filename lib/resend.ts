import { Resend } from "resend";

function esc(value: string | undefined | null): string {
  return (value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

const OWNER_EMAILS = (process.env.OWNER_EMAIL || "")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kopiladaycare.com";

export async function sendBookingConfirmation(booking: {
  parent_name: string;
  email: string;
  booking_date: string;
  booking_time: string;
}) {
  try {
    if (!resend) return;
    await resend.emails.send({
      from: "Kopila Day Care <booking@kopiladaycare.com>",
      to: booking.email,
      subject: "Your Tour at Kopila Day Care is Booked!",
      html: `
        <h1>Hi ${esc(booking.parent_name)}!</h1>
        <p>Thank you for booking a tour at Kopila Day Care &amp; Preschool.</p>
        <p><strong>Date:</strong> ${esc(booking.booking_date)}<br/>
        <strong>Time:</strong> ${esc(booking.booking_time)}</p>
        <p><strong>Address:</strong> <a href="https://maps.google.com/?q=17040+Esteban+St+Hayward+CA+94541">17040 Esteban St, Hayward, CA 94541</a></p>
        <p>We look forward to meeting you! If you need to reschedule, please call us at (510) 282-6653.</p>
        <p>Warm regards,<br/>Basanti &amp; the Kopila team</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
  }
}

export async function sendBookingNotification(booking: {
  parent_name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  notes?: string;
}) {
  try {
    if (!resend) return;
    await resend.emails.send({
      from: "Kopila Day Care <booking@kopiladaycare.com>",
      to: OWNER_EMAILS,
      subject: `New Tour Booking — ${esc(booking.parent_name)} on ${esc(booking.booking_date)}`,
      html: `
        <h2>New Tour Booking</h2>
        <p><strong>Name:</strong> ${esc(booking.parent_name)}</p>
        <p><strong>Email:</strong> ${esc(booking.email)}</p>
        <p><strong>Phone:</strong> ${esc(booking.phone)}</p>
        <p><strong>Date:</strong> ${esc(booking.booking_date)}</p>
        <p><strong>Time:</strong> ${esc(booking.booking_time)}</p>
        ${booking.notes ? `<p><strong>Notes:</strong> ${esc(booking.notes)}</p>` : ""}
        <p><a href="${SITE_URL}/admin/bookings">View in Admin Dashboard</a></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send booking notification email:", error);
  }
}

export async function sendBookingCancellation(booking: {
  parent_name: string;
  email: string;
  booking_date: string;
  booking_time: string;
}) {
  try {
    if (!resend) return;
    await resend.emails.send({
      from: "Kopila Day Care <booking@kopiladaycare.com>",
      to: booking.email,
      subject: "Tour Booking Update — Kopila Day Care",
      html: `
        <h1>Hi ${esc(booking.parent_name)},</h1>
        <p>We're sorry to let you know that your tour booking at Kopila Day Care has been cancelled.</p>
        <p><strong>Date:</strong> ${esc(booking.booking_date)}<br/>
        <strong>Time:</strong> ${esc(booking.booking_time)}</p>
        <p>We'd still love to have you visit! Please feel free to book another time that works for you.</p>
        <p><a href="${SITE_URL}/book-a-tour">Book a New Tour</a></p>
        <p>If you have any questions, call us at (510) 282-6653.</p>
        <p>Warm regards,<br/>Basanti &amp; the Kopila team</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send booking cancellation email:", error);
  }
}

export async function sendContactNotification(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  try {
    if (!resend) return;
    await resend.emails.send({
      from: "Kopila Day Care <booking@kopiladaycare.com>",
      to: OWNER_EMAILS,
      subject: `New Inquiry from ${esc(inquiry.name)}${inquiry.subject ? ` — ${esc(inquiry.subject)}` : ""}`,
      html: `
        <h2>New Contact Form Inquiry</h2>
        <p><strong>Name:</strong> ${esc(inquiry.name)}</p>
        <p><strong>Email:</strong> ${esc(inquiry.email)}</p>
        ${inquiry.phone ? `<p><strong>Phone:</strong> ${esc(inquiry.phone)}</p>` : ""}
        ${inquiry.subject ? `<p><strong>Subject:</strong> ${esc(inquiry.subject)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${esc(inquiry.message)}</p>
        <p><a href="${SITE_URL}/admin/inquiries">View in Admin Dashboard</a></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
  }
}
