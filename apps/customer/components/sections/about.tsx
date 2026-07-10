import React from "react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";

export function About() {
  return (
    <div className="mx-auto space-y-8 bg-white *:px-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8 py-24 md:py-32">
        <h3 className="text-4xl font-extrabold text-[#0D530E] lg:text-6xl">
          Every Great <span className="text-primary underline">Meal</span>{" "}
          Begins With a Story.
        </h3>

        <p className="text-primary/80 text-2xl leading-relaxed">
          Nature Food Origin began in the heart of <strong>Tirupati</strong>,
          where every meal was prepared with one simple promise—to serve fresh,
          honest food that people could trust. What started as a small kitchen
          serving families, students, and workers quickly became a place where
          customers returned not just for the taste, but for the care in every
          meal.
        </p>

        <p className="text-primary/80 text-2xl leading-relaxed">
          As our community grew, so did our dream. To serve more people without
          compromising quality, we built a modern <strong>cloud kitchen</strong>
          , combining traditional recipes with efficient preparation and fast
          delivery. Every ingredient is carefully sourced, every dish is freshly
          prepared, and every order is made with the same dedication that
          inspired our very first customer.
        </p>

        <div className="border-primary/30 bg-primary/20 rounded-2xl border p-6 ">
          <h4 className="text-primary mb-4 text-3xl font-bold">Our Mission</h4>

          <p className="text-primary/80 text-2xl leading-relaxed">
            We believe healthy food should never feel like a compromise. Our
            mission is to make wholesome, delicious meals accessible to everyone
            while supporting local farmers, reducing food waste, and creating
            experiences that bring people together around good food.
          </p>
        </div>
      </div>
    </div>
  );
}
