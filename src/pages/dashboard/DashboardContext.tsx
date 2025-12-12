import { createContext, useState, ReactNode, useMemo, useCallback } from "react";
import { useAgentLogs } from "@/hooks/useAgentLogs";
import { useAgentSettings } from "@/hooks/useAgentSettings";
import type { UploadedFile, LogEntry, AgentSettings } from "@/types/dashboard";

interface DashboardContextType {
  // RAG
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  useRagContext: boolean;
  setUseRagContext: React.Dispatch<React.SetStateAction<boolean>>;
  ragContext: string | null;

  // Tools
  tools: Record<string, boolean>;
  setTools: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  toolFlags: Record<string, boolean>;

  // Settings
  settings: AgentSettings;
  updateTemperature: (temp: number) => void;

  // Logs
  logs: LogEntry[];
  addLog: (entry: Omit<LogEntry, 'id' | 'time'>) => void;
  clearLogs: () => void;
  exportLogs: () => void;
}

export const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // RAG State
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [useRagContext, setUseRagContext] = useState(false);

  // Tools State
  const [tools, setTools] = useState<Record<string, boolean>>({});

  // Settings & Logs Hooks
  const { settings, updateTemperature } = useAgentSettings();
  const { logs, addLog, clearLogs, exportLogs } = useAgentLogs();

  // Computed RAG context
  const ragContext = useMemo(() => {
    if (!useRagContext) return null;
    const readyFiles = files.filter(f => f.status === 'ready' && f.content);
    if (readyFiles.length === 0) return null;
    return readyFiles.map(f => `[${f.name}]\n${f.content}`).join('\n\n---\n\n');
  }, [files, useRagContext]);

  // Tool flags for API
  const toolFlags = useMemo(() => {
    return Object.entries(tools)
      .filter(([_, enabled]) => enabled)
      .reduce((acc, [id]) => ({ ...acc, [id]: true }), {});
  }, [tools]);

  const value: DashboardContextType = {
    files,
    setFiles,
    useRagContext,
    setUseRagContext,
    ragContext,
    tools,
    setTools,
    toolFlags,
    settings,
    updateTemperature,
    logs,
    addLog,
    clearLogs,
    exportLogs,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
