"use client";

import React, { useState } from "react";
import { Sparkles, ShieldCheck, FileText, ArrowRight, Download, Eye, Layers } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { playPopSound } from "../utils/audio";

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<"compare" | "before" | "after">("compare");

  return (
    <section className="w-full max-w-4xl mx-auto pt-6 pb-4 space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5E6AD2]/10 border border-[#5E6AD2]/25 text-[11px] font-mono tracking-wider text-[#5E6AD2] uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>VISUAL PIPELINE &amp; DEMONSTRATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          How The Stamping Engine Works
        </h2>
        <p className="text-xs sm:text-sm text-[#8A8F98] leading-normal">
          See exact visual comparison of a student experiment sheet before and after official Datta Meghe College header and watermark stamping.
        </p>
      </div>

      {/* Mode Selector for Mobile/Responsive */}
      <div className="flex items-center justify-center gap-2 px-2">
        <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab("compare");
            }}
            className={`px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer ${
              activeTab === "compare"
                ? "bg-white/[0.12] text-white font-medium shadow-sm"
                : "text-[#8A8F98] hover:text-[#EDEDEF]"
            }`}
          >
            SIDE-BY-SIDE VIEW
          </button>
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab("before");
            }}
            className={`px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer sm:hidden ${
              activeTab === "before"
                ? "bg-white/[0.12] text-white font-medium shadow-sm"
                : "text-[#8A8F98] hover:text-[#EDEDEF]"
            }`}
          >
            BEFORE ONLY
          </button>
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab("after");
            }}
            className={`px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer sm:hidden flex items-center gap-1 ${
              activeTab === "after"
                ? "bg-[#5E6AD2] text-white font-medium shadow-accent-btn"
                : "text-[#8A8F98] hover:text-[#EDEDEF]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AFTER ONLY</span>
          </button>
        </div>
      </div>

      {/* Visual Comparison Grid */}
      <div
        className={`grid gap-4 px-2 ${
          activeTab === "compare"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 max-w-xl mx-auto"
        }`}
      >
        {/* BEFORE CARD */}
        {(activeTab === "compare" || activeTab === "before") && (
          <SpotlightCard variant="glass" className="p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                <span className="text-xs font-mono font-medium text-[#EDEDEF] uppercase tracking-wider">
                  1. Raw Input Document
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-[#8A8F98] border border-white/[0.08]">
                WITHOUT HEADER / WATERMARK
              </span>
            </div>

            {/* Document Frame Mockup */}
            <div className="w-full aspect-[1/1.3] bg-white rounded-lg p-3 sm:p-4 shadow-xl border border-white/10 relative overflow-hidden flex flex-col items-center">
              <img
                src="/without-watermark.jpg"
                alt="Raw Experiment Sheet Before Stamping"
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            </div>
          </SpotlightCard>
        )}

        {/* AFTER CARD */}
        {(activeTab === "compare" || activeTab === "after") && (
          <SpotlightCard
            variant="glass"
            className="p-4 sm:p-5 flex flex-col justify-between space-y-4 !border-[#5E6AD2]/40 !bg-[#5E6AD2]/[0.03]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-medium text-emerald-300 uppercase tracking-wider">
                  2. Official Stamped Output
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.15] text-white border border-white/30 font-semibold">
                READY FOR SUBMISSION
              </span>
            </div>

            {/* Document Frame Mockup Displaying Exact Watermarked Image */}
            <div className="w-full aspect-[1/1.3] bg-white rounded-lg p-3 sm:p-4 shadow-2xl border-2 border-[#5E6AD2]/60 relative overflow-hidden flex flex-col items-center">
              <img
                src="/watermarked.jpg"
                alt="Official Stamped Output With College Header & Watermark"
                className="w-full h-full object-contain pointer-events-none select-none rounded"
              />

              {/* Official Seal Badge */}
              <div className="absolute bottom-2 right-2 bg-[#5E6AD2] text-white text-[9px] font-mono tracking-widest px-1.5 py-0.5 rounded shadow-sm z-20">
                DMCE VERIFIED
              </div>
            </div>
          </SpotlightCard>
        )}
      </div>
    </section>
  );
}
