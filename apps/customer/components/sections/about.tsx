import React from "react";

export function About() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 grid items-start gap-12 md:grid-cols-2 lg:gap-20">
        <div className="rounded-2xl border border-line bg-surface p-8 md:p-10">
          <h2 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl md:text-6xl leading-[1.02]">
            Every great meal begins with a story.
          </h2>

          <div className="mt-8 border-t border-line pt-6 space-y-2 text-ink/70 text-lg">
            <p>Bengaluru · Koramangala</p>
            <p>Cloud kitchen, family recipes</p>
            <p>Prepared fresh every day</p>
          </div>
        </div>

        <div className="space-y-7">
          <p className="text-xl leading-relaxed text-ink/75">
            Nature Food Origin began in the heart of{" "}
            <strong className="font-semibold text-ink">Bengaluru</strong>,
            where every meal was prepared with one simple promise—to serve
            fresh, honest food that people could trust.
          </p>

          <p className="text-xl leading-relaxed text-ink/75">
            What started as a small kitchen serving families, students, and
            workers quickly became a place where customers returned not just
            for the taste, but for the{" "}
            <strong className="font-semibold text-ink">
              care in every meal.
            </strong>
          </p>

          <p className="text-xl leading-relaxed text-ink/75">
            As our community grew, so did our dream. To serve more people
            without compromising quality, we built a modern{" "}
            <strong className="font-semibold text-ink">cloud kitchen</strong>,
            combining traditional recipes with efficient preparation and fast
            delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
