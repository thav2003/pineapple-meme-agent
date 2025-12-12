import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FounderSection } from "@/components/FounderSection";
import { HoldingSection } from "@/components/HoldingSection";
import { LinksSection } from "@/components/LinksSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Index = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");

    if (redirect && redirect.startsWith("/")) {
      // clean URL + navigate
      navigate(redirect, { replace: true });
    }
  }, [navigate]);
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
