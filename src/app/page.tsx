import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { Services } from "@/components/sections/Services";
import { Destinations } from "@/components/sections/Destinations";
import { ShippingCategories } from "@/components/sections/ShippingCategories";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { QuoteCalculator } from "@/components/sections/QuoteCalculator";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Services />
      <Destinations />
      <ShippingCategories />
      <HowItWorks />
      <QuoteCalculator />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
