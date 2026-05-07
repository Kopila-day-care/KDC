"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      subject: (formData.get("subject") as string) || undefined,
      address: (formData.get("address") as string) || undefined,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="bg-surface-container-lowest p-10 rounded-lg shadow-sm">
      <h3 className="font-display text-4xl text-primary mb-8">Send a Note</h3>

      {status === "success" && (
        <div className="mb-6 bg-primary-fixed/40 text-on-primary-container p-4 rounded-lg font-bold">
          Thank you! Your message has been sent. We&apos;ll get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 bg-error-container text-on-error-container p-4 rounded-lg font-bold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary px-2">
              Name
            </label>
            <input
              name="name"
              required
              className="w-full bg-surface-container-high rounded-md py-4 px-6 border-none focus:ring-2 focus:ring-primary-fixed text-on-surface"
              placeholder="Your full name"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary px-2">
              Email Address
            </label>
            <input
              name="email"
              required
              className="w-full bg-surface-container-high rounded-md py-4 px-6 border-none focus:ring-2 focus:ring-primary-fixed text-on-surface"
              placeholder="example@email.com"
              type="email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary px-2">
              Phone
            </label>
            <input
              name="phone"
              className="w-full bg-surface-container-high rounded-md py-4 px-6 border-none focus:ring-2 focus:ring-primary-fixed text-on-surface"
              placeholder="(555) 000-0000"
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary px-2">
              Subject
            </label>
            <select
              name="subject"
              className="w-full bg-surface-container-high rounded-md py-4 px-6 border-none focus:ring-2 focus:ring-primary-fixed text-on-surface appearance-none"
            >
              <option>General Inquiry</option>
              <option>Enrollment Waitlist</option>
              <option>Schedule a Visit</option>
              <option>Career Opportunities</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary px-2">
            Home Address
          </label>
          <input
            name="address"
            className="w-full bg-surface-container-high rounded-md py-4 px-6 border-none focus:ring-2 focus:ring-primary-fixed text-on-surface"
            placeholder="Street, City, Zip"
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary px-2">
            Your Message
          </label>
          <textarea
            name="message"
            required
            className="w-full bg-surface-container-high rounded-md py-4 px-6 border-none focus:ring-2 focus:ring-primary-fixed text-on-surface"
            placeholder="Tell us about your child..."
            rows={4}
          />
        </div>

        <button
          className="bg-[#D28080] text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-95 transition-all shadow-lg w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Submit Message"}
        </button>
      </form>
    </section>
  );
}
