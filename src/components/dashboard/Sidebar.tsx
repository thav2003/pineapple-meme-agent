import { MessageSquare, FileText, Wrench, Settings, FileCode } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import logo from "@/assets/logo.jpg";
import { cn } from "@/lib/utils";
import { ConversationList } from "./ConversationList";
import type { Conversation } from "@/hooks/useConversations";

const tabs = [
  { name: "RAG", path: "/dashboard/rag", icon: FileText },
  { name: "Tools", path: "/dashboard/tools", icon: Wrench },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
  { name: "Logs", path: "/dashboard/logs", icon: FileCode },
];

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: SidebarProps) {
  return (
    <aside className="w-[280px] min-h-screen bg-background/95 border-r border-border/50 flex flex-col backdrop-blur-sm">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Pineapple Agent" 
            className="w-12 h-12 rounded-xl ring-2 ring-primary/30"
          />
          <div>
            <h1 className="font-bold text-lg text-foreground">Pineapple Agent</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-muted-foreground">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Conversations
          </span>
        </div>
        <div className="flex-1 min-h-0">
          <ConversationList
            conversations={conversations}
            currentId={currentConversationId}
            onSelect={onSelectConversation}
            onNew={onNewConversation}
            onDelete={onDeleteConversation}
          />
        </div>
      </div>

      {/* Other Navigation */}
      <div className="border-t border-border/30">
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Settings
          </span>
        </div>
        <nav className="p-2 space-y-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground",
                "hover:bg-primary/10 hover:text-foreground transition-all duration-200",
                "group text-sm"
              )}
              activeClassName="bg-primary/20 text-primary shadow-lg shadow-primary/10"
            >
              <tab.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{tab.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/30">
        <div className="text-xs text-muted-foreground text-center">
          $PINE Dashboard v1.0
        </div>
      </div>
    </aside>
  );
}
