const footerLinks = [
  { label: 'Google Scholar', href: 'https://scholar.google.pt/citations?user=IUHFbhkAAAAJ' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/antonio-castellanos/' },
  { label: 'HUJI Profile', href: 'https://bschool-en.huji.ac.il/people/antonio-castellanos' },
  { label: 'Email', href: 'mailto:antonio.castellanos@mail.huji.ac.il' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-surface/80">
      <div className="max-w-content mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-16">
          <div>
            <p className="font-serif text-2xl text-surface leading-tight mb-4">
              Antonio Castellanos
            </p>
            <p className="font-sans text-sm leading-relaxed max-w-[360px]">
              Hebrew University of Jerusalem &middot; Business School
            </p>
            <p className="font-sans text-sm text-surface/50 mt-1">
              Federmann Center for the Study of Rationality
            </p>
          </div>

          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-surface/40 mb-4">
              Contact
            </p>
            <a
              href="mailto:antonio.castellanos@mail.huji.ac.il"
              className="font-sans text-sm text-surface/85 hover:text-surface transition-colors duration-300 break-all"
            >
              antonio.castellanos@mail.huji.ac.il
            </a>
          </div>

          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-surface/40 mb-4">
              Elsewhere
            </p>
            <ul className="space-y-2">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-surface/85 hover:text-surface transition-colors duration-300"
                  >
                    {link.label}
                    <span aria-hidden className="ml-1.5 opacity-50">&rarr;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="font-sans text-xs text-surface/40">
            &copy; {new Date().getFullYear()} Antonio Castellanos. All rights reserved.
          </span>
          <span className="font-sans text-xs text-surface/40">
            Jerusalem &middot; Israel
          </span>
        </div>
      </div>
    </footer>
  )
}
