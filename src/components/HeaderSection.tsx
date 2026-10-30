"use client";

import React from "react";
import { ShieldCheck, Sparkles, Share2 } from "lucide-react";
import { playPopSound } from "../utils/audio";

interface HeaderSectionProps {
  onOpenShare?: () => void;
}

export default function HeaderSection({ onOpenShare }: HeaderSectionProps) {
  return (
    <header className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto pt-2 pb-2">
      {/* Top Status & Share Actions */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0C10] border border-white/[0.1]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2]" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#EDEDEF]">
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
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0C10] border border-white/[0.1] text-[11px] font-mono tracking-wider text-[#EDEDEF] hover:border-white/[0.22] hover:bg-white/[0.04] transition-colors cursor-pointer"
            title="Share tool with your class"
          >
            <Share2 className="w-3.5 h-3.5 text-[#8A8F98]" />
            <span>SHARE WITH CLASS</span>
          </button>
        )}
      </div>

      {/* Solid Ink Hero Headline - Whole headline in one style, no gradient, no accent word */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#EDEDEF] max-w-3xl leading-tight">
        Precision PDF Watermarking &amp; Official Stamping
      </h1>

      {/* Subtitle / Lead Paragraph */}
      <p className="text-sm sm:text-base text-[#8A8F98] leading-relaxed max-w-xl font-normal">
        Append official Datta Meghe College header logos and centralized watermarks to PDF, JPG, and PNG documents. Engineered with zero-cloud local processing for uncompromising privacy.
      </p>

      {/* Feature Highlights */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] font-mono tracking-wider text-[#8A8F98]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0C10] border border-white/[0.08]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8A8F98]" />
          <span>LOCAL BROWSER BUFFER</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0C10] border border-white/[0.08]">
          <Sparkles className="w-3.5 h-3.5 text-[#8A8F98]" />
          <span>MULTI-PAGE AUTOMATION</span>
        </div>
      </div>
    </header>
  );
}
