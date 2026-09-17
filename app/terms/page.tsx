import type { Metadata } from "next";

import LegalPage, { LegalGap } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Book a Band",
  description:
    "Terms that govern your use of the Book a Band marketplace connecting event organizers with performing bands.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p className="mt-3 text-sm text-white/55">
        Book A Band · Effective date: September 17, 2026 · Last updated:
        September 17, 2026
      </p>

      <div className="legal-copy">
        <p>
          These Terms govern your use of the Book A Band app, a marketplace
          connecting event organizers (&quot;Users&quot;) with performing bands
          and musicians (&quot;Bands&quot;). By using the app, you agree to
          these Terms.
        </p>

        <h2>1. Eligibility &amp; your account</h2>
        <ul>
          <li>
            You must be at least <LegalGap>[18]</LegalGap> years old, or the
            age of legal majority where you live.
          </li>
          <li>
            You&apos;re responsible for the accuracy of your profile and for
            keeping your login credentials confidential.
          </li>
          <li>One account per person.</li>
        </ul>

        <h2>2. What Book A Band is — and isn&apos;t</h2>
        <p>
          Book A Band is a marketplace and communication platform. We help
          Users discover Bands, exchange requests and offers, message, and pay
          for confirmed bookings.{" "}
          <strong>We are not a party to any booking</strong> — once a User and
          Band agree on an offer, that&apos;s a direct agreement between them.
          We don&apos;t guarantee a Band&apos;s availability, quality, or
          conduct, or an event&apos;s outcome.
        </p>

        <h2>3. Roles: Users and Bands</h2>
        <p>
          <strong>Users</strong> can browse Bands, send booking requests,
          negotiate offers, message Bands, and pay for confirmed bookings.
        </p>
        <p>
          <strong>Bands</strong> can build a public profile, respond to
          requests, send offers, message Users, and receive payouts. To receive
          payouts, a Band must complete identity verification through Stripe
          Connect and keep that account in good standing.
        </p>
        <p>
          The app allows switching your active role between User and Band on
          the same account.
        </p>

        <h2>4. Booking process</h2>
        <p>
          A User sends a request describing the event. A Band may respond with
          an offer, which the User can accept, decline, or counter. An accepted
          offer forms a binding agreement directly between the User and the
          Band — Book A Band facilitates this exchange but isn&apos;t a
          signatory to it.
        </p>

        <h2>5. Payments &amp; fees</h2>
        <ul>
          <li>
            Payments are processed through Stripe; we don&apos;t store your
            full card details.
          </li>
          <li>
            Book A Band charges a service fee of <LegalGap>[X]%</LegalGap> on
            bookings, disclosed before checkout.
          </li>
          <li>
            Band payouts are sent via Stripe Connect after the booking&apos;s
            completion conditions are met, minus fees.
          </li>
          <li>
            You&apos;re responsible for any taxes owed on amounts you pay or
            receive.
          </li>
        </ul>

        <h2>6. Cancellations, refunds &amp; disputes</h2>
        <p>
          Cancellation/refund terms for a booking are whatever the User and
          Band agreed to when the offer was accepted, subject to our platform
          policy of{" "}
          <LegalGap>[describe your cancellation window/refund rules]</LegalGap>
          . Either party can open a dispute from the booking in the app; we may
          assist in resolving it but don&apos;t guarantee a particular outcome.
        </p>

        <h2>7. Content you post</h2>
        <p>
          You keep ownership of what you upload (photos, videos, reels,
          audio). By posting it, you grant us a license to host and display it
          in the app. You confirm you have the rights to everything you upload
          and that it doesn&apos;t infringe anyone else&apos;s rights. Don&apos;t
          post illegal, infringing, fraudulent, or misleading content.
        </p>

        <h2>8. Acceptable use</h2>
        <ul>
          <li>Don&apos;t harass, defraud, or mislead other users.</li>
          <li>
            Don&apos;t take a booking that originated in the app outside it to
            avoid fees.
          </li>
          <li>
            Don&apos;t scrape, reverse-engineer, or interfere with the app.
          </li>
          <li>Don&apos;t impersonate another person or organization.</li>
        </ul>

        <h2>9. Suspension &amp; termination</h2>
        <p>
          We may suspend or terminate an account that violates these Terms or
          poses a risk to other users. You can delete your own account any time
          from Profile → Delete Account.
        </p>

        <h2>10. Disclaimers &amp; liability</h2>
        <p>
          The app is provided &quot;as is.&quot; We don&apos;t warrant a
          Band&apos;s performance, uninterrupted service, or any booking
          outcome. To the fullest extent permitted by law, our total liability
          for any claim is limited to the greater of the fees you paid us in
          the past <LegalGap>[12 months]</LegalGap> or{" "}
          <LegalGap>[$100]</LegalGap>.
        </p>

        <h2>11. Governing law</h2>
        <p>
          These Terms are governed by the laws of{" "}
          <LegalGap>[jurisdiction]</LegalGap>. Disputes will be resolved in{" "}
          <LegalGap>[courts/arbitration body]</LegalGap> in{" "}
          <LegalGap>[venue]</LegalGap>.
        </p>

        <h2>12. Changes to these terms</h2>
        <p>
          We may revise these Terms. We&apos;ll update the date above and, for
          material changes, notify you in-app or by email.
        </p>

        <h2>13. Contact us</h2>
        <p>
          Questions? Contact us at <LegalGap>[support@yourdomain.com]</LegalGap>
          , <LegalGap>[company legal name and address]</LegalGap>.
        </p>
      </div>
    </LegalPage>
  );
}
