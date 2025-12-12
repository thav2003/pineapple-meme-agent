import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import type { ChatMessage } from "@/types/dashboard";

interface MessageBubbleProps {
  message: ChatMessage;
}

// Simple markdown-like rendering for code blocks
function renderContent(content: string) {
  // Handle code blocks
  const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const code = part.slice(3, -3).replace(/^\w+\n/, '');
      return (
        <pre key={i} className="bg-background/50 rounded-lg p-3 my-2 overflow-x-auto text-sm font-mono border border-border/30">
          <code>{code}</code>
        </pre>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-background/50 px-1.5 py-0.5 rounded text-sm font-mono text-primary">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent-foreground"
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div className={cn(
        "max-w-[75%] rounded-2xl px-4 py-3",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-sm" 
          : "bg-card border border-border/50 rounded-tl-sm"
      )}>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {renderContent(message.content)}
        </div>
        <div className={cn(
          "text-xs mt-1 opacity-60",
          isUser ? "text-right" : "text-left"
        )}>
          {new Date(message.ts).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
