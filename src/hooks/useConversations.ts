import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all conversations
  const fetchConversations = useCallback(async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching conversations:", error);
      return;
    }

    setConversations(data || []);
  }, []);

  // Fetch messages for current conversation
  const fetchMessages = useCallback(async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    setMessages((data || []) as Message[]);
  }, []);

  // Create new conversation
  const createConversation = useCallback(async (title?: string): Promise<string | null> => {
    const { data, error } = await supabase
      .from("conversations")
      .insert({ title: title || "New Chat" })
      .select()
      .single();

    if (error) {
      console.error("Error creating conversation:", error);
      return null;
    }

    setConversations((prev) => [data, ...prev]);
    setCurrentConversationId(data.id);
    setMessages([]);
    return data.id;
  }, []);

  // Delete conversation
  const deleteConversation = useCallback(async (id: string) => {
    const { error } = await supabase.from("conversations").delete().eq("id", id);

    if (error) {
      console.error("Error deleting conversation:", error);
      return;
    }

    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
      setMessages([]);
    }
  }, [currentConversationId]);

  // Update conversation title
  const updateConversationTitle = useCallback(async (id: string, title: string) => {
    const { error } = await supabase
      .from("conversations")
      .update({ title })
      .eq("id", id);

    if (error) {
      console.error("Error updating conversation:", error);
      return;
    }

    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title } : c))
    );
  }, []);

  // Add message to conversation (uses provided conversationId or current)
  const addMessage = useCallback(async (role: "user" | "assistant", content: string, conversationId?: string): Promise<Message | null> => {
    const targetConvId = conversationId || currentConversationId;
    if (!targetConvId) return null;

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: targetConvId,
        role,
        content,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding message:", error);
      return null;
    }

    setMessages((prev) => [...prev, data as Message]);

    // Update conversation's updated_at
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", targetConvId);

    // Auto-update title based on first user message
    const currentConv = conversations.find((c) => c.id === targetConvId);
    if (currentConv?.title === "New Chat" && role === "user") {
      const newTitle = content.substring(0, 40) + (content.length > 40 ? "..." : "");
      await updateConversationTitle(targetConvId, newTitle);
    }

    return data as Message;
  }, [currentConversationId, conversations, updateConversationTitle]);

  // Select conversation
  const selectConversation = useCallback(async (id: string) => {
    setCurrentConversationId(id);
    setIsLoading(true);
    await fetchMessages(id);
    setIsLoading(false);
  }, [fetchMessages]);

  // Load conversations on mount
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Subscribe to realtime message updates
  useEffect(() => {
    if (!currentConversationId) return;

    const channel = supabase
      .channel(`messages-${currentConversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${currentConversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev: Message[]) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [...prev, newMessage] as Message[];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentConversationId]);

  return {
    conversations,
    currentConversationId,
    messages,
    isLoading,
    createConversation,
    deleteConversation,
    updateConversationTitle,
    addMessage,
    selectConversation,
    fetchConversations,
  };
}
