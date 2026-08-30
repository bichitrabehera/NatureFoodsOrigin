"use client";

import React from "react";
import { motion } from "motion/react";

interface ButtonProps extends React.ComponentPropsWithoutRef<
  typeof motion.button
> {
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
    "inline-flex cursor-pointer items-center justify-center rounded-2xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";

  const variants = {
    primary:
      "border-1 border-ink bg-ember text-ink hover:bg-ink hover:text-white",
    secondary:
      "border-1 border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
    ghost: "text-ink hover:bg-ink/5",
  };

  const sizes = {
    sm: "px-3 py-2",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  return (
    <motion.button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
