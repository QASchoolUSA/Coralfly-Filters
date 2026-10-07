"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`CORALFLY inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:sales@coralfly.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="h-11 w-full rounded-md border border-border px-3 text-sm outline-none ring-brand focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-11 w-full rounded-md border border-border px-3 text-sm outline-none ring-brand focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-md border border-border px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center bg-brand px-7 font-display text-sm uppercase tracking-[0.14em] text-white hover:bg-brand-dark"
      >
        Send message
      </button>
      {status === "sent" ? (
        <p className="text-sm text-muted">
          Opening your email client… If nothing opens, email us at sales@coralfly.com.
        </p>
      ) : null}
    </form>
  );
}
