import { useContext } from "react";
import { ToolCard } from "@/components/dashboard/ToolCard";
import { DashboardContext } from "./DashboardContext";

const TOOLS = [
  {
    id: "summarize",
    name: "Summarize File",
    description: "Generate a concise summary of uploaded documents or conversation context.",
  },
  {
    id: "tweet",
    name: "Generate Tweet",
    description: "Create engaging tweets with the tropical Pineapple Agent style.",
  },
  {
    id: "market",
    name: "Market Snapshot",
    description: "Get a quick overview of current crypto market conditions.",
  },
  {
    id: "roadmap",
    name: "Roadmap Draft",
    description: "Generate project roadmap suggestions based on your goals.",
  },
];

export default function ToolsTab() {
  const { tools, setTools } = useContext(DashboardContext);

  const handleToggle = (id: string, enabled: boolean) => {
    setTools((prev) => ({ ...prev, [id]: enabled }));
  };

  const toolConfigs = TOOLS.map((tool) => ({
    ...tool,
    enabled: tools[tool.id] ?? false,
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Available Tools</h3>
        <p className="text-sm text-muted-foreground">
          Enable tools to extend the agent's capabilities. Enabled tools will be sent with your chat requests.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {toolConfigs.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
