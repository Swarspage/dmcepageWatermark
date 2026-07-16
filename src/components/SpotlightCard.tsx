"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "gradient" | "dropzone";
  interactive?: boolean;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  variant = "default",
  interactive = true,
  spotlightColor = "rgba(94, 106, 210, 0.18)",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !interactive) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (interactive) setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (interactive) setOpacity(0);
  };

  const baseStyles = "relative overflow-hidden rounded-2xl transition-all duration-300 ease-[0.16,1,0.3,1]";

  const variantStyles = {
    default: "bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.06] shadow-multi-card",
    glass: "bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-multi-card",
    gradient: "bg-gradient-to-br from-[#5E6AD2]/12 via-white/[0.05] to-transparent border border-[#5E6AD2]/25 shadow-multi-card",
    dropzone: "bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-dashed border-white/[0.15] hover:border-[#5E6AD2]/60 hover:bg-[#5E6AD2]/[0.04]",
  }[variant];

  const interactiveStyles = interactive
    ? "hover:-translate-y-[3px] hover:border-white/[0.12]"
    : "";

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variantStyles} ${interactiveStyles} ${className}`}
      {...props}
    >
      {/* Interactive Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Top Border Inner Highlight for dimensionality */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
