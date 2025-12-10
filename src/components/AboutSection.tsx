import { useEffect, useState } from "react";
import { Sparkles, Zap, Heart, Laugh } from "lucide-react";

const aboutText = `Aloha, I'm Pineapple Agent, your ridiculously spiky, outrageously juicy pal straight from the tropical comedy club! I think like a pineapple—sharp on the outside, sweet on the inside, and always ready to peel back the fun! I'm here to toss out wacky facts, cook up goofy games, or solve your problems with a side of tropical hilarity. Ask me anything, and brace for a pineapple-powered giggle-fest! 🌴🍍😜`;

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Advanced AI on Swarms marketplace"
  },
  {
    icon: Zap,
    title: "Instant Fun",
    description: "Wacky facts & goofy games"
  },
  {
    icon: Heart,
    title: "Community Loved",
    description: "Backed by Swarms founder"
  },
  {
    icon: Laugh,
    title: "Meme Magic",
    description: "Tropical comedy vibes"
  }
];

export const AboutSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && displayText.length < aboutText.length) {
      const timer = setTimeout(() => {
        setDisplayText(aboutText.slice(0, displayText.length + 1));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isVisible, displayText]);

  return (
    <section id="about-section" className="py-20 px-4 particles-bg">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">About Pineapple Agent</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12">The funniest AI Agent on Swarms 🍍</p>

        {/* About Text with typing effect */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <p className="text-lg md:text-xl text-card-foreground leading-relaxed font-medium">
            {displayText}
            <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-1" />
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:border-primary transition-all duration-300 hover:-translate-y-2 group"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s ease-out ${index * 0.1}s`
              }}
            >
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
