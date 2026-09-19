const FOOTER_COLUMNS = [
  {
    heading: 'Book and travel',
    links: ['Book flights', 'Manage booking', 'Check-in', 'Flight status', 'Holidays', 'Group bookings'],
  },
  {
    heading: 'Travel information',
    links: ['Baggage', 'Travel advice', 'Special assistance', 'Travelling with children', 'Visa and passport'],
  },
  {
    heading: 'Executive Club',
    links: ['Join now', 'Avios calculator', 'Membership tiers', 'Partner airlines', 'Redeem Avios'],
  },
  {
    heading: 'Help and support',
    links: ['Contact us', 'Frequently asked questions', 'Refunds', 'Complaints', 'Accessibility'],
  },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', path: 'M13 22v-8h3l1-4h-4V7.5C13 6.4 13.4 6 14.6 6H17V2.1C16.6 2 15.3 2 13.9 2 11 2 9 3.8 9 7v3H6v4h3v8h4z' },
  { label: 'X', path: 'M18 2h3l-7.5 8.6L22 22h-6.6l-5.2-6.8L4.2 22H1l8-9.2L2 2h6.8l4.7 6.2L18 2z' },
  { label: 'Instagram', path: 'M12 2c2.7 0 3 0 4.1.06 1.1.05 1.8.22 2.5.47.7.27 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.25.7.42 1.4.47 2.5C22 8.9 22 9.3 22 12s0 3-.06 4.1c-.05 1.1-.22 1.8-.47 2.5-.27.7-.6 1.2-1.2 1.8-.6.6-1.1.9-1.8 1.2-.7.25-1.4.42-2.5.47C15 22 14.7 22 12 22s-3 0-4.1-.06c-1.1-.05-1.8-.22-2.5-.47-.7-.27-1.2-.6-1.8-1.2-.6-.6-.9-1.1-1.2-1.8-.25-.7-.42-1.4-.47-2.5C2 15 2 14.7 2 12s0-3 .06-4.1c.05-1.1.22-1.8.47-2.5.27-.7.6-1.2 1.2-1.8.6-.6 1.1-.9 1.8-1.2.7-.25 1.4-.42 2.5-.47C9 2 9.3 2 12 2zm0 1.8c-2.6 0-2.9 0-4 .06-.9.04-1.4.19-1.7.32-.4.16-.7.35-1.05.7-.35.35-.54.65-.7 1.06-.13.3-.28.8-.32 1.7C4.2 9.1 4.2 9.4 4.2 12s0 2.9.06 4c.04.9.19 1.4.32 1.7.16.4.35.7.7 1.05.35.35.65.54 1.06.7.3.13.8.28 1.7.32 1.1.06 1.4.06 4 .06s2.9 0 4-.06c.9-.04 1.4-.19 1.7-.32.4-.16.7-.35 1.05-.7.35-.35.54-.65.7-1.06.13-.3.28-.8.32-1.7.06-1.1.06-1.4.06-4s0-2.9-.06-4c-.04-.9-.19-1.4-.32-1.7-.16-.4-.35-.7-.7-1.05-.35-.35-.65-.54-1.06-.7-.3-.13-.8-.28-1.7-.32-1.1-.06-1.4-.06-4-.06zm0 4.6a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2zm0 1.8a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zm4.6-2a.9.9 0 110 1.8.9.9 0 010-1.8z' },
  { label: 'YouTube', path: 'M22 12s0-3.2-.4-4.7a2.9 2.9 0 00-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.9 2.9 0 00-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.9 2.9 0 002 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.9 2.9 0 002-2C22 15.2 22 12 22 12zM10 15.5v-7l6 3.5-6 3.5z' },
]

export default function Footer() {
  return (
    <footer className="bg-ba-navy-darker text-white">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/90">
                {column.heading}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="text-sm text-white/60 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="30" fill="#fff" />
              <path d="M32 6 L38 32 L32 58 L26 32 Z" fill="#EB262C" />
              <circle cx="32" cy="32" r="6" fill="#075AAA" />
            </svg>
            <span className="text-sm font-bold tracking-tight">BRITISH AIRWAYS</span>
          </div>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href="#top"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} British Airways Home Screen Rebuild. Not affiliated with British
            Airways.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="#top" className="hover:text-white">Terms &amp; conditions</a>
            <a href="#top" className="hover:text-white">Privacy policy</a>
            <a href="#top" className="hover:text-white">Cookie policy</a>
            <a href="#top" className="hover:text-white">Modern Slavery Act</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
