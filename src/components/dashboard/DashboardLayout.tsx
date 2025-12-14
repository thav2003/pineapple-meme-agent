import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Sidebar } from "./Sidebar";
import { Badge } from "@/components/ui/badge";
import { DashboardContext } from "@/pages/dashboard/DashboardContext";

const pageTitles: Record<string, string> = {
  "/dashboard/chat": "Chat",
  "/dashboard/rag": "RAG Context",
  "/dashboard/tools": "Tools",
  "/dashboard/settings": "Settings",
  "/dashboard/logs": "Logs",
};

export function DashboardLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Dashboard";

  const {
    conversations,
    currentConversationId,
    selectConversation,
    createConversation,
    deleteConversation,
  } = useContext(DashboardContext);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={selectConversation}
        onNewConversation={createConversation}
        onDeleteConversation={deleteConversation}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
              Swarms
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              gpt-4o
            </Badge>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
