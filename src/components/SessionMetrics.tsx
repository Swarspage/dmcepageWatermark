"use client";

import React from "react";
import { Zap, PackageCheck, HardDrive } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface SessionMetricsProps {
  stats: {
    totalDocs: number;
    totalBytes: number;
    lastSpeedMs: number | null;
  };
}

export default function SessionMetrics({ stats }: SessionMetricsProps) {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0.00 MB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0">
      {/* Metric 1: Speed - Plain icon without tinted tile square */}
      <SpotlightCard variant="default" className="py-3 px-3.5 flex items-center gap-3">
        <Zap className="w-5 h-5 text-[#8A8F98] shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono text-[#8A8F98] uppercase tracking-wider">
            Processing Speed
          </span>
          <span className="text-sm font-semibold text-[#EDEDEF] font-mono">
            {stats.lastSpeedMs !== null ? `~${stats.lastSpeedMs} ms/doc` : "Instantaneous"}
          </span>
        </div>
      </SpotlightCard>

      {/* Metric 2: Stamped Count - Plain icon without tinted tile square */}
      <SpotlightCard variant="default" className="py-3 px-3.5 flex items-center gap-3">
        <PackageCheck className="w-5 h-5 text-[#8A8F98] shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono text-[#8A8F98] uppercase tracking-wider">
            Stamped In Session
          </span>
          <span className="text-sm font-semibold text-[#EDEDEF] font-mono">
            {stats.totalDocs} {stats.totalDocs === 1 ? "Document" : "Documents"}
          </span>
        </div>
      </SpotlightCard>

      {/* Metric 3: Local Buffer Processed - Plain icon without tinted tile square */}
      <SpotlightCard variant="default" className="py-3 px-3.5 flex items-center gap-3">
        <HardDrive className="w-5 h-5 text-[#8A8F98] shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono text-[#8A8F98] uppercase tracking-wider">
            Local RAM Buffer
          </span>
          <span className="text-sm font-semibold text-[#EDEDEF] font-mono">
            {formatBytes(stats.totalBytes)}
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
}
