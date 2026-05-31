import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { Services } from "@/components/sections/Services";
import { Destinations } from "@/components/sections/Destinations";
import { ShippingCategories } from "@/components/sections/ShippingCategories";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { GlobalMap } from "@/components/sections/GlobalMap";
import { SuccessMetrics } from "@/components/sections/SuccessMetrics";
import { ClientJourneys } from "@/components/sections/ClientJourneys";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Services />
      <GlobalMap />
      <Destinations />
      <SuccessMetrics />
      <ShippingCategories />
      <HowItWorks />
      <ClientJourneys />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
