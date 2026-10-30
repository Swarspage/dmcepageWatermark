"use client";

import React, { useState } from "react";
import { Sparkles, Eye } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { playPopSound } from "../utils/audio";

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<"compare" | "before" | "after">("compare");
  const [paperMode, setPaperMode] = useState<"dimmed" | "dark" | "bright">("dimmed");

  return (
    <section className="w-full max-w-4xl mx-auto pt-6 pb-4 space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-1.5 max-w-2xl mx-auto px-2">
        <p className="text-xs font-semibold tracking-wider text-[#8A8F98] uppercase">
          Visual Pipeline &amp; Demonstration
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#EDEDEF] tracking-tight">
          How The Stamping Engine Works
        </h2>
        <p className="text-xs sm:text-sm text-[#8A8F98] leading-normal">
          See exact visual comparison of a student experiment sheet before and after official Datta Meghe College header and watermark stamping.
        </p>
      </div>

      {/* Mode & Lighting Selectors */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-2">
        {/* Layout Mode Selector */}
        <div className="inline-flex p-1 rounded-lg bg-[#0B0C10] border border-white/[0.08] text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab("compare");
            }}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === "compare"
                ? "bg-white/[0.1] text-[#EDEDEF] font-medium"
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
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer sm:hidden ${
              activeTab === "before"
                ? "bg-white/[0.1] text-[#EDEDEF] font-medium"
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
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer sm:hidden flex items-center gap-1 ${
              activeTab === "after"
                ? "bg-[#5E6AD2] text-white font-medium"
                : "text-[#8A8F98] hover:text-[#EDEDEF]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AFTER ONLY</span>
          </button>
        </div>

        {/* Paper Lighting Mode */}
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0B0C10] border border-white/[0.08] text-[11px] font-mono">
          <span className="text-[#8A8F98] px-2 hidden md:inline">PAPER LIGHTING:</span>
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setPaperMode("dimmed");
            }}
            className={`px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
              paperMode === "dimmed"
                ? "bg-white/[0.1] text-[#EDEDEF] font-medium"
                : "text-[#8A8F98] hover:text-[#EDEDEF]"
            }`}
            title="Slightly dimmed to protect eyes in dark mode. Brightens on hover."
          >
            <Eye className="w-3 h-3 text-[#8A8F98]" />
            <span>EYE COMFORT</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setPaperMode("dark");
            }}
            className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
              paperMode === "dark"
                ? "bg-white/[0.1] text-[#EDEDEF] font-medium"
                : "text-[#8A8F98] hover:text-[#EDEDEF]"
            }`}
            title="Smart inverted dark mode sheet"
          >
            <span>DARK PAPER</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setPaperMode("bright");
            }}
            className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
              paperMode === "bright"
                ? "bg-white/[0.1] text-[#EDEDEF] font-medium"
                : "text-[#8A8F98] hover:text-[#EDEDEF]"
            }`}
            title="Original 100% bright white"
          >
            <span>ORIGINAL BRIGHT</span>
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
          <SpotlightCard variant="default" className="p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs font-mono font-medium text-[#EDEDEF] uppercase tracking-wider">
                  1. Raw Input Document
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#8A8F98] border border-white/[0.08]">
                WITHOUT HEADER / WATERMARK
              </span>
            </div>

            {/* Document Frame */}
            <div
              onClick={() => {
                if (paperMode === "dimmed") {
                  playPopSound();
                  setPaperMode("bright");
                } else if (paperMode === "bright") {
                  playPopSound();
                  setPaperMode("dimmed");
                }
              }}
              className="w-full aspect-[1/1.3] bg-[#07080B] rounded-lg p-3 sm:p-4 border border-white/[0.08] relative overflow-hidden flex flex-col items-center justify-center group cursor-pointer"
            >
              <img
                src="/without-watermark.jpg"
                alt="Raw Experiment Sheet Before Stamping"
                className={`w-full h-full object-contain pointer-events-none select-none rounded transition-opacity duration-200 ${
                  paperMode === "dimmed"
                    ? "brightness-[0.80] contrast-[1.05] group-hover:brightness-100"
                    : paperMode === "dark"
                    ? "invert-[.88] hue-rotate-180 brightness-95"
                    : "brightness-100"
                }`}
              />
              {paperMode === "dimmed" && (
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-[#0B0C10] border border-white/10 text-[9px] font-mono text-[#8A8F98] group-hover:opacity-0 transition-opacity pointer-events-none">
                  <span className="hidden sm:inline">Hover or click to brighten</span>
                  <span className="sm:hidden">Tap to brighten</span>
                </div>
              )}
            </div>
          </SpotlightCard>
        )}

        {/* AFTER CARD */}
        {(activeTab === "compare" || activeTab === "after") && (
          <SpotlightCard
            variant="default"
            className="p-4 sm:p-5 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-medium text-[#EDEDEF] uppercase tracking-wider">
                  2. Official Stamped Output
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.08] text-[#EDEDEF] border border-white/[0.14] font-medium">
                READY FOR PRINTING
              </span>
            </div>

            {/* Document Frame */}
            <div
              onClick={() => {
                if (paperMode === "dimmed") {
                  playPopSound();
                  setPaperMode("bright");
                } else if (paperMode === "bright") {
                  playPopSound();
                  setPaperMode("dimmed");
                }
              }}
              className="w-full aspect-[1/1.3] bg-[#07080B] rounded-lg p-3 sm:p-4 border border-white/[0.1] relative overflow-hidden flex flex-col items-center justify-center group cursor-pointer"
            >
              <img
                src="/watermarked.jpg"
                alt="Official Stamped Output With College Header & Watermark"
                className={`w-full h-full object-contain pointer-events-none select-none rounded transition-opacity duration-200 ${
                  paperMode === "dimmed"
                    ? "brightness-[0.80] contrast-[1.05] group-hover:brightness-100"
                    : paperMode === "dark"
                    ? "invert-[.88] hue-rotate-180 brightness-95"
                    : "brightness-100"
                }`}
              />

              {paperMode === "dimmed" && (
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#0B0C10] border border-white/10 text-[9px] font-mono text-[#8A8F98] group-hover:opacity-0 transition-opacity pointer-events-none">
                  <span className="hidden sm:inline">Hover or click to brighten</span>
                  <span className="sm:hidden">Tap to brighten</span>
                </div>
              )}

              {/* Official Seal Badge */}
              <div className="absolute bottom-2.5 right-2.5 bg-[#5E6AD2] text-white text-[9px] font-mono tracking-wider px-2 py-0.5 rounded z-20">
                DMCE VERIFIED
              </div>
            </div>
          </SpotlightCard>
        )}
      </div>
    </section>
  );
}
