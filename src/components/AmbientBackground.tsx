"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 select-none">
      {/* Layer 1: Base Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_0%,#0a0a12_0%,#050506_55%,#020203_100%)]" />

      {/* Layer 2: Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] mix-blend-overlay">
        <filter id="cinematic-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-noise)" />
      </svg>

      {/* Layer 3: Animated Gradient Blobs (Ambient Light Pools) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Blob: Top-center pool of light */}
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[650px] rounded-full bg-[#5E6AD2]/22 blur-[150px] animate-float pointer-events-none" />

        {/* Secondary Blob: Mid-left subtle purple glow */}
        <div className="absolute top-[28%] -left-[15%] w-[650px] h-[650px] rounded-full bg-purple-600/12 blur-[130px] animate-float-reverse pointer-events-none" />

        {/* Tertiary Blob: Bottom-right soft indigo glow */}
        <div className="absolute bottom-[12%] -right-[12%] w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[120px] animate-float pointer-events-none" />

        {/* Bottom Accent Pulsing Light */}
        <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[750px] h-[300px] rounded-full bg-[#5E6AD2]/12 blur-[140px] animate-pulse-glow pointer-events-none" />
      </div>

      {/* Layer 4: Technical Grid Overlay */}
      <div className="absolute inset-0 bg-technical-grid opacity-[0.025]" />
    </div>
  );
}
