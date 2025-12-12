import { useState, useEffect, useCallback } from 'react';
import type { LogEntry } from '@/types/dashboard';

const LOGS_STORAGE_KEY = 'pineapple-agent-logs';

export function useAgentLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOGS_STORAGE_KEY);
    if (stored) {
      try {
        setLogs(JSON.parse(stored));
      } catch {
        console.error('Failed to parse stored logs');
      }
    }
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const addLog = useCallback((entry: Omit<LogEntry, 'id' | 'time'>) => {
    const newLog: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      time: new Date().toISOString(),
      ...entry,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
    localStorage.removeItem(LOGS_STORAGE_KEY);
  }, []);

  const exportLogs = useCallback(() => {
    const data = JSON.stringify(logs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pineapple-agent-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [logs]);

  return { logs, addLog, clearLogs, exportLogs };
}
