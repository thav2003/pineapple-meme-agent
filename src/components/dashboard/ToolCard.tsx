import { useState } from "react";
import { Play, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ToolConfig } from "@/types/dashboard";

interface ToolCardProps {
  tool: ToolConfig;
  onToggle: (id: string, enabled: boolean) => void;
}

const mockResults: Record<string, string> = {
  summarize: "This document discusses key strategies for tropical fruit marketing in the digital age...",
  tweet: "🍍 Just discovered the sweetest secret to success - think like a pineapple! Sharp outside, sweet inside. #PINEAgent #Swarms",
  market: "📊 Market Snapshot:\n• SOL: $142.50 (+2.3%)\n• BTC: $67,200 (+1.1%)\n• Meme tokens trending up 15%",
  roadmap: "Q1 2025: Launch v2 with enhanced RAG\nQ2 2025: Multi-agent collaboration\nQ3 2025: Mobile SDK release",
};

export function ToolCard({ tool, onToggle }: ToolCardProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleRun = () => {
    setIsRunning(true);
    setResult(null);
    
    // Mock demo run
    setTimeout(() => {
      setIsRunning(false);
      setResult(mockResults[tool.id] || "Demo result completed.");
    }, 1500);
  };

  return (
    <Card className={cn(
      "border-border/50 transition-all duration-200",
      tool.enabled ? "bg-card shadow-lg shadow-primary/5" : "bg-card/50 opacity-70"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base">{tool.name}</CardTitle>
            <CardDescription className="text-sm mt-1">{tool.description}</CardDescription>
          </div>
          <Switch
            checked={tool.enabled}
            onCheckedChange={(checked) => onToggle(tool.id, checked)}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Button
          onClick={handleRun}
          disabled={!tool.enabled || isRunning}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {isRunning ? (
            <>
              <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run (demo)
            </>
          )}
        </Button>
        
        {result && (
          <div className="mt-3 p-3 bg-background/50 rounded-lg border border-border/30 text-sm">
            <pre className="whitespace-pre-wrap font-mono text-xs">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
