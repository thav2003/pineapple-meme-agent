import { useContext } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardContext } from "./DashboardContext";

export default function SettingsTab() {
  const { settings, updateTemperature } = useContext(DashboardContext);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Agent Configuration</CardTitle>
          <CardDescription>
            These settings are configured server-side. Temperature can be adjusted here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Agent Name</Label>
              <p className="font-medium">{settings.agent_name}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Model</Label>
              <div className="flex items-center gap-2">
                <p className="font-medium">{settings.model_name}</p>
                <Badge variant="secondary" className="text-xs">OpenAI</Badge>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Max Loops</Label>
              <p className="font-medium">{settings.max_loops}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Max Tokens</Label>
              <p className="font-medium">8192</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Temperature</CardTitle>
          <CardDescription>
            Controls randomness in responses. Lower values make output more focused.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Precise</span>
              <span className="text-2xl font-bold text-primary">
                {settings.temperature.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">Creative</span>
            </div>
            <Slider
              value={[settings.temperature]}
              onValueChange={([val]) => updateTemperature(val)}
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground text-center">
              This setting is saved locally and applied to API requests.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-base">System Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">
            "Aloha, I'm Pineapple Agent, your ridiculously spiky, outrageously juicy pal straight from the tropical comedy club! I think like a pineapple—sharp on the outside, sweet on the inside, and always ready to peel back the fun!"
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
