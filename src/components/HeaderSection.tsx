"use client";

import React from "react";
import { ShieldCheck, Sparkles, Share2 } from "lucide-react";
import { playPopSound } from "../utils/audio";

interface HeaderSectionProps {
  onOpenShare?: () => void;
}

export default function HeaderSection({ onOpenShare }: HeaderSectionProps) {
  return (
    <header className="flex flex-col items-center text-center space-y-3.5 max-w-3xl mx-auto pt-2 pb-2">
      {/* Precision Pill Badge & Share Button Row */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E6AD2]/15 border border-[#5E6AD2]/40 shadow-accent-btn backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-white">
            DMCE PageX Engine • v2.0
          </span>
        </div>

        {onOpenShare && (
          <button
            type="button"
            onClick={() => {
              playPopSound();
              onOpenShare();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5E6AD2]/15 border border-[#5E6AD2]/40 text-[11px] font-mono tracking-wider text-white hover:bg-[#5E6AD2]/25 hover:border-[#5E6AD2]/70 transition-all cursor-pointer shadow-accent-btn group"
            title="Share tool with your class"
          >
            <Share2 className="w-3.5 h-3.5 text-[#5E6AD2] group-hover:scale-110 transition-transform" />
            <span>SHARE WITH CLASS</span>
          </button>
        )}
      </div>

      {/* Hero Headline with Vertical Gradient Fill */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-tight bg-gradient-to-b from-white via-white/92 to-white/65 bg-clip-text text-transparent max-w-3xl">
        Precision PDF Watermarking &{" "}
        <span className="bg-gradient-to-r from-[#5E6AD2] via-indigo-400 to-[#5E6AD2] bg-clip-text text-transparent animate-shimmer">
          Official Stamping
        </span>
      </h1>

      {/* Subtitle / Lead Paragraph */}
      <p className="text-sm sm:text-base text-[#8A8F98] leading-relaxed max-w-xl font-normal">
        Append official Datta Meghe College header logos and centralized watermarks to PDF, JPG, and PNG documents. Engineered with zero-cloud local processing for uncompromising privacy.
      </p>

      {/* Feature Highlights Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] font-mono tracking-wider text-[#8A8F98]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5E6AD2]" />
          <span>LOCAL BROWSER BUFFER</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
          <Sparkles className="w-3.5 h-3.5 text-[#5E6AD2]" />
          <span>MULTI-PAGE AUTOMATION</span>
        </div>
      </div>
    </header>
  );
}
