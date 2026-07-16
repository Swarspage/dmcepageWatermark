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
      {/* Metric 1: Speed */}
      <SpotlightCard variant="glass" className="py-2.5 px-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#5E6AD2]/15 border border-[#5E6AD2]/30 flex items-center justify-center text-[#5E6AD2] shrink-0">
          <Zap className="w-4 h-4" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] mt-2 font-mono text-[#8A8F98] uppercase tracking-wider">
            Processing Speed
          </span>
          <span className="text-sm font-semibold text-white font-mono">
            {stats.lastSpeedMs !== null ? `~${stats.lastSpeedMs} ms/doc` : "Instantaneous"}
          </span>
        </div>
      </SpotlightCard>

      {/* Metric 2: Stamped Count */}
      <SpotlightCard variant="glass" className="py-2.5 px-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
          <PackageCheck className="w-4 h-4" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] mt-2 font-mono text-[#8A8F98] uppercase tracking-wider">
            Stamped In Session
          </span>
          <span className="text-sm font-semibold text-white font-mono">
            {stats.totalDocs} {stats.totalDocs === 1 ? "Document" : "Documents"}
          </span>
        </div>
      </SpotlightCard>

      {/* Metric 3: Local Buffer Processed */}
      <SpotlightCard variant="glass" className="py-2.5 px-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
          <HardDrive className="w-4 h-4" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] mt-2 font-mono text-[#8A8F98] uppercase tracking-wider">
            Local RAM Buffer
          </span>
          <span className="text-sm font-semibold text-white font-mono">
            {formatBytes(stats.totalBytes)}
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
}
