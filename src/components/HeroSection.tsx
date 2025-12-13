import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import banner from "@/assets/banner.jpg";
import { Copy, ExternalLink, MessageCircle, MessageSquare } from "lucide-react";
import { toast } from "sonner";

// const TOKEN_ADDRESS = "F99Z8SjGhNxx4anwZhed6pHyjU4KyptyTaAf2whvswrm";
const TOKEN_ADDRESS = "5YCanL2s2aYuL44hd5FFyUoU7JjhP98JopvYwgY3pump";
export const HeroSection = () => {
  const copyAddress = () => {
    navigator.clipboard.writeText(TOKEN_ADDRESS);
    toast.success("Token address copied! 🍍");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden particles-bg">
      {/* Background Banner */}
      <div className="absolute inset-0 z-0">
        <img 
          src={banner} 
          alt="Swarms Banner" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Floating decoration elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-bounce-slow opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-secondary rounded-full animate-float opacity-60" />
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-accent rounded-full animate-pulse-glow opacity-40" />
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-primary rounded-full animate-bounce-slow opacity-60" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-in-up">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse-glow" />
            <img 
              src={logo} 
              alt="Pineapple Agent Logo" 
              className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-primary glow-primary animate-float mx-auto object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-7xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="text-gradient">Pineapple Agent</span>
        </h1>

        {/* Symbol */}
        <p className="text-2xl md:text-4xl font-bold text-primary mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          $PINE 🍍
        </p>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Sharp on the outside, sweet on the inside! Your AI Agent pal from the tropical comedy club on Swarms 🌴
        </p>

        {/* Token Address */}
        <div 
          onClick={copyAddress}
          className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8 cursor-pointer hover:border-primary transition-all animate-fade-in-up group"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="text-xs md:text-sm text-muted-foreground">CA:</span>
          <code className="text-xs md:text-sm text-primary font-mono truncate max-w-[200px] md:max-w-none">
            {TOKEN_ADDRESS}
          </code>
          <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {/* <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-bold text-lg px-8"
            onClick={() => window.open("https://swarms.world/prompt/0ff9cc2f-390a-4eb1-9d3d-3a045cd2682e", "_blank")}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Try Agent on Swarms
          </Button> */}

          <Button 
            asChild
            size="lg" 
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8"
          >
            <Link to="/dashboard">
              <MessageSquare className="w-5 h-5 mr-2" />
              Open Dashboard
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-muted-foreground text-foreground hover:bg-muted font-bold text-lg px-8"
            onClick={() => window.open("https://x.com/pine_swarms", "_blank")}
          >
            𝕏 Twitter
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold text-lg px-8"
            onClick={() => window.open("https://t.me/pine_swarms", "_blank")}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Telegram
          </Button>
        </div>

        {/* Chain Badge */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <span className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            Built on Solana
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
