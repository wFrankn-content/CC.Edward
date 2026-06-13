import type { MetadataRoute } from 'next'
import { getConfig } from '@/lib/config'

// Required for `output: 'export'` — emit the manifest as a static file.
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  const { appName, themeColor } = getConfig()
  return {
    name: appName,
    short_name: appName,
    description: 'Morning briefing for content creators',
    start_url: '/',
    display: 'standalone',
    background_color: themeColor,
    theme_color: themeColor,
    orientation: 'portrait',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
