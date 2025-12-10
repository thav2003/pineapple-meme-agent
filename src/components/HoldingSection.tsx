import { useEffect, useState } from "react";
import stillHolding from "@/assets/still-holding.jpg";
import stillHolding1 from "@/assets/still-holding1.jpg";
import stillHolding2 from "@/assets/still-holding2.jpg";
import { Diamond, Flame, Heart } from "lucide-react";

const holdingCards = [
  {
    image: stillHolding,
    quote: "\"Still holding\"",
    author: "Kye Gomez (swarms)",
    icon: Diamond
  },
  {
    image: stillHolding1,
    quote: "\"pine dev is also dev of usai and ycai\"",
    author: "Kye",
    icon: Flame
  },
  {
    image: stillHolding2,
    quote: "\"yes im holding, $pine is hilarious\"",
    author: "Kye Gomez (swarms)",
    icon: Heart
  }
];

export const HoldingSection = () => {
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

    const section = document.getElementById("holding-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="holding-section" className="py-20 px-4 particles-bg">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">💎 Diamond Hands 💎</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16">Swarms founder still holding $PINE!</p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {holdingCards.map((card, index) => (
            <div
              key={index}
              className={`bg-card/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-secondary hover:-translate-y-3 group ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: isVisible ? 'translateX(0)' : `translateX(${index % 2 === 0 ? -50 : 50}px)`,
                transition: `all 0.6s ease-out ${index * 0.2}s`
              }}
            >
              {/* Quote Header */}
              <div className="bg-secondary/10 px-4 py-3 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <card.icon className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary">{card.quote}</p>
                  <p className="text-xs text-muted-foreground">- {card.author}</p>
                </div>
              </div>

              {/* Image */}
              <div className="p-4">
                <img 
                  src={card.image} 
                  alt={card.quote}
                  className="w-full rounded-lg border border-border group-hover:border-secondary/50 transition-colors"
                />
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
