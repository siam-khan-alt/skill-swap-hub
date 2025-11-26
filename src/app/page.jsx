import FeaturesSection from "@/component/FeaturesSection";
import HeroSection from "@/component/HeroSection";
import HowItWorksSection from "@/component/HowItWorksSection";
import TestimonialsSection from "@/component/TestimonialsSection";
import LatestSkills from "@/component/LatestSkills";


export default function Home() {
  return (
    <div className="  bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <FeaturesSection />
      <LatestSkills />
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  );
}
