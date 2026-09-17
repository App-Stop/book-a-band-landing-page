import type { Metadata } from "next";

import LegalPage, { LegalGap } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Book a Band",
  description:
    "How Book a Band collects, uses, and shares information when you use the marketplace app.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="mt-3 text-sm text-white/55">
        Book A Band · Effective date: September 17, 2026 · Last updated:
        September 17, 2026
      </p>

      <div className="legal-copy">
        <p>
          This Privacy Policy explains how Book A Band (&quot;we&quot;,
          &quot;us&quot;) collects, uses, and shares information when you use
          the Book A Band app and website — a marketplace connecting event
          organizers (&quot;Users&quot;) with performing bands and musicians
          (&quot;Bands&quot;).
        </p>

        <h2>1. Information we collect</h2>
        <p>We collect information you provide and information generated as you use the app:</p>
        <ul>
          <li>
            <strong>Account details</strong> — name, email, phone number,
            password, and role (User, Band, or both).
          </li>
          <li>
            <strong>Profile content</strong> — bios, photos, videos, reels,
            audio, genre tags, rates, availability, and location you add to a
            Band or User profile.
          </li>
          <li>
            <strong>Booking data</strong> — event requests, offers, messages,
            dates, venues, and dispute records between Users and Bands.
          </li>
          <li>
            <strong>Payments</strong> — Stripe processes cards and payouts. We
            do not store full card numbers. Stripe may collect identity
            information for Band payouts through Stripe Connect.
          </li>
          <li>
            <strong>Device and usage</strong> — app version, device type, log
            data, and approximate location used for nearby matching.
          </li>
        </ul>

        <h2>2. How we use information</h2>
        <ul>
          <li>Create and maintain your account, including switching User/Band roles.</li>
          <li>Match Users with Bands, show profiles, and run bookings and chat.</li>
          <li>Process payments, fees, and Band payouts via Stripe.</li>
          <li>Handle cancellations, refunds, and disputes you open in the app.</li>
          <li>Keep the marketplace safe, prevent fraud, and enforce our Terms.</li>
          <li>Send service messages about your account or bookings. Marketing is optional.</li>
          <li>Improve the app, including AI matching features you choose to use.</li>
        </ul>

        <h2>3. How we share information</h2>
        <p>We share information only as needed to run the marketplace:</p>
        <ul>
          <li>
            <strong>Other users</strong> — profile content you publish is
            visible to other users. Booking details and messages are shared
            with the User or Band on that booking.
          </li>
          <li>
            <strong>Stripe</strong> — payment, payout, and identity-verification
            data needed to process charges and Stripe Connect payouts.
          </li>
          <li>
            <strong>Service providers</strong> — hosting, analytics, and
            customer-support vendors who process data on our instructions.
          </li>
          <li>
            <strong>Legal</strong> — if required by law, or to protect users,
            the app, or our rights.
          </li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h2>4. Retention</h2>
        <p>
          We keep account and booking records for as long as your account is
          active and as needed for payments, disputes, tax, and legal
          obligations. You can delete your account from Profile → Delete
          Account. Some records may remain where we must keep them by law.
        </p>

        <h2>5. Your choices and rights</h2>
        <ul>
          <li>Update profile and account details in the app.</li>
          <li>Delete your account from Profile → Delete Account.</li>
          <li>
            Request access, correction, or deletion of personal information,
            or object to certain processing, by contacting us. Depending on
            where you live, additional rights may apply.
          </li>
        </ul>

        <h2>6. Children</h2>
        <p>
          Book A Band is for people who are at least <LegalGap>[18]</LegalGap>{" "}
          (or the age of majority where they live). We do not knowingly collect
          personal information from children.
        </p>

        <h2>7. Security</h2>
        <p>
          We use administrative and technical safeguards appropriate to a
          payments marketplace. No method of transmission or storage is
          completely secure.
        </p>

        <h2>8. International transfers</h2>
        <p>
          If you use the app from outside the country where we operate, your
          information may be processed in <LegalGap>[jurisdiction]</LegalGap>{" "}
          and other countries where our providers (including Stripe) operate.
        </p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy. We will change the date above and,
          for material changes, notify you in-app or by email.
        </p>

        <h2>10. Contact us</h2>
        <p>
          Privacy questions? Contact us at{" "}
          <LegalGap>[support@yourdomain.com]</LegalGap>,{" "}
          <LegalGap>[company legal name and address]</LegalGap>.
        </p>
      </div>
    </LegalPage>
  );
}
