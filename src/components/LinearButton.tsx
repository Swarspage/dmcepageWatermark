"use client";

import React from "react";

interface LinearButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function LinearButton({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: LinearButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-150 select-none rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E6AD2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050506] disabled:opacity-40 disabled:pointer-events-none relative overflow-hidden cursor-pointer";

  const variantStyles = {
    primary:
      "bg-[#5E6AD2] text-white border border-[#5E6AD2] shadow-sm hover:bg-[#525db8] active:bg-[#4a54a8]",
    secondary:
      "bg-[#0B0C10] text-[#EDEDEF] border border-white/[0.1] hover:bg-white/[0.05] hover:border-white/[0.18] shadow-sm",
    ghost:
      "bg-transparent text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.04]",
    danger:
      "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 shadow-sm",
  }[variant];

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  }[size];

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {isLoading && <div className="spinner-linear shrink-0" />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
