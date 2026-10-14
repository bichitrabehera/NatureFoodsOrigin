import Link from "next/link";

const links = [
  { label: "Order Now", href: "/order-now" },
  { label: "Menu", href: "/#menu" },
  { label: "+91 99169 18565", href: "tel:+919916918565" },
  {
    label: "naturefoodsorigin@gmail.com",
    href: "mailto:naturefoodsorigin@gmail.com",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="font-display bg-green-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-24 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="text-3xl font-bold">Nature Food Origin</span>
            <p className="mt-4 text-white/70">
              Fresh, honest food made daily in Bengaluru.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="focus-visible:outline-ember text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-white/50">
            Devarabisanahalli, Bengaluru 560103 · Mon – Sat 8AM – 10PM · Sun 9AM
            – 9PM&nbsp;&nbsp;&nbsp;&copy; {year} Nature Food Origin. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
