import type { Metadata } from "next";

import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollAnimations from "../components/ScrollAnimations";

export const metadata: Metadata = {
  title: "Contact — Book a Band",
  description:
    "Get in touch with Book a Band — email support, in-app help, or follow along on social.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#0c0b1a]">
      <Navbar />
      <Contact />
      <Footer />
      <ScrollAnimations />
    </main>
  );
}
