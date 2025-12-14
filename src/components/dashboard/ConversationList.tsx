import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/hooks/useConversations";

interface ConversationListProps {
  conversations: Conversation[];
  currentId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}

export function ConversationList({
  conversations,
  currentId,
  onSelect,
  onNew,
  onDelete,
}: ConversationListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border/30">
        <Button
          onClick={onNew}
          className="w-full gap-2"
          variant="outline"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">
              No conversations yet
            </p>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={cn(
                  "group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer",
                  "hover:bg-primary/10 transition-colors",
                  currentId === conv.id && "bg-primary/20"
                )}
                onClick={() => onSelect(conv.id)}
              >
                <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="flex-1 text-sm truncate">{conv.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(conv.id);
                  }}
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
