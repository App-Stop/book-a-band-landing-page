import { AiMatchSection } from "@/components/landing/AiMatchSection";
import { ExploreSection } from "@/components/landing/ExploreSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { InCommandSection } from "@/components/landing/InCommandSection";
import { SwipeSection } from "@/components/landing/SwipeSection";
import { TailoredSection } from "@/components/landing/TailoredSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="bg-black">
      <HeroSection />
      <InCommandSection />
      <ExploreSection />
      <div id="ai-match">
        <AiMatchSection />
      </div>
      <div id="features">
        <TailoredSection />
      </div>
      <SwipeSection />
      <TestimonialsSection />
      <div id="about">
        <FaqSection />
      </div>
      <div id="for-artists">
        <FooterSection />
      </div>
      <div id="download" className="sr-only" aria-hidden />
    </main>
  );
}
