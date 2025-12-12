import { useState, useEffect, useCallback } from 'react';
import type { AgentSettings } from '@/types/dashboard';

const SETTINGS_STORAGE_KEY = 'pineapple-agent-settings';

const DEFAULT_SETTINGS: AgentSettings = {
  agent_name: 'Pineapple Agent',
  model_name: 'gpt-4o',
  temperature: 0.5,
  max_loops: 2,
};

export function useAgentSettings() {
  const [settings, setSettings] = useState<AgentSettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch {
        console.error('Failed to parse stored settings');
      }
    }
  }, []);

  // Save temperature to localStorage whenever it changes
  const updateTemperature = useCallback((temp: number) => {
    setSettings((prev) => {
      const updated = { ...prev, temperature: temp };
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ temperature: temp }));
      return updated;
    });
  }, []);

  return { settings, updateTemperature };
}
