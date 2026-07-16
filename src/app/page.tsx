"use client";

import React, { useState } from "react";
import AmbientBackground from "../components/AmbientBackground";
import HeaderSection from "../components/HeaderSection";
import FileUploader from "../components/FileUploader";
import FileQueue from "../components/FileQueue";
import PreviewModal from "../components/PreviewModal";
import SessionMetrics from "../components/SessionMetrics";
import ShareModal from "../components/ShareModal";
import HowItWorksSection from "../components/HowItWorksSection";
import { FileItem } from "../types";
import { playPopSound, playStampSound } from "../utils/audio";

export default function Home() {
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [isProcessingAll, setIsProcessingAll] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string>("");
  const [previewItem, setPreviewItem] = useState<{
    item: FileItem;
    mode: "original" | "processed";
  } | null>(null);

  // Viral & Live Session Metrics State
  const [sessionStats, setSessionStats] = useState<{
    totalDocs: number;
    totalBytes: number;
    lastSpeedMs: number | null;
  }>({
    totalDocs: 0,
    totalBytes: 0,
    lastSpeedMs: null,
  });

  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  const handleFilesSelected = (validFiles: File[]) => {
    setGeneralError("");
    if (validFiles.length === 0) return;

    playPopSound(); // Mechanical haptic feedback on upload

    const newItems: FileItem[] = validFiles.map((f) => ({
      id: `${f.name}-${f.size}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      file: f,
      status: "idle",
      originalUrl: window.URL.createObjectURL(f),
    }));

    setFileItems((prev) => [...prev, ...newItems]);
  };

  const removeItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProcessingAll) return;
    playPopSound();
    setFileItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.originalUrl) window.URL.revokeObjectURL(target.originalUrl);
      if (target?.processedUrl) window.URL.revokeObjectURL(target.processedUrl);
      return prev.filter((item) => item.id !== id);
    });
    if (previewItem?.item.id === id) {
      setPreviewItem(null);
    }
  };

  const clearAll = () => {
    if (isProcessingAll) return;
    playPopSound();
    fileItems.forEach((item) => {
      if (item.originalUrl) window.URL.revokeObjectURL(item.originalUrl);
      if (item.processedUrl) window.URL.revokeObjectURL(item.processedUrl);
    });
    setFileItems([]);
    setGeneralError("");
    setPreviewItem(null);
  };

  const openPreview = (item: FileItem, preferredMode: "original" | "processed" = "original") => {
    playPopSound();
    const targetMode = preferredMode === "processed" && item.processedUrl ? "processed" : "original";
    setPreviewItem({ item, mode: targetMode });
  };

  const closePreview = () => {
    setPreviewItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fileItems.length === 0 || isProcessingAll) return;

    setIsProcessingAll(true);
    setGeneralError("");

    const startTime = performance.now();
    let totalProcessedBytes = 0;
    let totalSuccessful = 0;

    for (let i = 0; i < fileItems.length; i++) {
      const item = fileItems[i];
      if (item.status === "success") continue;

      setFileItems((prev) =>
        prev.map((it) =>
          it.id === item.id ? { ...it, status: "processing", errorMessage: undefined } : it
        )
      );

      const formData = new FormData();
      formData.append("pdf", item.file);

      try {
        const response = await fetch("/api/pdf/process", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to process PDF document.");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Auto trigger download
        const link = document.createElement("a");
        link.href = url;
        const baseName = item.file.name.replace(/\.[^/.]+$/, "");
        const watermarkedFilename = `Watermarked_${baseName}.pdf`;
        link.setAttribute("download", watermarkedFilename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);

        totalProcessedBytes += item.file.size;
        totalSuccessful++;

        setFileItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, status: "success", processedUrl: url } : it
          )
        );

        // If currently previewing this item, update the active preview state
        if (previewItem?.item.id === item.id) {
          setPreviewItem((prev) =>
            prev
              ? {
                  item: { ...prev.item, status: "success", processedUrl: url },
                  mode: "processed",
                }
              : null
          );
        }
      } catch (err: any) {
        console.error(err);
        setFileItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, status: "error", errorMessage: err.message || "Error stamping PDF" }
              : it
          )
        );
      }
    }

    setIsProcessingAll(false);

    if (totalSuccessful > 0) {
      const durationPerDoc = Math.round((performance.now() - startTime) / totalSuccessful);
      setSessionStats((prev) => ({
        totalDocs: prev.totalDocs + totalSuccessful,
        totalBytes: prev.totalBytes + totalProcessedBytes,
        lastSpeedMs: durationPerDoc,
      }));
      playStampSound(); // Mechanical stamp / seal audio cue when batch is completed!
    }
  };

  const currentProcessingIndex = fileItems.findIndex((it) => it.status === "processing");

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* Cinematic Layered Ambient Lighting Background */}
      <AmbientBackground />

      {/* Main Workspace Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center space-y-4">
        <HeaderSection onOpenShare={() => setIsShareOpen(true)} />

        <SessionMetrics stats={sessionStats} />

        <div className="w-full max-w-3xl space-y-5 pt-1">
          <FileUploader
            onFilesSelected={handleFilesSelected}
            fileCount={fileItems.length}
            disabled={isProcessingAll}
            error={generalError}
          />

          <FileQueue
            items={fileItems}
            onRemoveItem={removeItem}
            onClearAll={clearAll}
            onOpenPreview={openPreview}
            onProcessAll={handleSubmit}
            isProcessingAll={isProcessingAll}
            currentProcessingIndex={currentProcessingIndex}
          />
        </div>

        <HowItWorksSection />
      </main>

      {/* Preview Modal */}
      <PreviewModal
        previewData={previewItem}
        onClose={closePreview}
        onModeChange={(mode) =>
          setPreviewItem((prev) => (prev ? { ...prev, mode } : null))
        }
      />

      {/* Viral Share & QR Code Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Security & Legal Disclaimer Banner */}
      <section className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-2">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#EDEDEF]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>100% LOCAL BROWSER PROCESSING • SAFE &amp; SECURE</span>
          </div>
          <p className="text-xs text-[#8A8F98] leading-relaxed max-w-2xl mx-auto">
            No documents are stored, collected, or transmitted to external servers. This utility is provided &quot;as is&quot; without formal terms of service. Please use responsibly and at your own risk; the creators and host assume no liability for document modifications or misuse.
          </p>
        </div>
      </section>

      {/* Technical Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 mt-12 border-t border-white/[0.06] text-center text-xs font-mono text-[#8A8F98]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>DMCE PAGEX • IDEA &amp; CREATED BY ARYAN SONAWANE</span>
          <span className="flex items-center gap-2 text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2]" />
            <span>HOSTED &amp; DEPLOYED BY SWAR SHINDE</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
