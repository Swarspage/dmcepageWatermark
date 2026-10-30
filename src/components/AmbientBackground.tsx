"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 select-none bg-[#050506]">
      {/* Subtle technical grid pattern without any radial gradient or blur */}
      <div className="absolute inset-0 bg-technical-grid opacity-[0.02]" />
    </div>
  );
}

