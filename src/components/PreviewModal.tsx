"use client";

import React from "react";
import { FileText, Sparkles, ExternalLink, X } from "lucide-react";
import { FileItem } from "../types";
import LinearButton from "./LinearButton";

interface PreviewModalProps {
  previewData: {
    item: FileItem;
    mode: "original" | "processed";
  } | null;
  onClose: () => void;
  onModeChange: (mode: "original" | "processed") => void;
}

export default function PreviewModal({
  previewData,
  onClose,
  onModeChange,
}: PreviewModalProps) {
  if (!previewData) return null;

  const { item, mode } = previewData;
  const activeUrl =
    mode === "processed" && item.processedUrl ? item.processedUrl : item.originalUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050506]/90 p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-[#0B0C10] border border-white/[0.1] rounded-xl shadow-2xl w-full max-w-5xl h-[92vh] sm:h-[88vh] flex flex-col relative overflow-hidden">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-white/[0.08] bg-[#07080B] z-10">
          <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
            {/* Plain icon without tinted tile */}
            <FileText className="w-5 h-5 text-[#8A8F98] shrink-0" />
            <div className="flex flex-col text-left overflow-hidden">
              <span
                className="font-semibold text-base sm:text-lg text-[#EDEDEF] truncate max-w-[240px] sm:max-w-[360px]"
                title={item.file.name}
              >
                {item.file.name}
              </span>
              <span className="text-xs font-mono text-[#8A8F98] flex items-center gap-1.5 mt-0.5">
                {mode === "processed" ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>STAMPED OFFICIAL OUTPUT</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A8F98]" />
                    <span>ORIGINAL SOURCE DOCUMENT</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 flex-wrap sm:flex-nowrap">
            {/* Mode Switcher Tabs */}
            {item.processedUrl && (
              <div className="inline-flex p-1 rounded-lg bg-[#050506] border border-white/[0.08] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => onModeChange("original")}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    mode === "original"
                      ? "bg-white/[0.1] text-[#EDEDEF] font-medium"
                      : "text-[#8A8F98] hover:text-[#EDEDEF]"
                  }`}
                >
                  ORIGINAL
                </button>
                <button
                  type="button"
                  onClick={() => onModeChange("processed")}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                    mode === "processed"
                      ? "bg-[#5E6AD2] text-white font-medium"
                      : "text-[#8A8F98] hover:text-[#EDEDEF]"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>WATERMARKED</span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              {/* External / Download Link */}
              <a
                href={activeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={
                  mode === "processed"
                    ? `Watermarked_${item.file.name.replace(/\.[^/.]+$/, "")}.pdf`
                    : undefined
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-[#EDEDEF] hover:bg-white/[0.09] hover:border-white/[0.16] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{mode === "processed" ? "Download File" : "Open Tab"}</span>
              </a>

              {/* Close Button */}
              <LinearButton
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                title="Close modal"
                className="!p-2 text-[#8A8F98] hover:!text-[#EDEDEF]"
              >
                <X className="w-5 h-5" />
              </LinearButton>
            </div>
          </div>
        </div>

        {/* Viewport Container */}
        <div className="flex-1 w-full p-3 sm:p-5 bg-[#050506] relative flex flex-col items-center justify-center overflow-hidden">
          {mode === "original" &&
          (item.file.type.startsWith("image/") ||
            /\.(jpg|jpeg|png)$/i.test(item.file.name)) ? (
            <div className="w-full h-full border border-white/[0.08] rounded-lg bg-[#07080B] flex items-center justify-center p-4 overflow-auto">
              <img
                src={activeUrl}
                alt={item.file.name}
                className="max-w-full max-h-full object-contain rounded border border-white/10"
              />
            </div>
          ) : (
            <iframe
              src={activeUrl}
              className="w-full h-full border border-white/[0.08] rounded-lg bg-white"
              title="Document Inspector"
            />
          )}
          <div className="mt-2 text-xs font-mono text-[#8A8F98] hidden sm:block">
            INSPECTOR NOTE: If your browser restricts inline document rendering, use &quot;Open Tab&quot; or &quot;Download File&quot; above.
          </div>
        </div>
      </div>
    </div>
  );
}
