import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardProvider } from "@/pages/dashboard/DashboardContext";
import ChatTab from "@/pages/dashboard/ChatTab";
import RagTab from "@/pages/dashboard/RagTab";
import ToolsTab from "@/pages/dashboard/ToolsTab";
import SettingsTab from "@/pages/dashboard/SettingsTab";
import LogsTab from "@/pages/dashboard/LogsTab";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <DashboardProvider>
                <DashboardLayout />
              </DashboardProvider>
            }
          >
            <Route index element={<Navigate to="/dashboard/chat" replace />} />
            <Route path="chat" element={<ChatTab />} />
            <Route path="rag" element={<RagTab />} />
            <Route path="tools" element={<ToolsTab />} />
            <Route path="settings" element={<SettingsTab />} />
            <Route path="logs" element={<LogsTab />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
