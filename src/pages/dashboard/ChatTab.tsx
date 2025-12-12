import { useState, useRef, useEffect, useContext } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "@/components/dashboard/MessageBubble";
import { ChatComposer } from "@/components/dashboard/ChatComposer";
import { LoadingBubble } from "@/components/dashboard/LoadingBubble";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { ChatMessage } from "@/types/dashboard";
import { DashboardContext } from "./DashboardContext";

export default function ChatTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { ragContext, toolFlags, settings, addLog } = useContext(DashboardContext);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setLastError(null);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));

      const { data, error } = await supabase.functions.invoke('agent', {
        body: {
          message: content,
          history,
          rag_context: ragContext || undefined,
          tool_flags: toolFlags,
          ui_overrides: {
            temperature: settings.temperature,
          },
        },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.reply || 'No response received.',
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      addLog({
        latency: data.latency_ms || 0,
        status: 'success',
        message: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setLastError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      addLog({
        latency: 0,
        status: 'error',
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMessage) {
        // Remove last assistant message if it was an error
        setMessages((prev) => {
          const lastIdx = prev.length - 1;
          if (prev[lastIdx]?.role === 'assistant') {
            return prev.slice(0, lastIdx);
          }
          return prev;
        });
        sendMessage(lastUserMessage.content);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pb-4 px-2"
      >
        {messages.length === 0 && !isLoading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl mb-2">🍍</p>
              <p className="text-muted-foreground">
                Start chatting with Pineapple Agent!
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={`${msg.ts}-${i}`} message={msg} />
        ))}

        {isLoading && <LoadingBubble />}

        {lastError && !isLoading && (
          <div className="flex justify-center">
            <Button
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        )}
      </div>

      {/* Composer */}
      <ChatComposer onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
