import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Book', href: '#book' },
  { label: 'Manage booking', href: '#manage' },
  { label: 'Check-in', href: '#checkin' },
  { label: 'Travel information', href: '#info' },
  { label: 'Executive Club', href: '#club' },
]

function BALogo() {
  return (
    <a href="#top" className="flex items-center gap-2 shrink-0" aria-label="British Airways home">
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#fff" />
        <path d="M32 6 L38 32 L32 58 L26 32 Z" fill="#EB262C" />
        <circle cx="32" cy="32" r="6" fill="#075AAA" />
      </svg>
      <span className="text-lg font-bold tracking-tight text-white">
        BRITISH AIRWAYS
      </span>
    </a>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header id="top" className="sticky top-0 z-50 bg-ba-navy shadow-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <BALogo />

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#account"
            className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Log in
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-ba-navy-dark">
          <nav className="container-page flex flex-col py-2" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="border-b border-white/10 py-3 text-sm font-medium text-white/90 last:border-none"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#account"
              className="flex items-center gap-2 py-3 text-sm font-medium text-white"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Log in / Register
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
