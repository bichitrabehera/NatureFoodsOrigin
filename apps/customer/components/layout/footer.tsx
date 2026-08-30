import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

const headings =
  "mb-5 text-sm font-semibold tracking-widest text-sun uppercase";

export function Footer() {
  return (
    <footer className="bg-green-800 text-white font-display">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-3xl font-bold">
              Nature Food Origin
            </span>
            <p className="mt-5 leading-relaxed text-white/70">
              Fresh, healthy food made with love. We bring nature&apos;s finest
              ingredients straight to your table.
            </p>
          </div>

          <div>
            <h4 className={headings}>Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headings}>Contact</h4>
            <ul className="space-y-3">
              <li className="text-white/70">
                100 Ft Road, Koramangala, Bengaluru 560034
              </li>
              <li className="text-white/70">+91 99169 18565</li>
              <li className="text-white/70">naturefoodsorigin@gmail.com</li>
            </ul>
          </div>

          <div>
            <h4 className={headings}>Opening Hours</h4>
            <ul className="space-y-3">
              <li className="text-white/70">Mon – Sat: 8AM – 10PM</li>
              <li className="text-white/70">Sun: 9AM – 9PM</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
          <p className="text-center text-white/50">
            &copy; {new Date().getFullYear()} Nature Food Origin. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
