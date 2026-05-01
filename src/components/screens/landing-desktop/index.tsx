import { Faq } from "./faq";
import { FeatureCards } from "./feature-cards";
import { FinalCta } from "./final-cta";
import { LandingFooter } from "./footer";
import { LandingHeader } from "./header";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Pricing } from "./pricing";
import { Testimonials } from "./testimonials";

export function LandingDesktop() {
  return (
    <main className="bg-td-bg text-td-ink mx-auto min-h-[900px] w-full max-w-[1440px] tracking-[-0.3px]">
      <LandingHeader />
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Pricing />
      <FinalCta />
      <LandingFooter />
    </main>
  );
}
