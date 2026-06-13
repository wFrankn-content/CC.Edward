'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        height: '64px',
      }}
    >
      <Link
        href="/"
        aria-label="Home"
        aria-current={pathname === '/' ? 'page' : undefined}
        className="flex flex-col items-center gap-1 px-6 py-2"
        style={{ color: pathname === '/' ? 'var(--accent-blue)' : 'var(--text-secondary)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-[10px] font-medium">Home</span>
      </Link>

      <Link
        href="/ideas"
        aria-label="Ideas"
        aria-current={pathname === '/ideas' ? 'page' : undefined}
        className="flex flex-col items-center gap-1 px-6 py-2"
        style={{ color: pathname === '/ideas' ? 'var(--accent-blue)' : 'var(--text-secondary)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
        </svg>
        <span className="text-[10px] font-medium">Ideas</span>
      </Link>
    </nav>
  )
}
