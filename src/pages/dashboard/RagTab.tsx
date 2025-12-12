import { useContext } from "react";
import { FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UploadDropzone, FileList } from "@/components/dashboard/UploadDropzone";
import { DashboardContext } from "./DashboardContext";
import type { UploadedFile } from "@/types/dashboard";

export default function RagTab() {
  const { files, setFiles, useRagContext, setUseRagContext } = useContext(DashboardContext);

  const handleFilesAdded = (newFiles: UploadedFile[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter(f => f.id !== id));
  };

  const readyFilesCount = files.filter(f => f.status === 'ready').length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold">Upload Context Documents</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Upload text files to provide additional context for the agent. 
          The content will be included in your chat requests.
        </p>

        <UploadDropzone onFilesAdded={handleFilesAdded} />
        <FileList files={files} onRemove={handleRemoveFile} />
      </div>

      {files.length > 0 && (
        <div className="bg-card rounded-2xl border border-border/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="use-rag" className="text-base font-medium">
                Use this context in chat
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {readyFilesCount > 0 
                  ? `${readyFilesCount} file(s) ready to use as context`
                  : "No files ready (txt/md only)"}
              </p>
            </div>
            <Switch
              id="use-rag"
              checked={useRagContext}
              onCheckedChange={setUseRagContext}
              disabled={readyFilesCount === 0}
            />
          </div>
        </div>
      )}

      {useRagContext && readyFilesCount > 0 && (
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4">
          <p className="text-sm text-primary">
            ✓ RAG context is active. Your chat messages will include content from {readyFilesCount} file(s).
          </p>
        </div>
      )}
    </div>
  );
}
