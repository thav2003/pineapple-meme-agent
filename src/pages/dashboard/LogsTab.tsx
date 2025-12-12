import { useContext } from "react";
import { Download, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardContext } from "./DashboardContext";

export default function LogsTab() {
  const { logs, clearLogs, exportLogs } = useContext(DashboardContext);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Request Logs</h3>
          <p className="text-sm text-muted-foreground">
            {logs.length} request(s) logged
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportLogs}
            disabled={logs.length === 0}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearLogs}
            disabled={logs.length === 0}
            className="gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No logs yet. Start chatting to see request logs.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="w-[180px]">Time</TableHead>
                <TableHead className="w-[100px]">Latency</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-border/30">
                  <TableCell className="font-mono text-xs">
                    {new Date(log.time).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {log.latency > 0 ? `${log.latency}ms` : '-'}
                  </TableCell>
                  <TableCell>
                    {log.status === 'success' ? (
                      <span className="flex items-center gap-1 text-green-400 text-xs">
                        <CheckCircle className="w-3 h-3" />
                        OK
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400 text-xs">
                        <XCircle className="w-3 h-3" />
                        Error
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate text-sm">
                    {log.message}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
