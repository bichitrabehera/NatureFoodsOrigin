import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const wavyUnderline =
  "url(\"data:image/svg+xml,%3Csvg width='280' height='20' viewBox='0 0 280 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 12C18 5 32 5 45 12C58 19 72 19 85 12C98 5 112 5 125 12C138 19 152 19 165 12C178 5 192 5 205 12C218 19 232 19 245 12C258 5 272 5 280 10' stroke='%23E7E1B1' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E\")";

export function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""}`}>
      <h2
        className="text-primary inline-block pb-4 text-5xl font-bold md:text-6xl"
        style={{
          backgroundImage: wavyUnderline,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "280px 20px",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-primary/70 mx-auto mt-6 max-w-2xl text-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
