"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, PlusCircle, AlertCircle, FileText } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  fileCount: number;
  disabled?: boolean;
  error?: string;
}

export default function FileUploader({
  onFilesSelected,
  fileCount,
  disabled = false,
  error = "",
}: FileUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const isValidFile = (f: File) => {
    const name = f.name.toLowerCase();
    return (
      f.type === "application/pdf" ||
      f.type === "image/jpeg" ||
      f.type === "image/png" ||
      name.endsWith(".pdf") ||
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg") ||
      name.endsWith(".png")
    );
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(isValidFile);
      onFilesSelected(validFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(isValidFile);
      onFilesSelected(validFiles);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full space-y-4">
      <input
        id="pdf-input"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <SpotlightCard
        variant="dropzone"
        interactive={!disabled}
        onClick={triggerFileInput}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`p-8 sm:p-12 cursor-pointer transition-colors duration-150 group ${
          isDragActive ? "!border-[#5E6AD2] bg-white/[0.02]" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-3.5">
          {/* Plain icon without tinted tile or multi-layer glow box */}
          <div className="flex items-center justify-center pb-1">
            {fileCount > 0 ? (
              <PlusCircle className="w-9 h-9 text-[#5E6AD2]" />
            ) : (
              <UploadCloud className="w-9 h-9 text-[#8A8F98] group-hover:text-[#EDEDEF] transition-colors" />
            )}
          </div>

          <div className="space-y-1.5 max-w-md">
            <h3 className="text-lg sm:text-xl font-medium text-[#EDEDEF] group-hover:text-white transition-colors">
              {fileCount > 0
                ? "Click or drop additional PDF, JPG, or PNG files"
                : "Drop PDF, JPG, or PNG files here, or browse"}
            </h3>
            <p className="text-sm text-[#8A8F98] leading-normal">
              Support for batch upload of PDF documents or lab images (JPG/PNG) up to 25MB each.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#050506] border border-white/[0.08] text-xs font-mono text-[#8A8F98]">
            <FileText className="w-3.5 h-3.5 text-[#8A8F98]" />
            <span>PDF &amp; IMAGE BATCH PIPELINE READY</span>
          </div>
        </div>
      </SpotlightCard>

      {/* Error Alert Banner */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/[0.08] border border-red-500/25 text-red-400 text-sm font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
