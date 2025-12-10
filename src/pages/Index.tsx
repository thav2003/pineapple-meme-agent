import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FounderSection } from "@/components/FounderSection";
import { HoldingSection } from "@/components/HoldingSection";
import { LinksSection } from "@/components/LinksSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <FounderSection />
      <HoldingSection />
      <LinksSection />
      <Footer />
    </div>
  );
};

export default Index;
