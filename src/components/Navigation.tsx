import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Research', to: '/research' },
  { label: 'Teaching', to: '/teaching' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-surface/90 backdrop-blur-xl border-b border-border-light/60'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          <Link
            to="/"
            className="font-serif text-[22px] tracking-tight text-ink leading-none"
            onClick={() => setMobileOpen(false)}
          >
            Antonio Castellanos
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative font-sans text-[13px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-muted-text hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-[6px] left-0 h-[1px] bg-ink transition-all duration-500 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-transform duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-opacity duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-transform duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-surface/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-serif text-3xl transition-colors duration-300 ${
                  isActive ? 'text-ink' : 'text-charcoal hover:text-ink'
                }`
              }
              style={{
                transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease, color 0.3s ease',
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}
