import { useEffect, useState } from "react";
import founderShare from "@/assets/founder-share.jpg";
import founderShare1 from "@/assets/founder-share1.jpg";
import founderBuy from "@/assets/founder-buy.png";
import { Star, Shield, TrendingUp } from "lucide-react";

const founderCards = [
  {
    image: founderShare,
    title: "Founder Mentioned $PINE",
    description: "Kye listed $PINE as top agent in economy swarm",
    icon: Star
  },
  {
    image: founderShare1,
    title: "Top 3 Best Agents",
    description: "Pine Agent ranked as one of the best!",
    icon: TrendingUp
  },
  {
    image: founderBuy,
    title: "Founder Bought $PINE",
    description: "\"No I didn't make it but I bought it lol\"",
    icon: Shield
  }
];

export const FounderSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("founder-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="founder-section" className="py-20 px-4 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Backed by Swarms Founder</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16">Kye Gomez supports $PINE 🔥</p>

        {/* Fan Cards Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[-20px]">
          {founderCards.map((card, index) => (
            <div
              key={card.title}
              className={`relative bg-card border border-border rounded-2xl overflow-hidden w-full max-w-sm transition-all duration-500 hover:z-20 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: isVisible 
                  ? `rotate(${(index - 1) * 6}deg) translateY(${index === 1 ? -10 : 0}px)` 
                  : 'rotate(0deg) translateY(50px)',
                transition: `all 0.6s ease-out ${index * 0.15}s`,
                transformOrigin: 'bottom center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) translateY(-20px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${(index - 1) * 6}deg) translateY(${index === 1 ? -10 : 0}px)`;
              }}
            >
              {/* Card Header */}
              <div className="bg-primary/10 px-4 py-3 flex items-center gap-3 border-b border-border">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground text-sm">{card.title}</h3>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </div>
              </div>
              
              {/* Card Image */}
              <div className="p-4">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full rounded-lg border border-border"
                />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
