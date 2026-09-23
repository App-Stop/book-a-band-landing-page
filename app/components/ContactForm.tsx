"use client";

import { useState } from "react";

const fieldClass =
  "w-full rounded-[12px] border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors duration-200 focus:border-[var(--cyan)] focus:bg-white/[0.06]";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const initialValues: Values = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

/* No backend to post to yet — submitting hands the message off to the
   visitor's own email app, pre-filled, rather than pretending to send it. */
export default function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fullName = `${values.firstName} ${values.lastName}`.trim();
    const subject = fullName
      ? `New message from ${fullName}`
      : "New message from the Book a Band contact page";

    const body = [
      values.message,
      "",
      `Name: ${fullName}`,
      `Email: ${values.email}`,
    ].join("\n");

    window.location.href = `mailto:hello@bookaband.app?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-reveal="right"
      className="relative z-10 flex w-full flex-col gap-4 rounded-[24px] border border-white/15 bg-transparent p-5 sm:p-6 lg:h-full"
    >
      <div>
        <h2 className="text-lg font-semibold text-white">Send a message</h2>
        <p className="mt-1 text-xs text-white/70">
          Fill this out and we will pick it up from there.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={values.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            placeholder="Jamie"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={values.lastName}
            onChange={(event) => update("lastName", event.target.value)}
            placeholder="Rivera"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="jamie@email.com"
          className={fieldClass}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Tell us a bit about your event, band, or question..."
          className={`${fieldClass} flex-1 resize-none`}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-b from-[#0300a6] to-[#ce00af] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-8"
        >
          Send message
        </button>
        <p className="mt-2 text-xs text-white/50">
          Opens your email app with this filled in, ready to send.
        </p>
      </div>
    </form>
  );
}
