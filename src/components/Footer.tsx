import logo from "@/assets/logo.jpg";
import { ExternalLink, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Name */}
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="Pineapple Agent" 
              className="w-12 h-12 rounded-full border-2 border-primary object-cover"
            />
            <div>
              <h3 className="font-bold text-card-foreground">Pineapple Agent</h3>
              <p className="text-sm text-muted-foreground">$PINE on Solana</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://swarms.world/prompt/0ff9cc2f-390a-4eb1-9d3d-3a045cd2682e"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-primary" />
            </a>
            <a 
              href="https://x.com/pine_swarms"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors"
            >
              <span className="text-secondary font-bold">𝕏</span>
            </a>
            <a 
              href="https://t.me/pine_swarms"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-accent" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Pineapple Agent. Built on{" "}
            <a href="https://swarms.world" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Swarms
            </a>
            {" "}🍍
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This is a meme token. Not financial advice. DYOR! 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};
