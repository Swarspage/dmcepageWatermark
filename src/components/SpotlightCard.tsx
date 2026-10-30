"use client";

import React from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "gradient" | "dropzone";
  interactive?: boolean;
}

export default function SpotlightCard({
  children,
  className = "",
  variant = "default",
  interactive = false,
  ...props
}: SpotlightCardProps) {
  const baseStyles = "relative overflow-hidden rounded-xl transition-colors duration-150";

  const variantStyles = {
    default: "bg-[#0B0C10] border border-white/[0.08] shadow-sm",
    glass: "bg-[#0B0C10] border border-white/[0.08] shadow-sm",
    gradient: "bg-[#0B0C10] border border-white/[0.08] shadow-sm",
    dropzone: "bg-[#0B0C10] border border-dashed border-white/[0.14] hover:border-white/[0.28]",
  }[variant];

  const interactiveStyles = interactive ? "hover:border-white/[0.18]" : "";

  return (
    <div
      className={`${baseStyles} ${variantStyles} ${interactiveStyles} ${className}`}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
