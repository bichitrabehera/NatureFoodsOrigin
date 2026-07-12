const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
];

const quickLinks = [
  { label: "Home", href: "/home" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#306D29] text-xl text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="text-3xl font-bold">NatureFoodOrigin</span>
            </div>
            <p className="leading-relaxed text-white/70">
              Fresh, healthy food made with love. We bring nature&apos;s finest
              ingredients straight to your table.
            </p>
          </div>

          <div>
            <h4 className="text-accent mb-5 font-semibold tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-accent mb-5 font-semibold tracking-widest uppercase">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                123 Green Street, Nature Valley, NY 10001
              </li>
              <li className="flex items-center gap-3 text-white/70">
                +91 99169 18565
              </li>
              <li className="flex items-center gap-3 text-white/70">
                naturefoodsorigin@gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent mb-5 font-semibold tracking-widest uppercase">
              Opening Hours
            </h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-3">Mon – Sat: 8AM – 10PM</li>
              <li className="flex items-center gap-3">Sun: 9AM – 9PM</li>
            </ul>
            {/* <div className="mt-8">
              <h4 className="text-accent mb-4 text-sm font-semibold tracking-widest uppercase">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:bg-accent/30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors"
                    aria-label={link.label}
                  >
                    <span className="text-sm font-semibold">
                      {link.label[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div> */}
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
