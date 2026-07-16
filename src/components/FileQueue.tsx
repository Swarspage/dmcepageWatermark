"use client";

import React from "react";
import {
  FileText,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sparkles,
  Layers,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import LinearButton from "./LinearButton";
import { FileItem } from "../types";

interface FileQueueProps {
  items: FileItem[];
  onRemoveItem: (id: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
  onOpenPreview: (item: FileItem, preferredMode?: "original" | "processed") => void;
  onProcessAll: (e: React.FormEvent) => void;
  isProcessingAll: boolean;
  currentProcessingIndex: number;
}

export default function FileQueue({
  items,
  onRemoveItem,
  onClearAll,
  onOpenPreview,
  onProcessAll,
  isProcessingAll,
  currentProcessingIndex,
}: FileQueueProps) {
  if (items.length === 0) return null;

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full space-y-6 pt-4 animate-in fade-in duration-300">
      {/* Queue Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5 text-left">
          <div className="p-1.5 rounded-lg bg-[#5E6AD2]/15 text-[#5E6AD2]">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-[#EDEDEF]">
            Queued Documents <span className="text-xs font-mono text-[#8A8F98] ml-1">({items.length})</span>
          </h3>
        </div>

        <LinearButton
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          disabled={isProcessingAll}
          leftIcon={<Trash2 className="w-3.5 h-3.5 text-red-400" />}
          className="self-end sm:self-auto !text-red-400 hover:!bg-red-500/10"
        >
          Clear Queue
        </LinearButton>
      </div>

      {/* Document Items List */}
      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
        {items.map((item) => {
          return (
            <SpotlightCard
              key={item.id}
              variant="glass"
              className="p-4 transition-all duration-200 hover:border-white/[0.14]"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* File Info */}
                <div className="flex items-center gap-3.5 overflow-hidden w-full sm:w-auto">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#5E6AD2] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden text-left">
                    <span
                      className="font-medium text-sm sm:text-base text-[#EDEDEF] truncate max-w-[220px] sm:max-w-[320px] md:max-w-[400px]"
                      title={item.file.name}
                    >
                      {item.file.name}
                    </span>
                    <span className="text-xs font-mono text-[#8A8F98]">
                      {formatBytes(item.file.size)}
                    </span>
                  </div>
                </div>

                {/* Status Indicator & Action Buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06] shrink-0">
                  {/* Status Badges */}
                  {item.status === "processing" && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E6AD2]/15 border border-[#5E6AD2]/30 text-xs font-mono text-[#6872D9] animate-pulse">
                      <div className="spinner-linear !w-3.5 !h-3.5" />
                      <span>Stamping...</span>
                    </div>
                  )}

                  {item.status === "success" && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Stamped ✨</span>
                    </div>
                  )}

                  {item.status === "error" && (
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-mono text-red-400 max-w-[150px] truncate"
                      title={item.errorMessage}
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.errorMessage || "Error"}</span>
                    </div>
                  )}

                  {item.status === "idle" && (
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-[#8A8F98]">
                      READY
                    </span>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <LinearButton
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        onOpenPreview(item, item.status === "success" ? "processed" : "original")
                      }
                      title="Inspect Document Preview"
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Preview
                    </LinearButton>

                    <LinearButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => onRemoveItem(item.id, e)}
                      disabled={isProcessingAll && item.status === "processing"}
                      title="Remove from queue"
                      className="!p-2 text-[#8A8F98] hover:!text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </LinearButton>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Process All CTA */}
      <form onSubmit={onProcessAll} className="pt-2">
        <LinearButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={items.length === 0 || isProcessingAll}
          isLoading={isProcessingAll}
          leftIcon={!isProcessingAll ? <Sparkles className="w-5 h-5 text-white" /> : undefined}
          className="w-full py-4 text-base font-semibold shadow-accent-btn"
        >
          {isProcessingAll ? (
            <span>
              Processing Watermarks...{" "}
              {currentProcessingIndex !== -1 ? `(${currentProcessingIndex + 1}/${items.length})` : ""}
            </span>
          ) : (
            <span>
              {items.length > 1
                ? `Execute Batch Stamping (${items.length} Documents)`
                : "Execute Watermark Stamp Now"}
            </span>
          )}
        </LinearButton>
      </form>
    </div>
  );
}
