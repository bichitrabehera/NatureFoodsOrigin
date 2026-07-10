import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    "inline-flex items-center justify-center text font-bold rounded-full transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-[#ffffff] text-[#0D530E] hover:bg-black/80 hover:text-white active:scale-95",
    secondary:
      "border-2 border-primary text-primary hover:bg-primary hover:text-background",
    ghost: "text-primary hover:bg-accent/40",
  };

  const sizes = {
    sm: " px-3 py-2",
    md: " px-3 py-2",
    lg: " px-3 py-2",
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
