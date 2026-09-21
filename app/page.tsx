import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IntroStatement from "./components/IntroStatement";
import AppTour from "./components/AppTour";
import AiMatch from "./components/AiMatch";
import Tailored from "./components/Tailored";
import AppFeatures from "./components/AppFeatures";
import Testimonials from "./components/Testimonials";
import Faqs from "./components/Faqs";
import CtaBanner from "./components/CtaBanner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0c0b1a]">
      <Navbar />
      <Hero />
      <IntroStatement />
      <AppTour />
      <AiMatch />
      <Tailored />
      <AppFeatures />
      <Testimonials />
      <Faqs />
      <CtaBanner />
      <Footer />
    </main>
  );
}
