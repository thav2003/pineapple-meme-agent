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
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { 
    ragContext, 
    toolFlags, 
    settings, 
    addLog,
    messages,
    currentConversationId,
    addMessage,
    createConversation,
  } = useContext(DashboardContext);

  // Convert DB messages to ChatMessage format
  const chatMessages: ChatMessage[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
    ts: new Date(m.created_at).getTime(),
  }));

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    setIsLoading(true);
    setLastError(null);

    try {
      // Create conversation if none exists
      let convId = currentConversationId;
      if (!convId) {
        convId = await createConversation();
        if (!convId) throw new Error("Failed to create conversation");
      }

      // Add user message to DB
      await addMessage("user", content);

      // Get history from current messages
      const history = chatMessages.map((m) => ({ role: m.role, content: m.content }));

      const { data, error } = await supabase.functions.invoke("agent", {
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

      // Add assistant message to DB
      await addMessage("assistant", data.reply || "No response received.");

      addLog({
        latency: data.latency_ms || 0,
        status: "success",
        message: content.substring(0, 50) + (content.length > 50 ? "..." : ""),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setLastError(errorMessage);

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      addLog({
        latency: 0,
        status: "error",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (chatMessages.length > 0) {
      const lastUserMessage = [...chatMessages].reverse().find((m) => m.role === "user");
      if (lastUserMessage) {
        sendMessage(lastUserMessage.content);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pb-4 px-2">
        {chatMessages.length === 0 && !isLoading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl mb-2">🍍</p>
              <p className="text-muted-foreground">
                {currentConversationId
                  ? "Start chatting with Pineapple Agent!"
                  : "Create a new chat or select an existing one"}
              </p>
            </div>
          </div>
        )}

        {chatMessages.map((msg, i) => (
          <MessageBubble key={`${msg.ts}-${i}`} message={msg} />
        ))}

        {isLoading && <LoadingBubble />}

        {lastError && !isLoading && (
          <div className="flex justify-center">
            <Button onClick={handleRetry} variant="outline" size="sm" className="gap-2">
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
