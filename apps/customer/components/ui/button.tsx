"use client";

import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex cursor-pointer items-center justify-center rounded-xl font-bold transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

  const variants = {
    primary: "bg-ember text-ink hover:bg-ink hover:text-white",
    secondary:
      "border border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
    ghost: "text-ink hover:bg-ink/5",
  };

  const sizes = {
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-2.5",
    lg: "px-7 py-3.5 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
