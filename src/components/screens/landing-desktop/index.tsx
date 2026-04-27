import { FeatureCards } from "./feature-cards";
import { LandingFooter } from "./footer";
import { LandingHeader } from "./header";
import { Hero } from "./hero";
import { Pricing } from "./pricing";

export function LandingDesktop() {
  return (
    <div
      className="bg-td-bg text-td-ink w-[1440px] min-h-[900px] tracking-[-0.3px]"
    >
      <LandingHeader />
      <Hero />
      <FeatureCards />
      <Pricing />
      <LandingFooter />
    </div>
  );
}
