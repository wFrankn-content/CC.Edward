import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { BottomNav } from '@/components/BottomNav'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edward',
  description: 'Morning briefing for content creators',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Edward',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <main className="page-content">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}
