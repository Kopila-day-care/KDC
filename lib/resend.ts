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

// Shared branded wrapper for all outbound emails
function emailWrapper(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kopila Day Care</title>
</head>
<body style="margin:0;padding:0;background:#f5f3f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3f0;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Header -->
        <tr><td style="background:#3c674b;border-radius:12px 12px 0 0;padding:28px 36px;text-align:center;">
          <p style="margin:0;font-size:28px;font-weight:bold;color:#ffffff;letter-spacing:1px;">&#127801; Kopila Day Care</p>
          <p style="margin:6px 0 0;font-size:13px;color:#c8dfd1;">Licensed Childcare &amp; Preschool &bull; Hayward, CA</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:36px;border-left:1px solid #e8e6e3;border-right:1px solid #e8e6e3;">
          ${body}
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f0ece8;border:1px solid #e8e6e3;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;text-align:center;">
          <p style="margin:0 0 6px;font-size:13px;color:#6b5e52;">
            <strong>Kopila Day Care &amp; Preschool</strong><br/>
            17040 Esteban St, Hayward, CA 94541<br/>
            (510) 282-6653 &bull; <a href="mailto:kopiladcc@yahoo.com" style="color:#3c674b;">kopiladcc@yahoo.com</a>
          </p>
          <p style="margin:10px 0 0;font-size:11px;color:#9e8e82;">
            This is a transactional email related to your interaction with Kopila Day Care.<br/>
            &copy; ${new Date().getFullYear()} Kopila Day Care &amp; Preschool. All rights reserved.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendBookingConfirmation(booking: {
  parent_name: string;
  email: string;
  booking_date: string;
  booking_time: string;
}) {
  if (!resend) return;
  await resend.emails.send({
    from: "Kopila Day Care <booking@kopiladaycare.com>",
    reply_to: "kopiladcc@yahoo.com",
    to: booking.email,
    subject: `Your Tour is Confirmed — Kopila Day Care (${esc(booking.booking_date)})`,
    html: emailWrapper(`
      <h2 style="margin:0 0 8px;font-size:22px;color:#3c674b;">Hi ${esc(booking.parent_name)}! &#127801;</h2>
      <p style="margin:0 0 20px;font-size:15px;color:#4a4440;line-height:1.6;">
        Great news — your tour at <strong>Kopila Day Care &amp; Preschool</strong> is confirmed. We can&rsquo;t wait to meet you and your little one!
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7f2;border-radius:10px;padding:20px;margin-bottom:24px;">
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;width:90px;">&#128197; Date</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(booking.booking_date)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">&#128336; Time</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(booking.booking_time)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">&#128205; Address</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">17040 Esteban St, Hayward, CA 94541</td>
        </tr>
      </table>

      <p style="margin:0 0 16px;font-size:15px;color:#4a4440;line-height:1.6;">
        If you need to reschedule or have any questions, please call us at <strong>(510) 282-6653</strong> or reply to this email.
      </p>
      <p style="margin:0;font-size:15px;color:#4a4440;line-height:1.6;">
        Warm regards,<br/>
        <strong style="color:#3c674b;">Basanti &amp; the Kopila family</strong>
      </p>
    `),
  });
}

export async function sendBookingNotification(booking: {
  parent_name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  notes?: string;
}) {
  if (!resend) return;
  await resend.emails.send({
    from: "Kopila Day Care <booking@kopiladaycare.com>",
    reply_to: booking.email,
    to: OWNER_EMAILS,
    subject: `&#128197; New Tour Request — ${esc(booking.parent_name)} on ${esc(booking.booking_date)}`,
    html: emailWrapper(`
      <h2 style="margin:0 0 8px;font-size:22px;color:#3c674b;">New Tour Booking &#127801;</h2>
      <p style="margin:0 0 20px;font-size:15px;color:#4a4440;line-height:1.6;">
        A parent has requested a tour. Review the details below and confirm from the admin dashboard.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7f2;border-radius:10px;padding:20px;margin-bottom:24px;">
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;width:90px;">Name</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(booking.parent_name)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">Email</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;"><a href="mailto:${esc(booking.email)}" style="color:#3c674b;">${esc(booking.email)}</a></td>
        </tr>
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">Phone</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;"><a href="tel:${esc(booking.phone)}" style="color:#3c674b;">${esc(booking.phone)}</a></td>
        </tr>
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">&#128197; Date</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(booking.booking_date)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">&#128336; Time</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(booking.booking_time)}</td>
        </tr>
        ${booking.notes ? `
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">Notes</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(booking.notes)}</td>
        </tr>` : ""}
      </table>

      <p style="margin:0;text-align:center;">
        <a href="${SITE_URL}/admin/bookings" style="display:inline-block;background:#3c674b;color:#ffffff;font-weight:bold;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">
          &#10003; Confirm or Manage Booking
        </a>
      </p>
    `),
  });
}

export async function sendBookingCancellation(booking: {
  parent_name: string;
  email: string;
  booking_date: string;
  booking_time: string;
}) {
  if (!resend) return;
  await resend.emails.send({
    from: "Kopila Day Care <booking@kopiladaycare.com>",
    reply_to: "kopiladcc@yahoo.com",
    to: booking.email,
    subject: `Tour Booking Update — Kopila Day Care`,
    html: emailWrapper(`
      <h2 style="margin:0 0 8px;font-size:22px;color:#835339;">Hi ${esc(booking.parent_name)},</h2>
      <p style="margin:0 0 20px;font-size:15px;color:#4a4440;line-height:1.6;">
        We&rsquo;re sorry to let you know that your upcoming tour at <strong>Kopila Day Care</strong> has been cancelled.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf5f0;border-radius:10px;padding:20px;margin-bottom:24px;">
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#835339;font-weight:bold;width:90px;">&#128197; Date</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(booking.booking_date)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#835339;font-weight:bold;">&#128336; Time</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(booking.booking_time)}</td>
        </tr>
      </table>

      <p style="margin:0 0 20px;font-size:15px;color:#4a4440;line-height:1.6;">
        We&rsquo;d still love to have you visit! Feel free to book another time that works for you.
      </p>
      <p style="margin:0 0 24px;text-align:center;">
        <a href="${SITE_URL}/book-a-tour" style="display:inline-block;background:#3c674b;color:#ffffff;font-weight:bold;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">
          Book a New Tour
        </a>
      </p>
      <p style="margin:0;font-size:15px;color:#4a4440;line-height:1.6;">
        If you have any questions, call us at <strong>(510) 282-6653</strong> or reply to this email.<br/><br/>
        Warm regards,<br/>
        <strong style="color:#3c674b;">Basanti &amp; the Kopila family</strong>
      </p>
    `),
  });
}

export async function sendContactNotification(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  if (!resend) return;
  await resend.emails.send({
    from: "Kopila Day Care <booking@kopiladaycare.com>",
    reply_to: inquiry.email,
    to: OWNER_EMAILS,
    subject: `New Inquiry from ${esc(inquiry.name)}${inquiry.subject ? ` — ${esc(inquiry.subject)}` : ""}`,
    html: emailWrapper(`
      <h2 style="margin:0 0 8px;font-size:22px;color:#3c674b;">New Contact Inquiry &#128140;</h2>
      <p style="margin:0 0 20px;font-size:15px;color:#4a4440;line-height:1.6;">
        Someone reached out via the contact form on the website.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7f2;border-radius:10px;padding:20px;margin-bottom:24px;">
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;width:90px;">Name</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(inquiry.name)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">Email</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;"><a href="mailto:${esc(inquiry.email)}" style="color:#3c674b;">${esc(inquiry.email)}</a></td>
        </tr>
        ${inquiry.phone ? `
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">Phone</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(inquiry.phone)}</td>
        </tr>` : ""}
        ${inquiry.subject ? `
        <tr>
          <td style="padding:6px 12px;font-size:14px;color:#3c674b;font-weight:bold;">Subject</td>
          <td style="padding:6px 12px;font-size:14px;color:#2e2b27;">${esc(inquiry.subject)}</td>
        </tr>` : ""}
      </table>

      <div style="background:#fafaf8;border-left:4px solid #3c674b;border-radius:4px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0 0 6px;font-size:13px;color:#3c674b;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
        <p style="margin:0;font-size:15px;color:#2e2b27;line-height:1.7;">${esc(inquiry.message)}</p>
      </div>

      <p style="margin:0;text-align:center;">
        <a href="mailto:${esc(inquiry.email)}" style="display:inline-block;background:#3c674b;color:#ffffff;font-weight:bold;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">
          &#8617; Reply to ${esc(inquiry.name)}
        </a>
      </p>
    `),
  });
}
