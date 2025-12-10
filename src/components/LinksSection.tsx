import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle, Copy, LucideIcon } from "lucide-react";
import { toast } from "sonner";

const TOKEN_ADDRESS = "F99Z8SjGhNxx4anwZhed6pHyjU4KyptyTaAf2whvswrm";

interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon: LucideIcon | null;
  customIcon?: React.ReactNode;
  color: string;
}

const links: LinkItem[] = [
  {
    title: "Swarms Agent",
    description: "Try Pineapple Agent on Swarms marketplace",
    url: "https://swarms.world/prompt/0ff9cc2f-390a-4eb1-9d3d-3a045cd2682e",
    icon: ExternalLink,
    color: "primary"
  },
  {
    title: "Twitter / X",
    description: "Follow us for updates and memes",
    url: "https://x.com/pine_swarms",
    icon: null,
    customIcon: <span className="text-2xl font-bold">𝕏</span>,
    color: "secondary"
  },
  {
    title: "Telegram",
    description: "Join our tropical community",
    url: "https://t.me/pine_swarms",
    icon: MessageCircle,
    color: "accent"
  }
];

export const LinksSection = () => {
  const copyAddress = () => {
    navigator.clipboard.writeText(TOKEN_ADDRESS);
    toast.success("Token address copied! 🍍");
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-card/20 to-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Join the $PINE Community</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12">Be part of the pineapple revolution! 🍍🚀</p>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {links.map((link, index) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block bg-card/80 backdrop-blur-sm border rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 ${
                link.color === 'primary' ? 'border-primary/30 hover:border-primary hover:glow-primary' :
                link.color === 'secondary' ? 'border-secondary/30 hover:border-secondary hover:glow-secondary' :
                'border-accent/30 hover:border-accent'
              }`}
              style={{
                animation: `fade-in-up 0.5s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                link.color === 'primary' ? 'bg-primary/20 group-hover:bg-primary/30' :
                link.color === 'secondary' ? 'bg-secondary/20 group-hover:bg-secondary/30' :
                'bg-accent/20 group-hover:bg-accent/30'
              }`}>
                {link.customIcon ? (
                  link.customIcon
                ) : link.icon ? (
                  <link.icon className={`w-8 h-8 ${
                    link.color === 'primary' ? 'text-primary' :
                    link.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`} />
                ) : null}
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">{link.title}</h3>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </a>
          ))}
        </div>

        {/* Token Address Box */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center">
          <p className="text-muted-foreground mb-4">Contract Address (CA)</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <code className="bg-background/50 px-4 py-3 rounded-lg text-primary font-mono text-sm md:text-base break-all">
              {TOKEN_ADDRESS}
            </code>
            <Button
              onClick={copyAddress}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
