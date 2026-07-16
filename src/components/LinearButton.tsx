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
    "inline-flex items-center justify-center font-medium transition-all duration-200 ease-[0.16,1,0.3,1] select-none rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E6AD2]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050506] disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] relative overflow-hidden group cursor-pointer";

  const variantStyles = {
    primary:
      "bg-[#5E6AD2] text-white shadow-accent-btn hover:bg-[#6872D9] hover:shadow-[0_0_0_1px_rgba(104,114,217,0.8),0_6px_28px_rgba(94,106,210,0.5),inset_0_1px_0_0_rgba(255,255,255,0.3)]",
    secondary:
      "bg-white/[0.05] text-[#EDEDEF] border border-white/[0.08] hover:bg-white/[0.09] hover:border-white/[0.15] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
    ghost:
      "bg-transparent text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.05]",
    danger:
      "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
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
      {/* Subtle shine sweep on primary button hover */}
      {variant === "primary" && !isLoading && !disabled && (
        <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
      )}

      {isLoading && <div className="spinner-linear shrink-0" />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
