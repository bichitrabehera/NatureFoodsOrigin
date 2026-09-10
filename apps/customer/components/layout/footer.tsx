import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pine font-display text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="text-3xl font-bold">Nature Food Origin</span>
            <p className="mt-4 text-white/70">
              Fresh, honest food made daily in Bengaluru.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <Link
              href="/order-now"
              className="text-xl font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              Order Now
            </Link>
            <Link
              href="/#menu"
              className="text-xl font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              Menu
            </Link>
            <Link
              href="tel:+919916918565"
              className="text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              +91 99169 18565
            </Link>
            <Link
              href="mailto:naturefoodsorigin@gmail.com"
              className="text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              naturefoodsorigin@gmail.com
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-white/50">
            100 Ft Road, Koramangala, Bengaluru 560034 · Mon – Sat 8AM – 10PM ·
            Sun 9AM – 9PM&nbsp;&nbsp;&nbsp;&copy; {year} Nature Food Origin. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
