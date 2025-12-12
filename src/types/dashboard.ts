export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  ts: number;
}

export interface LogEntry {
  id: string;
  time: string;
  latency: number;
  status: 'success' | 'error';
  message: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'ready' | 'needs-backend' | 'processing';
  content?: string;
}

export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface AgentSettings {
  agent_name: string;
  model_name: string;
  temperature: number;
  max_loops: number;
}
