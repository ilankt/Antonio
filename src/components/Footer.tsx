const footerLinks = [
  { label: 'Google Scholar', href: 'https://scholar.google.pt/citations?user=IUHFbhkAAAAJ' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/antonio-castellanos/' },
  { label: 'HUJI Profile', href: 'https://bschool-en.huji.ac.il/people/antonio-castellanos' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border-light">
      <div className="max-w-content mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-sans text-xs text-muted-text">
          &copy; 2025 Antonio Castellanos
        </span>

        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-muted-text hover:text-charcoal transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <span className="font-sans text-xs text-muted-text">
          Hebrew University of Jerusalem
        </span>
      </div>
    </footer>
  )
}
