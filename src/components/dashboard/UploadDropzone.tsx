import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UploadedFile } from "@/types/dashboard";

interface UploadDropzoneProps {
  onFilesAdded: (files: UploadedFile[]) => void;
}

export function UploadDropzone({ onFilesAdded }: UploadDropzoneProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const processedFiles: UploadedFile[] = [];

    for (const file of acceptedFiles) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const isTextBased = ext === 'txt' || ext === 'md';
      
      let content: string | undefined;
      let status: UploadedFile['status'] = 'needs-backend';

      if (isTextBased) {
        try {
          content = await file.text();
          status = 'ready';
        } catch {
          status = 'needs-backend';
        }
      }

      processedFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type || ext || 'unknown',
        status,
        content,
      });
    }

    onFilesAdded(processedFiles);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200",
        isDragActive 
          ? "border-primary bg-primary/10" 
          : "border-border/50 hover:border-primary/50 hover:bg-card/50"
      )}
    >
      <input {...getInputProps()} />
      <Upload className={cn(
        "w-12 h-12 mx-auto mb-4 transition-colors",
        isDragActive ? "text-primary" : "text-muted-foreground"
      )} />
      <p className="text-foreground font-medium">
        {isDragActive ? "Drop files here" : "Drag & drop files here"}
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        or click to browse (txt, md, pdf, docx)
      </p>
    </div>
  );
}

interface FileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2 mt-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border/50"
        >
          <File className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
          </div>
          <div className="flex items-center gap-2">
            {file.status === 'ready' ? (
              <span className="flex items-center gap-1 text-xs text-green-400">
                <CheckCircle className="w-4 h-4" />
                Ready
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-yellow-400">
                <AlertCircle className="w-4 h-4" />
                Needs backend
              </span>
            )}
            <button
              onClick={() => onRemove(file.id)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
