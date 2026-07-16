export interface FileItem {
  id: string;
  file: File;
  status: "idle" | "processing" | "success" | "error";
  errorMessage?: string;
  originalUrl?: string;
  processedUrl?: string;
}
