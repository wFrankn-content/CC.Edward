import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { getConfig } from '@/lib/config'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const config = getConfig()

export const metadata: Metadata = {
  title: config.appName,
  description: 'Morning briefing for content creators',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: config.appName,
  },
}

export const viewport: Viewport = {
  themeColor: config.themeColor,
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
      </body>
    </html>
  )
}
